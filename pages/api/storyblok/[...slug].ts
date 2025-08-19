/**
 * API Route pour Storyblok
 * Gère la récupération du contenu depuis l'API Storyblok
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { storyblokApi } from '@/lib/storyblok';
import { createRateLimitMiddleware, apiRateLimiter } from '@/lib/rateLimiter';
import { apiLogger, securityLogger } from '@/utils/logger';

const rateLimitMiddleware = createRateLimitMiddleware(apiRateLimiter);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const startTime = performance.now();
  
  // Apply rate limiting
  const rateLimitPassed = await rateLimitMiddleware(req, res);
  if (!rateLimitPassed) {
    return; // Response already sent by rate limiter
  }

  // Récupération du slug depuis les paramètres
  const { slug } = req.query;
  const storySlug = Array.isArray(slug) ? slug.join('/') : slug || 'festival-homepage';

  // Log API access
  apiLogger.warn(`/api/storyblok/${storySlug}`, 'API access', {
    method: req.method,
    user_agent: req.headers['user-agent'],
    ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress,
    slug: storySlug
  });

  // Configuration CORS pour l'éditeur visuel Storyblok
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gestion des requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Initialisation de l'API Storyblok
    if (!storyblokApi) {
      throw new Error('Storyblok API not initialized');
    }

    // Récupération du contenu
    const { data } = await storyblokApi().get(`cdn/stories/${storySlug}`, {
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
    const duration = performance.now() - startTime;
    
    if (error instanceof Error) {
      // Gestion spécifique des erreurs Storyblok
      if (error.message.includes('404')) {
        apiLogger.warn(`/api/storyblok/${storySlug}`, 'Story not found', {
          slug: storySlug,
          duration: `${duration.toFixed(2)}ms`,
          ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress
        });
        
        return res.status(404).json({ 
          error: 'Histoire non trouvée',
          slug: storySlug,
          message: error.message 
        });
      }
      
      if (error.message.includes('401') || error.message.includes('403')) {
        securityLogger.authFailure('Storyblok API authentication failed', {
          endpoint: `/api/storyblok/${storySlug}`,
          slug: storySlug,
          ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress,
          user_agent: req.headers['user-agent']
        });
        
        return res.status(401).json({ 
          error: 'Token Storyblok invalide ou manquant',
          message: 'Vérifiez votre NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN' 
        });
      }
      
      // Log generic error
      apiLogger.error(`/api/storyblok/${storySlug}`, error, {
        slug: storySlug,
        duration: `${duration.toFixed(2)}ms`,
        ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress
      });
    }

    // Erreur générique
    res.status(500).json({ 
      error: 'Erreur serveur lors de la récupération du contenu',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
}