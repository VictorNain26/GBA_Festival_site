import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Disable Draft Mode
  res.setDraftMode({ enable: false })

  res.json({ message: 'Draft mode disabled' })
}