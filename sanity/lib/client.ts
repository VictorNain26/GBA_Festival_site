import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env['NEXT_PUBLIC_SANITY_PROJECT_ID']!,
  dataset: process.env['NEXT_PUBLIC_SANITY_DATASET']!,
  apiVersion: process.env['NEXT_PUBLIC_SANITY_API_VERSION']!,
  useCdn: process.env['NODE_ENV'] === 'production',
  ...(process.env['SANITY_VIEWER_TOKEN'] && { token: process.env['SANITY_VIEWER_TOKEN'] }),
})

export const clientWithoutToken = createClient({
  projectId: process.env['NEXT_PUBLIC_SANITY_PROJECT_ID']!,
  dataset: process.env['NEXT_PUBLIC_SANITY_DATASET']!,
  apiVersion: process.env['NEXT_PUBLIC_SANITY_API_VERSION']!,
  useCdn: process.env['NODE_ENV'] === 'production',
})