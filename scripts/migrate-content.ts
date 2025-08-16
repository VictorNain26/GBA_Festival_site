/**
 * Script to migrate existing hardcoded content to Sanity CMS
 * Run with: npx ts-node scripts/migrate-content.ts
 */
import { client } from '../sanity/lib/client'
import { 
  HERO_CONTENT, 
  ABOUT_CONTENT, 
  PARTNER_CATEGORIES, 
  PARTNERS_INTRO,
  ON_THE_WAY_CONTENT,
  DECO_BALL_CONTENT,
  PERSONALITIES_CONTENT,
  CONTACT_CONTENT 
} from '../constants/content'

async function migrateContent() {
  console.log('🚀 Starting content migration to Sanity...')
  
  try {
    // 1. Migrate Hero Content
    console.log('📝 Migrating hero content...')
    const heroDoc = {
      _type: 'hero',
      _id: 'hero-singleton',
      title: {
        fr: 'Florilège de l\'Art Deco',
        en: 'Florilège of Art Deco'
      },
      subtitle: HERO_CONTENT.fr.subtitle,
      date: HERO_CONTENT.fr.date,
      location: HERO_CONTENT.fr.location,
      cta: HERO_CONTENT.fr.cta
    }
    
    await client.createOrReplace(heroDoc)
    console.log('✅ Hero content migrated')

    // 2. Migrate About Section
    console.log('📝 Migrating about section...')
    const aboutDoc = {
      _type: 'section',
      _id: 'section-about',
      key: 'about',
      title: {
        fr: 'Le Festival',
        en: 'The Festival'
      },
      content: {
        fr: ABOUT_CONTENT.fr.map((content, index) => ({
          _type: 'block',
          _key: `fr-${index}`,
          style: 'normal',
          children: [{ _type: 'span', text: content?.toString() || '', marks: [] }]
        })),
        en: ABOUT_CONTENT.en.map((content, index) => ({
          _type: 'block', 
          _key: `en-${index}`,
          style: 'normal',
          children: [{ _type: 'span', text: content?.toString() || '', marks: [] }]
        }))
      }
    }
    
    await client.createOrReplace(aboutDoc)
    console.log('✅ About section migrated')

    // 3. Migrate Partner Categories
    console.log('📝 Migrating partner categories...')
    for (let i = 0; i < PARTNER_CATEGORIES.length; i++) {
      const category = PARTNER_CATEGORIES[i]
      if (!category) continue;
      
      const categoryDoc = {
        _type: 'partnerCategory',
        _id: `partner-category-${category.key}`,
        key: category.key,
        title: category.title,
        description: category.desc,
        order: i
      }
      
      await client.createOrReplace(categoryDoc)
    }
    console.log('✅ Partner categories migrated')

    // 4. Migrate other sections
    const sections = [
      {
        key: 'partners',
        title: { fr: 'Nos Partenaires', en: 'Our Partners' },
        content: PARTNERS_INTRO
      },
      {
        key: 'ontheway', 
        title: { fr: 'Spectacle', en: 'Show' },
        content: ON_THE_WAY_CONTENT
      },
      {
        key: 'decoball',
        title: { fr: 'Le Bal Art Déco', en: 'Art Deco Ball' },
        content: DECO_BALL_CONTENT
      },
      {
        key: 'personalities',
        title: { fr: 'Personnages', en: 'Characters' },
        content: PERSONALITIES_CONTENT
      },
      {
        key: 'contact',
        title: { fr: 'Contact', en: 'Contact' },
        content: {
          fr: [`${CONTACT_CONTENT.fr.heading}\n${CONTACT_CONTENT.fr.intro}`],
          en: [`${CONTACT_CONTENT.en.heading}\n${CONTACT_CONTENT.en.intro}`]
        }
      }
    ]

    for (const section of sections) {
      console.log(`📝 Migrating ${section.key} section...`)
      const sectionDoc = {
        _type: 'section',
        _id: `section-${section.key}`,
        key: section.key,
        title: section.title,
        content: {
          fr: Array.isArray(section.content.fr) ? section.content.fr.map((content, index) => ({
            _type: 'block',
            _key: `${section.key}-fr-${index}`,
            style: 'normal', 
            children: [{ _type: 'span', text: content?.toString() || '', marks: [] }]
          })) : [],
          en: Array.isArray(section.content.en) ? section.content.en.map((content, index) => ({
            _type: 'block',
            _key: `${section.key}-en-${index}`, 
            style: 'normal',
            children: [{ _type: 'span', text: content?.toString() || '', marks: [] }]
          })) : []
        }
      }
      
      await client.createOrReplace(sectionDoc)
      console.log(`✅ ${section.key} section migrated`)
    }

    console.log('🎉 Content migration completed successfully!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateContent()