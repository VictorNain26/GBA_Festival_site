/**
 * API Route pour le mode Preview de Storyblok
 * Permet l'édition en temps réel avec l'éditeur visuel
 */

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Vérification du secret de preview
  const secret = req.query['secret'] as string;
  const expectedSecret = process.env['STORYBLOK_PREVIEW_SECRET'];

  if (!expectedSecret) {
    return res.status(500).json({ 
      message: 'STORYBLOK_PREVIEW_SECRET non configuré' 
    });
  }

  if (secret !== expectedSecret) {
    return res.status(401).json({ 
      message: 'Secret de preview invalide' 
    });
  }

  // Récupération du slug depuis la query
  const slug = req.query['slug'] as string || 'festival-homepage';
  const redirectPath = slug === 'festival-homepage' ? '/storyblok-live' : `/storyblok-live/${slug}`;

  // Activation du mode preview
  res.setPreviewData(
    {
      slug,
      timestamp: Date.now(),
    },
    {
      maxAge: 60 * 60, // 1 heure
      path: '/',
    }
  );

  // Redirection vers la page en mode preview
  res.writeHead(307, { Location: redirectPath });
  res.end();
}