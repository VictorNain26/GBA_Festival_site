/**
 * Helper pour gérer le Rich Text de Storyblok
 * Permet à la cliente de formater facilement tout le contenu
 */

import { renderRichText } from '@storyblok/react/rsc';
import { getTypography, getVerticalSpacing } from '@/constants/designTokens';

/**
 * Rend le contenu Rich Text de Storyblok avec les styles Art Déco cohérents
 * @param document - Le document Rich Text de Storyblok
 * @returns HTML formaté ou chaîne vide avec système de design harmonisé
 */
export function renderStoryblokRichText(document: any): string {
  if (!document) {
    return '';
  }
  
  // Si c'est une string simple (pour la rétrocompatibilité)
  if (typeof document === 'string') {
    return document;
  }
  
  // Si c'est un objet Rich Text
  try {
    const html = renderRichText(document);
    
    if (!html) {
      return '';
    }
    
    // Générer les classes de typographie et espacement cohérents
    const bodyClasses = `${getTypography('bodyText')} text-primary ${getVerticalSpacing('paragraph')} text-justify`.replace(/\s+/g, ' ');
    const strongClasses = 'font-bold text-accent'; // Gras avec couleur accent
    
    // Appliquer nos styles Art Déco harmonisés
    return html
      // Paragraphes avec système de design cohérent
      .replace(/<p>/g, `<p class="${bodyClasses}">`)
      // Support pour le texte rouge avec classe accent cohérente
      .replace(/style="color:\s*#E55B45"/gi, 'class="text-accent"')
      .replace(/style="color:\s*rgb\(229,\s*91,\s*69\)"/gi, 'class="text-accent"')
      .replace(/style="color:\s*red"/gi, 'class="text-accent"')
      // Gras avec couleur accent harmonisée
      .replace(/<strong>/g, `<strong class="${strongClasses}">`)
      // Listes avec espacement cohérent
      .replace(/<ul>/g, `<ul class="${getVerticalSpacing('paragraph')} pl-6">`)
      .replace(/<ol>/g, `<ol class="${getVerticalSpacing('paragraph')} pl-6">`)
      .replace(/<li>/g, `<li class="${getVerticalSpacing('text')}">`)
      // Titres h3, h4 avec typographie cohérente (utilisés parfois dans Rich Text)
      .replace(/<h3>/g, `<h3 class="${getTypography('subsectionTitle')} text-accent ${getVerticalSpacing('element')}">`)
      .replace(/<h4>/g, `<h4 class="${getTypography('secondaryText')} text-accent ${getVerticalSpacing('text')} font-bold uppercase tracking-wide">`);
  } catch (error) {
    console.error('Error rendering rich text:', error);
    return '';
  }
}

/**
 * Extrait le texte brut d'un document Rich Text (pour les titres par exemple)
 * @param document - Le document Rich Text
 * @returns Texte brut sans formatage
 */
export function extractPlainText(document: any): string {
  if (!document) {
    return '';
  }
  
  if (typeof document === 'string') {
    return document;
  }
  
  // Parcourir le document Rich Text pour extraire le texte
  try {
    const extractText = (node: any): string => {
      if (!node) {
        return '';
      }
      
      if (node.text) {
        return node.text;
      }
      
      if (node.content && Array.isArray(node.content)) {
        return node.content.map(extractText).join('');
      }
      
      return '';
    };
    
    return extractText(document);
  } catch (error) {
    console.error('Error extracting plain text:', error);
    return '';
  }
}