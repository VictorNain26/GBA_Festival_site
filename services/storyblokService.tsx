/**
 * Service centralisé pour la gestion des données Storyblok
 * Respect des principes SOLID : SRP, OCP, DIP
 */

import { renderRichText } from '@/lib/richTextRenderer';
import type { StoryblokStory } from '@/lib/storyblok-api';
import { PRESET_CLASSES } from '@/constants/designTokens';

export interface StoryblokDataService {
  getSimpleText(field: string, fallback?: string): string;
  getSectionData(sectionName: string, field: string, fallback?: string): string;
  getSectionRichText(sectionName: string, field: string): React.ReactNode;
}

/**
 * Utilitaires pour l'extraction de texte Rich Text
 * DRY : Code réutilisé entre tous les helpers
 */
class RichTextExtractor {
  static extractPlainText(fieldData: any): string {
    if (typeof fieldData === 'string') {
      return fieldData;
    }
    
    if (fieldData && typeof fieldData === 'object' && fieldData.type === 'doc' && fieldData.content) {
      const extractText = (node: any): string => {
        if (!node) {
          return '';
        }
        if (typeof node === 'string') {
          return node;
        }
        if (node.text) {
          return node.text;
        }
        if (Array.isArray(node.content)) {
          return node.content.map(extractText).join('');
        }
        if (Array.isArray(node)) {
          return node.map(extractText).join('');
        }
        return '';
      };
      return extractText(fieldData);
    }
    
    return String(fieldData);
  }
}

/**
 * Configuration centralisée pour les composants de fallback
 * DRY : Évite la duplication des styles de fallback
 */
export const FALLBACK_COMPONENTS = {
  text: (text: string) => (
    <span className={PRESET_CLASSES.fallbackText}>{text}</span>
  ),
  richText: (text: string) => (
    <span className={PRESET_CLASSES.fallbackText}>{text}</span>
  )
} as const;

/**
 * Implémentation du service Storyblok
 * SRP : Responsabilité unique de gestion des données Storyblok
 */
export class StoryblokService implements StoryblokDataService {
  constructor(
    private readonly story: StoryblokStory | null,
    private readonly hasStoryblokData: boolean
  ) {}

  /**
   * Recherche un bloc de composant dans l'arbre Storyblok
   * DRY : Logique de recherche centralisée
   */
  private findComponent(componentName: string) {
    if (!this.hasStoryblokData || !this.story?.content || !this.story.content.body) {
      return null;
    }
    
    return this.story.content.body.find((block: any) => block.component === componentName);
  }

  /**
   * Récupère du texte simple depuis le hero-section
   * SRP : Responsabilité unique de récupération de texte simple
   */
  getSimpleText(field: string, fallback?: string): string {
    const heroSection = this.findComponent('hero-section');
    
    if (heroSection && heroSection[field]) {
      try {
        return RichTextExtractor.extractPlainText(heroSection[field]);
      } catch (error) {
        console.warn(`Erreur extraction texte pour ${field}:`, error);
      }
    }
    
    return fallback || `${field}`;
  }

  /**
   * Récupère des données depuis des blocs de section
   * SRP : Responsabilité unique de récupération de données de section
   */
  getSectionData(sectionName: string, field: string, fallback?: string): string {
    const componentName = `${sectionName}-section`;
    const sectionContent = this.findComponent(componentName);
    
    if (sectionContent && sectionContent[field]) {
      return sectionContent[field];
    }
    
    return fallback || `${sectionName}_section.${field}`;
  }

  /**
   * Récupère et rend du Rich Text depuis des blocs de section
   * SRP : Responsabilité unique de rendu Rich Text
   */
  getSectionRichText(sectionName: string, field: string): React.ReactNode {
    const componentName = `${sectionName}-section`;
    const sectionContent = this.findComponent(componentName);
    
    if (sectionContent && sectionContent[field]) {
      const fieldData = sectionContent[field];
      
      // Si c'est un string simple, utiliser le composant de texte simple
      if (typeof fieldData === 'string') {
        return (
          <p className={PRESET_CLASSES.richTextParagraph}>
            {fieldData}
          </p>
        );
      }
      
      // Si c'est un objet Rich Text valide
      if (fieldData && typeof fieldData === 'object') {
        try {
          return renderRichText(fieldData);
        } catch (error) {
          console.warn(`Erreur rendu Rich Text pour ${sectionName}.${field}:`, error);
          return FALLBACK_COMPONENTS.richText(`${sectionName}_section.${field} [erreur rendu]`);
        }
      }
    }
    
    return FALLBACK_COMPONENTS.richText(`${sectionName}_section.${field}`);
  }
}

/**
 * Factory pour créer une instance du service Storyblok
 * DIP : Inversion de dépendance via factory pattern
 */
export function createStoryblokService(
  story: StoryblokStory | null,
  hasStoryblokData: boolean
): StoryblokDataService {
  return new StoryblokService(story, hasStoryblokData);
}