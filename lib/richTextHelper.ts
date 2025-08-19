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
    
    if (!html || typeof html !== 'string') {
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
  
  // Si c'est déjà une chaîne, la retourner directement
  if (typeof document === 'string') {
    return document;
  }
  
  // Si c'est un objet React, le convertir en chaîne vide pour éviter l'erreur
  // MAIS pas si c'est un objet Rich Text Storyblok (qui a type: "doc")
  if (typeof document === 'object' && (document.$$typeof || (document.type && document.type !== 'doc' && document.type !== 'paragraph') || document.props)) {
    console.warn('extractPlainText: React element detected, returning empty string');
    return '';
  }
  
  // Parcourir le document Rich Text pour extraire le texte
  try {
    const extractText = (node: any): string => {
      if (!node) {
        return '';
      }
      
      // Si c'est un nombre ou booléen, le convertir en string
      if (typeof node === 'number' || typeof node === 'boolean') {
        return String(node);
      }
      
      // Si c'est déjà une string
      if (typeof node === 'string') {
        return node;
      }
      
      // Si c'est un objet React, ne pas l'utiliser
      // MAIS pas si c'est un objet Rich Text Storyblok
      if (typeof node === 'object' && (node.$$typeof || (node.type && node.type !== 'doc' && node.type !== 'paragraph' && node.type !== 'text') || node.props)) {
        return '';
      }
      
      // Gestion des objets text avec la propriété text
      if (node && typeof node === 'object' && node.text && typeof node.text === 'string') {
        return node.text;
      }
      
      // Gestion des objets avec contenu (paragraphes, etc.)
      if (node && typeof node === 'object' && node.content && Array.isArray(node.content)) {
        return node.content.map(extractText).join('');
      }
      
      // Pour les objets Rich Text Storyblok, vérifier la structure
      if (node && typeof node === 'object' && node.type === 'doc' && node.content && Array.isArray(node.content)) {
        return node.content.map(extractText).join(' ');
      }
      
      if (node && typeof node === 'object' && node.type === 'paragraph' && node.content && Array.isArray(node.content)) {
        return node.content.map(extractText).join('');
      }
      
      // Pour tous les autres objets, tenter de convertir en string
      if (typeof node === 'object') {
        return '';
      }
      
      return String(node);
    };
    
    const result = extractText(document);
    const finalResult = typeof result === 'string' ? result.trim() : '';
    
    // Dernière vérification de sécurité
    if (typeof finalResult !== 'string') {
      console.error('extractPlainText: Non-string result detected', finalResult);
      return '';
    }
    
    return finalResult;
  } catch (error) {
    console.error('Error extracting plain text:', error);
    // Si l'extraction échoue, retourner une chaîne vide pour éviter les erreurs de rendu
    return '';
  }
}