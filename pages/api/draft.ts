import { validatePreviewUrl } from '@sanity/preview-url-secret'
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/src/sanity/lib/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
  }

  const { secret, slug } = req.query

  // Check for preview secret
  if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  try {
    // If using preview URL validation from Sanity
    if (req.query['sanity-preview-secret']) {
      const validatedSlug = await validatePreviewUrl(
        client.withConfig({ token: process.env.SANITY_VIEWER_TOKEN }),
        req.query['sanity-preview-secret'] as string
      )
      
      if (!validatedSlug) {
        return res.status(401).json({ message: 'Invalid preview URL' })
      }
    }

    // Enable Draft Mode
    res.setDraftMode({ enable: true })

    // Redirect to the slug or home page
    const redirectUrl = slug && typeof slug === 'string' ? slug : '/'
    res.redirect(redirectUrl)
  } catch (error) {
    console.error('Draft mode error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}