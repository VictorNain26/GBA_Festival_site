import { useState, useEffect } from 'react'
import { client } from '@/sanity/lib/client'
import { heroQuery, sectionsQuery, partnerCategoriesQuery } from '@/sanity/lib/queries'
import { productionLogger } from '@/utils/logger'

interface HeroData {
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  date: { fr: string; en: string };
  location: { fr: string; en: string };
  cta: { fr: string; en: string };
}

interface SectionData {
  _id: string;
  key: string;
  title: { fr: string; en: string };
  content: { fr: string[]; en: string[] };
}

interface PartnerCategoryData {
  _id: string;
  key: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
}

interface SanityData {
  hero: HeroData | null;
  sections: SectionData[];
  partnerCategories: PartnerCategoryData[];
  loading: boolean;
  error: string | null;
}

export function useSanityData(): SanityData {
  const [data, setData] = useState<SanityData>({
    hero: null,
    sections: [],
    partnerCategories: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    async function fetchData() {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }))
        
        const [hero, sections, partnerCategories] = await Promise.all([
          client.fetch(heroQuery),
          client.fetch(sectionsQuery),
          client.fetch(partnerCategoriesQuery),
        ])

        setData({
          hero,
          sections,
          partnerCategories,
          loading: false,
          error: null,
        })
      } catch (error) {
        productionLogger.error('Error fetching Sanity data:', error)
        setData(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch data',
        }))
      }
    }

    fetchData()
  }, [])

  return data
}