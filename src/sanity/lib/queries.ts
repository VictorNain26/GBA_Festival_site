import { groq } from 'next-sanity'

// Festival info query
export const festivalInfoQuery = groq`
  *[_type == "festivalInfo"][0] {
    _id,
    title,
    subtitle,
    date,
    location,
    cta
  }
`

// Festival sections query
export const festivalSectionsQuery = groq`
  *[_type == "festivalSection"] | order(order asc) {
    _id,
    sectionId,
    title,
    content,
    images[] {
      asset->,
      alt,
      caption
    },
    order
  }
`

// Partner categories query
export const partnerCategoriesQuery = groq`
  *[_type == "partnerCategory"] | order(order asc) {
    _id,
    key,
    title,
    description,
    order
  }
`

// Contact info query
export const contactInfoQuery = groq`
  *[_type == "contactInfo"][0] {
    _id,
    heading,
    intro,
    phone,
    email,
    website,
    whatsappLabel
  }
`

// All festival content in one query for better performance
export const allFestivalContentQuery = groq`
{
  "festivalInfo": *[_type == "festivalInfo"][0] {
    _id,
    title,
    subtitle,
    date,
    location,
    cta
  },
  "sections": *[_type == "festivalSection"] | order(order asc) {
    _id,
    sectionId,
    title,
    content,
    images[] {
      asset->,
      alt,
      caption
    },
    order
  },
  "partnerCategories": *[_type == "partnerCategory"] | order(order asc) {
    _id,
    key,
    title,
    description,
    order
  },
  "contactInfo": *[_type == "contactInfo"][0] {
    _id,
    heading,
    intro,
    phone,
    email,
    website,
    whatsappLabel
  }
}
`