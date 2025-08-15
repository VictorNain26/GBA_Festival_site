import type { Language } from '@/types'
import { formatContentForLanguage } from './fetch'

// Types pour les données Sanity
export interface SanityFestivalInfo {
  _id: string
  title: { fr: string; en: string }
  subtitle: { fr: string; en: string }
  date: { fr: string; en: string }
  location: { fr: string; en: string }
  cta: { fr: string; en: string }
}

export interface SanityFestivalSection {
  _id: string
  sectionId: string
  title: { fr: string; en: string }
  content: { fr: any[]; en: any[] }
  images?: any[]
  order: number
}

export interface SanityPartnerCategory {
  _id: string
  key: string
  title: { fr: string; en: string }
  description: { fr: string; en: string }
  order: number
}

export interface SanityContactInfo {
  _id: string
  heading: { fr: string; en: string }
  intro: { fr: string; en: string }
  phone: string
  email: string
  website: string
  whatsappLabel: { fr: string; en: string }
}

export interface SanityContent {
  festivalInfo?: SanityFestivalInfo
  sections?: SanityFestivalSection[]
  partnerCategories?: SanityPartnerCategory[]
  contactInfo?: SanityContactInfo
}

// Adaptateur pour transformer les données Sanity vers le format existant
export function adaptSanityContent(sanityData: SanityContent, language: Language) {
  const result: any = {}
  
  if (sanityData.festivalInfo) {
    result.heroContent = {
      subtitle: formatContentForLanguage(sanityData.festivalInfo.subtitle, language),
      date: formatContentForLanguage(sanityData.festivalInfo.date, language),
      location: formatContentForLanguage(sanityData.festivalInfo.location, language),
      cta: formatContentForLanguage(sanityData.festivalInfo.cta, language),
    }
  }
  
  if (sanityData.sections) {
    // Adapter les sections par sectionId
    sanityData.sections.forEach(section => {
      const content = formatContentForLanguage(section.content, language)
      const title = formatContentForLanguage(section.title, language)
      
      switch (section.sectionId) {
        case 'about':
          result.aboutContent = content
          break
        case 'ontheway':
          result.onTheWayContent = content
          break
        case 'decoball':
          result.decoBallContent = content
          break
        default:
          // Autres sections
          break
      }
    })
  }
  
  if (sanityData.partnerCategories) {
    result.partnerCategories = sanityData.partnerCategories.map(category => ({
      key: category.key,
      title: formatContentForLanguage(category.title, language),
      desc: formatContentForLanguage(category.description, language),
    }))
  }
  
  if (sanityData.contactInfo) {
    result.contactContent = {
      heading: formatContentForLanguage(sanityData.contactInfo.heading, language),
      intro: formatContentForLanguage(sanityData.contactInfo.intro, language),
      phone: sanityData.contactInfo.phone,
      email: sanityData.contactInfo.email,
      website: sanityData.contactInfo.website,
      whatsapp: formatContentForLanguage(sanityData.contactInfo.whatsappLabel, language),
    }
  }
  
  return result
}

// Fonction pour mélanger les données statiques avec les données Sanity
export function mergeStaticWithSanity(staticData: any, sanityData: any) {
  return {
    ...staticData,
    ...sanityData,
  }
}