import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.SANITY_VIEWER_TOKEN,
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  },
})

// Client for preview mode with stega encoding enabled
export const previewClient = client.withConfig({
  useCdn: false,
  token: process.env.SANITY_VIEWER_TOKEN,
  perspective: 'previewDrafts',
  stega: true,
})
