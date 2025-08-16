import { validatePreviewUrl } from '@sanity/preview-url-secret'
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/sanity/lib/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!process.env['SANITY_PREVIEW_SECRET']) {
    return res.status(500).json({ message: 'Missing SANITY_PREVIEW_SECRET' })
  }
  
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client,
    req.url!,
  )
  
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid secret' })
  }
  
  // Enable draft mode
  res.setDraftMode({ enable: true })
  res.writeHead(307, { Location: redirectTo })
  res.end()
}