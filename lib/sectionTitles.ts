/**
 * Helpers pour extraire les titres des sections depuis Storyblok
 * et les utiliser de manière synchronisée dans la navigation
 */

import type { Language } from '@/types';
import { renderRichTextTitle } from '@/lib/richTextRenderer';

interface SectionTitleMapping {
  [sectionId: string]: {
    fr: string;
    en: string;
  };
}

/**
 * Extrait les titres des sections depuis le story Storyblok
 * et les map aux IDs de sections utilisés dans la navigation
 */
export function extractSectionTitles(story: any): SectionTitleMapping {
  const titles: SectionTitleMapping = {};
  
  if (!story?.content?.body || !Array.isArray(story.content.body)) {
    return titles;
  }

  story.content.body.forEach((section: any) => {
    switch (section.component) {
      case 'about-section':
        if (section.title_fr || section.title_en) {
          titles['about'] = {
            fr: renderRichTextTitle(section.title_fr) || 'Art Déco et Neo Art Déco',
            en: renderRichTextTitle(section.title_en) || 'Art Deco and Neo Art Deco'
          };
        }
        break;
        
      case 'partners-section':
        if (section.title_fr || section.title_en) {
          titles['partners'] = {
            fr: renderRichTextTitle(section.title_fr) || 'Nos Partenaires',
            en: renderRichTextTitle(section.title_en) || 'Our Partners'
          };
        }
        break;
        
      case 'on-the-way-section':
        if (section.title_fr || section.title_en) {
          titles['ontheway'] = {
            fr: renderRichTextTitle(section.title_fr) || 'On the Way',
            en: renderRichTextTitle(section.title_en) || 'On the Way'
          };
        }
        break;
        
      case 'deco-ball-section':
        if (section.title_fr || section.title_en) {
          titles['decoball'] = {
            fr: renderRichTextTitle(section.title_fr) || 'Le Bal Art Déco',
            en: renderRichTextTitle(section.title_en) || 'The Art Deco Ball'
          };
        }
        break;
        
      case 'contact-section':
        if (section.title_fr || section.title_en) {
          titles['contact'] = {
            fr: renderRichTextTitle(section.title_fr) || 'Contact',
            en: renderRichTextTitle(section.title_en) || 'Contact'
          };
        }
        break;
        
      default:
        break;
    }
  });
  
  return titles;
}

/**
 * Génère les labels de navigation en utilisant les titres extraits
 * avec des fallbacks pour les éléments manquants
 */
export function generateNavigationLabels(
  extractedTitles: SectionTitleMapping, 
  lang: Language
) {
  // Fallbacks par défaut
  const fallbacks = {
    fr: {
      hero: 'Accueil',
      about: 'Art Déco et Neo Art Déco',
      partners: 'Nos Partenaires',
      ontheway: 'On the Way',
      decoball: 'Le Bal Art Déco',
      contact: 'Contact',
      tickets: 'Billeterie',
    },
    en: {
      hero: 'Home',
      about: 'Art Deco and Neo Art Deco',
      partners: 'Our Partners',
      ontheway: 'On the Way',
      decoball: 'The Art Deco Ball',
      contact: 'Contact',
      tickets: 'Tickets',
    }
  };

  return {
    hero: fallbacks[lang].hero, // Toujours utiliser les fallbacks pour Accueil/Home
    about: extractedTitles['about']?.[lang] || fallbacks[lang].about,
    partners: extractedTitles['partners']?.[lang] || fallbacks[lang].partners,
    ontheway: extractedTitles['ontheway']?.[lang] || fallbacks[lang].ontheway,
    decoball: extractedTitles['decoball']?.[lang] || fallbacks[lang].decoball,
    contact: extractedTitles['contact']?.[lang] || fallbacks[lang].contact,
    tickets: fallbacks[lang].tickets, // Toujours utiliser les fallbacks pour Billeterie/Tickets
  };
}