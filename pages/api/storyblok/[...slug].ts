/**
 * API Route pour Storyblok
 * Gère la récupération du contenu depuis l'API Storyblok
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { getStoryblokApi } from '@storyblok/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Récupération du slug depuis les paramètres
  const { slug } = req.query;
  const storySlug = Array.isArray(slug) ? slug.join('/') : slug || 'festival-homepage';

  // Configuration CORS pour l'éditeur visuel Storyblok
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gestion des requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Initialisation de l'API Storyblok
    const storyblokApi = getStoryblokApi();
    
    if (!storyblokApi) {
      throw new Error('Storyblok API not initialized');
    }

    // Récupération du contenu
    const { data } = await storyblokApi.get(`cdn/stories/${storySlug}`, {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      resolve_relations: [], // Peut être étendu selon les besoins
    });

    // Vérification que l'histoire existe
    if (!data || !data.story) {
      return res.status(404).json({ 
        error: 'Story not found',
        slug: storySlug 
      });
    }

    // Retour du contenu
    res.status(200).json({
      story: data.story,
      cv: data.cv, // Cache version
      rels: data.rels, // Relations
    });

  } catch (error) {
    console.error('Erreur API Storyblok:', error);
    
    // Gestion spécifique des erreurs Storyblok
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        return res.status(404).json({ 
          error: 'Histoire non trouvée',
          slug: storySlug,
          message: error.message 
        });
      }
      
      if (error.message.includes('401') || error.message.includes('403')) {
        return res.status(401).json({ 
          error: 'Token Storyblok invalide ou manquant',
          message: 'Vérifiez votre NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN' 
        });
      }
    }

    // Erreur générique
    res.status(500).json({ 
      error: 'Erreur serveur lors de la récupération du contenu',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
}