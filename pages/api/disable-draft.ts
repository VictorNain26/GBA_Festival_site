import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Disable draft mode
  res.setDraftMode({ enable: false })
  res.writeHead(307, { Location: '/' })
  res.end()
}