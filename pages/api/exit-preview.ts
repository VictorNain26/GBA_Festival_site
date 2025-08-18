/**
 * API Route pour sortir du mode Preview
 */

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Désactivation du mode preview
  res.clearPreviewData();
  
  // Redirection vers la page normale
  const redirectPath = req.query['path'] as string || '/storyblok-live';
  
  res.writeHead(307, { Location: redirectPath });
  res.end();
}