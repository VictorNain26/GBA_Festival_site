/**
 * Storyblok configuration for Festival Art Déco site
 * Modern setup for Next.js Pages Router with TypeScript
 */

import { storyblokInit, apiPlugin, getStoryblokApi } from '@storyblok/react';

// Import des composants Storyblok
import TextBlock from '@/components/storyblok/TextBlock';
import TitleBlock from '@/components/storyblok/TitleBlock';
import HeroSection from '@/components/storyblok/HeroSection';
import AboutSection from '@/components/storyblok/AboutSection';
import PartnersSection from '@/components/storyblok/PartnersSection';
import OnTheWaySection from '@/components/storyblok/OnTheWaySection';
import DecoBallSection from '@/components/storyblok/DecoBallSection';
import ContactSection from '@/components/storyblok/ContactSection';

// Configuration Storyblok selon la documentation officielle
storyblokInit({
  // Token d'accès avec vérification
  accessToken: process.env['NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN'] || '',
  
  // Plugin API pour récupérer le contenu
  use: [apiPlugin],
  
  // Enregistrement des composants
  components: {
    // Blocs de contenu
    'text-block': TextBlock,
    'title-block': TitleBlock,
    
    // Sections principales
    'hero-section': HeroSection,
    'about-section': AboutSection,
    'partners-section': PartnersSection,
    'on-the-way-section': OnTheWaySection,
    'deco-ball-section': DecoBallSection,
    'contact-section': ContactSection,
  },
  
  // Configuration API
  apiOptions: {
    region: 'eu', // Région européenne
    cache: {
      clear: 'auto',
      type: 'memory'
    }
  },
  
  // Enable le composant de fallback pour les composants non trouvés
  enableFallbackComponent: true,
});

// Export de l'API Storyblok selon la documentation officielle
export const storyblokApi = getStoryblokApi;

// Types pour le contenu bilingue (alignés sur l'architecture actuelle)
export interface BilingualContent<T> {
  fr: T;
  en: T;
}

// Interface de base pour tous les blocs Storyblok
export interface StoryblokBaseBlok {
  component: string;
  _uid: string;
  [key: string]: any; // Index signature pour compatibilité
}

// Types pour les sections principales identifiées
export interface StoryblokHeroContent extends StoryblokBaseBlok {
  title: BilingualContent<string>;
  subtitle: BilingualContent<string>;
  date: BilingualContent<string>;
  location: BilingualContent<string>;
  cta: BilingualContent<string>;
}

export interface StoryblokTextBlock extends StoryblokBaseBlok {
  content_fr: string;
  content_en: string;
  highlighted_phrases_fr?: string;
  highlighted_phrases_en?: string;
}

export interface StoryblokTitleBlock extends StoryblokBaseBlok {
  title_fr: string;
  title_en: string;
  subtitle_fr?: string;
  subtitle_en?: string;
  level: 'h1' | 'h2' | 'h3' | 'h4';
  style: 'hero' | 'section' | 'subsection';
}

export interface StoryblokSection extends StoryblokBaseBlok {
  title: StoryblokTitleBlock;
  blocks: StoryblokTextBlock[];
  images?: string[];
}

// Interface principale pour une page de festival
export interface StoryblokFestivalPage extends StoryblokBaseBlok {
  hero: StoryblokHeroContent;
  about: StoryblokSection;
  partners: StoryblokSection;
  on_the_way: StoryblokSection;
  deco_ball: StoryblokSection;
  contact: {
    heading: BilingualContent<string>;
    intro: BilingualContent<string>;
    phone: string;
    email: string;
    website: string;
    whatsapp: BilingualContent<string>;
  };
  navigation: BilingualContent<{
    hero: string;
    about: string;
    partners: string;
    ontheway: string;
    decoball: string;
    contact: string;
    tickets: string;
  }>;
}

// Helper pour récupérer une histoire avec cache
export async function getStory(slug: string, version: 'draft' | 'published' = 'published') {
  if (!storyblokApi) {
    throw new Error('Storyblok API not initialized');
  }
  const { data } = await storyblokApi().get(`cdn/stories/${slug}`, {
    version,
  });
  return data.story;
}

// Helper pour récupérer toutes les histoires d'un type
export async function getStoriesByContentType(content_type: string) {
  if (!storyblokApi) {
    throw new Error('Storyblok API not initialized');
  }
  const { data } = await storyblokApi().get('cdn/stories', {
    starts_with: content_type,
    version: 'published',
  });
  return data.stories;
}