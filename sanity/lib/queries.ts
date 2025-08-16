import { groq } from 'next-sanity'

// Hero section query
export const heroQuery = groq`
  *[_type == "hero"][0] {
    title,
    subtitle,
    date,
    location,
    cta
  }
`

// All sections query
export const sectionsQuery = groq`
  *[_type == "section"] {
    key,
    title,
    content,
    images[] {
      image {
        asset -> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      alt
    }
  }
`

// Partner categories query
export const partnerCategoriesQuery = groq`
  *[_type == "partnerCategory"] | order(order asc) {
    key,
    title,
    description,
    order
  }
`

// Contact query
export const contactQuery = groq`
  *[_type == "section" && key == "contact"][0] {
    title,
    content
  }
`