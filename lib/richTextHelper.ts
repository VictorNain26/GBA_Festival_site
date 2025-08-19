/**
 * Helper pour gérer le Rich Text de Storyblok
 * Permet à la cliente de formater facilement tout le contenu
 */

import { renderRichText } from '@storyblok/react/rsc';

/**
 * Rend le contenu Rich Text de Storyblok avec les styles Art Déco
 * @param document - Le document Rich Text de Storyblok
 * @returns HTML formaté ou chaîne vide
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
    
    // Appliquer nos styles Art Déco
    return html
      // Paragraphes avec nos styles
      .replace(/<p>/g, '<p class="mb-7 xs:mb-8 sm:mb-9 lg:mb-6 xl:mb-7 leading-relaxed text-base sm:text-lg lg:text-xl text-primary text-justify">')
      // Support pour le texte rouge (#E55B45 = var(--color-accent))
      .replace(/style="color:\s*#E55B45"/gi, 'class="text-accent"')
      .replace(/style="color:\s*rgb\(229,\s*91,\s*69\)"/gi, 'class="text-accent"')
      .replace(/style="color:\s*red"/gi, 'class="text-accent"')
      // Gras avec couleur accent
      .replace(/<strong>/g, '<strong class="font-bold">');
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