import { client, previewClient } from './client'
import type { QueryParams } from 'next-sanity'

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
  isDraft = false,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
  isDraft?: boolean
}): Promise<QueryResponse> {
  const selectedClient = isDraft ? previewClient : client
  
  return selectedClient.fetch<QueryResponse>(query, params, {
    cache: isDraft ? 'no-store' : 'force-cache',
    next: { tags },
  })
}

export function formatContentForLanguage(
  content: { fr: any; en: any } | null | undefined,
  language: 'fr' | 'en'
): any {
  if (!content) return null
  return content[language] || content.fr || null
}