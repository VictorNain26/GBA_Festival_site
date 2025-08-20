/**
 * Navigation labels only - All content comes from Storyblok
 * This file only contains the essential navigation structure
 */

import type { 
  NavigationLabels, 
  Language 
} from '@/types';

// Navigation labels per language (needed for navigation structure)
export const NAV_LABELS: Record<Language, NavigationLabels> = {
  fr: {
    hero: 'Accueil',
    about: 'Art Deco et Neo Art Deco', 
    partners: 'Nos Partenaires',
    'on-the-way': 'On the Way',
    decoball: 'Le Bal Art Deco',
    contact: 'Contact',
    tickets: 'Billeterie',
  },
  en: {
    hero: 'Home',
    about: 'Art Deco and Neo Art Deco',
    partners: 'Our Partners', 
    'on-the-way': 'On the Way',
    decoball: 'The Art Deco Ball',
    contact: 'Contact',
    tickets: 'Tickets',
  },
};