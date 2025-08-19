/**
 * API Route pour le mode Preview de Storyblok
 * Permet l'édition en temps réel avec l'éditeur visuel
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { createRateLimitMiddleware, previewRateLimiter } from '@/lib/rateLimiter';
import { securityLogger } from '@/utils/logger';

const rateLimitMiddleware = createRateLimitMiddleware(previewRateLimiter);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Apply stricter rate limiting for preview endpoint
  const rateLimitPassed = await rateLimitMiddleware(req, res);
  if (!rateLimitPassed) {
    return; // Response already sent by rate limiter
  }
  // Vérification du secret de preview
  const secret = req.query['secret'] as string;
  const expectedSecret = process.env['STORYBLOK_PREVIEW_SECRET'];

  if (!expectedSecret) {
    return res.status(500).json({ 
      message: 'STORYBLOK_PREVIEW_SECRET non configuré' 
    });
  }

  if (secret !== expectedSecret) {
    // Log security event for invalid preview attempt
    securityLogger.authFailure('Invalid preview secret attempt', {
      provided_secret: secret ? 'present' : 'missing',
      ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress,
      user_agent: req.headers['user-agent'],
      endpoint: '/api/preview'
    });
    
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