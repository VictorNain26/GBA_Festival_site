/**
 * Script to migrate existing hardcoded content to Sanity CMS
 * Run with: npm run migrate-content
 */
const fs = require('fs')
const path = require('path')
const { createClient } = require('next-sanity')

// Load environment variables from .env.local
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local')
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8')
    const lines = envFile.split('\n')
    
    for (const line of lines) {
      const [key, ...valueParts] = line.split('=')
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/"/g, '')
        process.env[key] = value
      }
    }
  }
}

// Load environment variables
loadEnv()

// Verify required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET', 
  'NEXT_PUBLIC_SANITY_API_VERSION',
  'SANITY_VIEWER_TOKEN'
]

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`)
    console.error('Please check your .env.local file')
    process.exit(1)
  }
}

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_VIEWER_TOKEN,
})

// Hardcoded content from constants/content.tsx
const HERO_CONTENT = {
  fr: {
    subtitle: 'Festival Art Deco et Neo Art Deco',
    date: '18 octobre 2025',
    location: 'Hôtel du Collectionneur, Paris 75008',
    cta: 'Billeterie',
  },
  en: {
    subtitle: 'Art Deco & Neo Art Deco Festival',
    date: '18 October 2025',
    location: 'Hôtel du Collectionneur, Paris 75008',
    cta: 'Tickets',
  },
}

const ABOUT_CONTENT = {
  fr: [
    "Depuis plus de cent ans l'Art déco séduit le monde. Mais c'est bien l'Exposition Internationale des Arts décoratifs et industriels modernes de Paris, évènement fondateur de l'année 1925, qui a donné le nom à l'Art Déco.",
    "Synonyme d'élégance, de modernité et de raffinement, l'Art déco continue d'influencer l'architecture, le design, la peinture, la sculpture et la mode, suscitant toujours autant d'enthousiasme parmi les passionnés du monde créatif.",
    "L'année 2025 marque le centenaire de l'Exposition Internationale et du mouvement Art déco. Cette date significative pour tous les amateurs de ce mouvement artistique a vu naître sa continuation dans un nouveau format : le Néo Art déco.",
    "Pour célébrer un héritage intemporel et son impact contemporain, notre association Grand Battement d'Ailes initie un évènement exceptionnel : le nouveau Festival Art déco et Néo Art déco baptisé « Florilège de l'Art Déco » qui se tiendra le 18 octobre 2025 au Salon Normandie de l'Hôtel du Collectionneur, icône architecturale parisienne. Lors de cette première édition, nos invités profiteront d'un programme riche et varié."
  ],
  en: [
    "For more than a century Art Deco has captivated the world. But it was the International Exhibition of Modern Decorative and Industrial Arts in Paris, a landmark event held in 1925, that gave the movement its name.",
    "Synonymous with elegance, modernity and refinement, Art Deco continues to influence architecture, design, painting, sculpture and fashion, still arousing enthusiasm among creative enthusiasts.",
    "The year 2025 marks the centenary of the International Exhibition and of the Art Deco movement. This significant date for all lovers of this artistic movement has seen its continuation in a new form: Neo Art Deco.",
    "To celebrate an timeless heritage and its contemporary impact, our association Grand Battement d'Ailes launches an exceptional event: the new Art Deco and Neo Art Deco Festival called \"Florilège de l'Art Déco\", which will be held on 18 October 2025 in the Normandie Salon at the Hôtel du Collectionneur, a Parisian architectural icon. During this first edition, our guests will enjoy a rich and varied programme."
  ]
}

const PARTNER_CATEGORIES = [
  {
    key: 'collectors',
    title: { fr: 'Collectionneurs & Galeries', en: 'Collectors & Galleries' },
    desc: {
      fr: 'Des collectionneurs d\'art et galeristes présentent des pièces rares et précieuses, témoins de l\'histoire Art déco.',
      en: 'Art collectors and gallerists present rare and precious pieces that bear witness to Art Deco history.',
    },
  },
  {
    key: 'artists',
    title: { fr: 'Artistes & Sculpteurs', en: 'Artists & Sculptors' },
    desc: {
      fr: 'Peintres, illustrateurs et sculpteurs partagent leurs univers graphiques et plastiques inspirés des Années folles.',
      en: 'Painters, illustrators and sculptors share their graphic and plastic universes inspired by the Roaring Twenties.',
    },
  },
  {
    key: 'fashion',
    title: { fr: 'Maisons & Créateurs', en: 'Houses & Designers' },
    desc: {
      fr: 'Maisons de haute couture, designers et artisans dévoilent des éléments de mode et de design aux lignes Art déco.',
      en: 'Fashion houses, designers and craftsmen unveil fashion and design pieces characterised by Art Deco lines.',
    },
  },
  {
    key: 'jewellery',
    title: { fr: 'Bijoux & Accessoires', en: 'Jewellery & Accessories' },
    desc: {
      fr: 'Créateurs de bijoux et d\'accessoires présentent des collections inspirées des motifs géométriques et des matériaux précieux.',
      en: 'Jewellery and accessory designers present collections inspired by geometric motifs and precious materials.',
    },
  },
  {
    key: 'wine',
    title: { fr: 'Vin & Parfum', en: 'Wine & Perfume' },
    desc: {
      fr: 'Producteurs de vin et de parfum proposent des expériences sensorielles en accord avec l\'esprit festif de l\'évènement.',
      en: 'Wine and perfume producers offer sensory experiences in keeping with the festive spirit of the event.',
    },
  },
]

const CONTACT_CONTENT = {
  fr: {
    heading: 'Grand Battement d\'Ailes',
    intro: 'Notre équipe se tient disponible pour répondre à toutes vos questions.',
  },
  en: {
    heading: 'Grand Battement d\'Ailes',
    intro: 'Our team is available to answer all your questions.',
  },
}

async function migrateContent() {
  console.log('🚀 Starting content migration to Sanity...')
  console.log(`📡 Connecting to project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`📦 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)
  console.log('')
  
  try {
    // Test connection first
    console.log('🔍 Testing Sanity connection...')
    await client.fetch('*[_type == "sanity.imageAsset"][0]')
    console.log('✅ Connection successful!')
    console.log('')

    // 1. Migrate Hero Content
    console.log('📝 Migrating hero content...')
    const heroDoc = {
      _type: 'hero',
      _id: 'hero-singleton',
      title: {
        fr: 'Florilège de l\'Art Deco',
        en: 'Florilège of Art Deco'
      },
      subtitle: {
        fr: HERO_CONTENT.fr.subtitle,
        en: HERO_CONTENT.en.subtitle
      },
      date: {
        fr: HERO_CONTENT.fr.date,
        en: HERO_CONTENT.en.date
      },
      location: {
        fr: HERO_CONTENT.fr.location,
        en: HERO_CONTENT.en.location
      },
      cta: {
        fr: HERO_CONTENT.fr.cta,
        en: HERO_CONTENT.en.cta
      }
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
          _key: `about-fr-${index}`,
          style: 'normal',
          children: [{ _type: 'span', text: content, marks: [] }]
        })),
        en: ABOUT_CONTENT.en.map((content, index) => ({
          _type: 'block', 
          _key: `about-en-${index}`,
          style: 'normal',
          children: [{ _type: 'span', text: content, marks: [] }]
        }))
      }
    }
    
    await client.createOrReplace(aboutDoc)
    console.log('✅ About section migrated')

    // 3. Migrate Partner Categories
    console.log('📝 Migrating partner categories...')
    for (let i = 0; i < PARTNER_CATEGORIES.length; i++) {
      const category = PARTNER_CATEGORIES[i]
      const categoryDoc = {
        _type: 'partnerCategory',
        _id: `partner-category-${category.key}`,
        key: category.key,
        title: category.title,
        description: category.desc,
        order: i
      }
      
      await client.createOrReplace(categoryDoc)
      console.log(`   ✅ ${category.title.en} migrated`)
    }
    console.log('✅ All partner categories migrated')

    // 4. Migrate Contact Section
    console.log('📝 Migrating contact section...')
    const contactDoc = {
      _type: 'section',
      _id: 'section-contact',
      key: 'contact',
      title: {
        fr: 'Contact',
        en: 'Contact'
      },
      content: {
        fr: [{
          _type: 'block',
          _key: 'contact-fr-1',
          style: 'normal',
          children: [{ _type: 'span', text: `${CONTACT_CONTENT.fr.heading}\n${CONTACT_CONTENT.fr.intro}`, marks: [] }]
        }],
        en: [{
          _type: 'block',
          _key: 'contact-en-1',
          style: 'normal',
          children: [{ _type: 'span', text: `${CONTACT_CONTENT.en.heading}\n${CONTACT_CONTENT.en.intro}`, marks: [] }]
        }]
      }
    }
    
    await client.createOrReplace(contactDoc)
    console.log('✅ Contact section migrated')

    console.log('')
    console.log('🎉 Content migration completed successfully!')
    console.log('')
    console.log('Next steps:')
    console.log('1. Start your dev server: npm run dev')
    console.log('2. Visit the Sanity Studio: http://localhost:3000/studio')
    console.log('3. Edit your content in the Studio!')
    console.log('')
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    
    if (error.message.includes('Configuration must contain `projectId`')) {
      console.error('')
      console.error('🔧 Configuration issue detected!')
      console.error('Please check your .env.local file contains:')
      console.error('- NEXT_PUBLIC_SANITY_PROJECT_ID')
      console.error('- NEXT_PUBLIC_SANITY_DATASET')
      console.error('- NEXT_PUBLIC_SANITY_API_VERSION')
      console.error('- SANITY_VIEWER_TOKEN')
    }
    
    process.exit(1)
  }
}

// Run migration
migrateContent()