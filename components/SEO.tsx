/**
 * Composant SEO complet pour le festival Art Déco
 * Optimisé pour Google, réseaux sociaux et accessibilité
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import type { Language } from '@/types';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: boolean;
  lang: Language;
  noindex?: boolean;
}

const SEO_CONFIG = {
  fr: {
    siteName: "Florilège de l'Art Déco",
    defaultTitle: "Florilège de l'Art Déco",
    titleTemplate: "%s | Florilège de l'Art Déco", 
    defaultDescription: "Florilège de l'Art Déco - Festival Art Déco et Neo Art Déco à Paris les 28-29-30 Juin 2025. Spectacle immersif ON THE WAY, bal Art Déco, expositions et animations à l'Hôtel du Collectionneur.",
    defaultKeywords: "Florilège de l'Art Déco, Art Déco, Neo Art Déco, festival Paris, spectacle immersif, ON THE WAY, bal Art Déco, Hôtel Collectionneur, juin 2025, années folles, Julie Durieux, Coco Chanel, culture Art Déco, événement Paris",
    locale: "fr_FR",
  },
  en: {
    siteName: "Florilège de l'Art Déco",
    defaultTitle: "Florilège de l'Art Déco",
    titleTemplate: "%s | Florilège de l'Art Déco",
    defaultDescription: "Florilège de l'Art Déco - Art Deco and Neo Art Deco Festival in Paris, June 28-29-30, 2025. Immersive show ON THE WAY, Art Deco ball, exhibitions and events at Hotel Collectionneur.",
    defaultKeywords: "Florilège de l'Art Déco, Art Deco, Neo Art Deco, Paris festival, immersive show, ON THE WAY, Art Deco ball, Hotel Collectionneur, June 2025, roaring twenties, Julie Durieux, Coco Chanel, Art Deco culture, Paris event",
    locale: "en_US",
  }
};

export default function SEO({
  title,
  description,
  keywords,
  image = '/images/og-image.jpg',
  article = false,
  lang,
  noindex = false,
}: SEOProps) {
  const router = useRouter();
  const config = SEO_CONFIG[lang];
  
  // URL complète
  const siteUrl = process.env['NEXT_PUBLIC_SITE_URL'] || 'https://florilegeartdeco.com';
  const canonicalUrl = `${siteUrl}${router.asPath}`;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  // Meta données finales
  const finalTitle = title 
    ? config.titleTemplate.replace('%s', title)
    : config.defaultTitle;
    
  const finalDescription = description || config.defaultDescription;
  const finalKeywords = keywords 
    ? `${keywords}, ${config.defaultKeywords}`
    : config.defaultKeywords;

  // Schema.org pour l'événement
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Festival",
    "name": config.siteName,
    "description": finalDescription,
    "startDate": "2025-06-28",
    "endDate": "2025-06-30",
    "location": {
      "@type": "Place",
      "name": "Hôtel du Collectionneur",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "51-57 Rue de Courcelles",
        "addressLocality": "Paris",
        "postalCode": "75008",
        "addressCountry": "FR"
      }
    },
    "image": imageUrl,
    "url": canonicalUrl,
    "performer": {
      "@type": "Person",
      "name": "Julie Durieux",
      "description": "Metteur en scène et autrice"
    },
    "organizer": {
      "@type": "Organization",
      "name": "Grand Battement d'Ailes",
      "url": "https://grandbattementdailes.com"
    },
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}#contact`,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-12-01"
    }
  };

  // Schema.org pour l'organisation
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Grand Battement d'Ailes",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33-6-64-88-83-70",
      "contactType": "customer service",
      "email": "festivalartdecoparis@gmail.com",
      "availableLanguage": ["French", "English"]
    },
    "sameAs": [
      "https://grandbattementdailes.com"
    ]
  };

  // BreadcrumbList pour la navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": siteUrl
      }
    ]
  };

  return (
    <Head>
      {/* Titre et meta de base */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Grand Battement d'Ailes" />
      
      {/* Contrôle robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {!noindex && <meta name="robots" content="index,follow,max-image-preview:large" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Langue et alternatives */}
      <meta httpEquiv="content-language" content={lang} />
      <link rel="alternate" hrefLang="fr" href={`${siteUrl}/`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />
      
      {/* Open Graph */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={config.locale} />
      <meta property="og:site_name" content={config.siteName} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={config.siteName} />
      
      {/* Mobile et viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Thème et couleurs */}
      <meta name="theme-color" content="#D3AA41" />
      <meta name="msapplication-TileColor" content="#000000" />
      
      {/* Favicon et icônes */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Performance hints */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      
      {/* Structured Data / Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      
      {/* Vérification Google et autres */}
      {process.env['NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION'] && (
        <meta 
          name="google-site-verification" 
          content={process.env['NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION']} 
        />
      )}
    </Head>
  );
}