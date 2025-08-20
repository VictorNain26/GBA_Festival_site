/**
 * Système Rich Text Robuste pour Storyblok
 * Solution propre avec fallback intelligent pour React 19/Next.js 15
 */

import React from 'react';
import { render, type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { PRESET_CLASSES } from '@/constants/designTokens';

// Types pour la sécurité
interface RichTextDocument {
  type?: string;
  content?: any[];
  text?: string;
  marks?: any[];
  attrs?: any;
}

/**
 * Options personnalisées pour le rendu Rich Text
 * Applique automatiquement les classes Tailwind du design
 */
const getRichTextOptions = () => ({
  markResolvers: {
    // Texte en gras
    bold: (children: React.ReactNode) => (
      <strong className="font-semibold">{children}</strong>
    ),
    // Texte en italique
    italic: (children: React.ReactNode) => (
      <em className="italic">{children}</em>
    ),
    // Liens
    link: (children: React.ReactNode, props: any) => (
      <a 
        href={props.href}
        target={props.target || '_self'}
        rel={props.target === '_blank' ? 'noopener noreferrer' : undefined}
        className="text-accent hover:text-primary transition-colors duration-200 underline"
      >
        {children}
      </a>
    ),
    // Couleur accent (rouge) - Storyblok permet de définir des styles custom
    styled: (children: React.ReactNode, props: any) => {
      const className = props.class || '';
      
      // Si la classe contient "accent", appliquer la couleur accent
      if (className.includes('accent') || className.includes('highlight')) {
        return <span className="text-accent">{children}</span>;
      }
      
      // Sinon, appliquer la classe telle quelle
      return <span className={className}>{children}</span>;
    }
  },
  nodeResolvers: {
    // Paragraphes avec les bonnes classes
    paragraph: (children: React.ReactNode) => (
      <p className={PRESET_CLASSES.richTextParagraph}>
        {children}
      </p>
    ),
    // Titres
    heading: (children: React.ReactNode, props: any) => {
      const level = props.level || 1;
      const baseClasses = "font-title text-accent mb-2 xs:mb-3";
      
      const sizeClasses = {
        1: "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl",
        2: "text-xl sm:text-2xl lg:text-3xl",
        3: "text-lg sm:text-xl lg:text-2xl",
        4: "text-base sm:text-lg lg:text-xl",
        5: "text-sm sm:text-base lg:text-lg",
        6: "text-sm"
      };
      
      const className = `${baseClasses} ${sizeClasses[level as keyof typeof sizeClasses] || sizeClasses[3]}`;
      
      switch (level) {
        case 1: return <h1 className={className}>{children}</h1>;
        case 2: return <h2 className={className}>{children}</h2>;
        case 3: return <h3 className={className}>{children}</h3>;
        case 4: return <h4 className={className}>{children}</h4>;
        case 5: return <h5 className={className}>{children}</h5>;
        case 6: return <h6 className={className}>{children}</h6>;
        default: return <h3 className={className}>{children}</h3>;
      }
    },
    // Listes à puces
    bullet_list: (children: React.ReactNode) => (
      <ul className="list-disc list-inside mb-4 text-primary space-y-2">
        {children}
      </ul>
    ),
    // Éléments de liste
    list_item: (children: React.ReactNode) => (
      <li className="text-base sm:text-lg lg:text-xl leading-relaxed">
        {children}
      </li>
    )
  }
});

/**
 * Extrait le texte brut d'un document Rich Text (fallback)
 */
function extractPlainText(document: RichTextDocument | any): string {
  if (!document) { return ''; }
  
  if (typeof document === 'string') { return document; }
  
  if (document.text && typeof document.text === 'string') {
    return document.text;
  }
  
  if (Array.isArray(document.content)) {
    return document.content.map(extractPlainText).join('');
  }
  
  if (typeof document === 'object' && document.content && Array.isArray(document.content)) {
    return document.content.map(extractPlainText).join(' ');
  }
  
  return '';
}

/**
 * Validation de la structure Rich Text
 */
function isValidRichText(document: any): boolean {
  if (!document) { return false; }
  if (typeof document === 'string') { return true; }
  if (typeof document !== 'object') { return false; }
  
  // Structure Rich Text valide
  return (
    document.type === 'doc' || 
    Array.isArray(document.content) || 
    typeof document.text === 'string'
  );
}

/**
 * Rendu Rich Text principal avec fallback intelligent
 */
export function renderRichText(document: StoryblokRichtext | any): React.ReactNode {
  // Cas 1: Document vide ou null
  if (!document) {
    return null;
  }
  
  // Cas 2: String simple
  if (typeof document === 'string') {
    return (
      <p className={PRESET_CLASSES.richTextParagraph}>
        {document}
      </p>
    );
  }
  
  // Cas 3: Validation de la structure
  if (!isValidRichText(document)) {
    console.warn('Document Rich Text invalide, utilisation du fallback texte brut');
    const plainText = extractPlainText(document);
    if (!plainText) { return null; }
    
    return (
      <p className={PRESET_CLASSES.richTextParagraph}>
        {plainText}
      </p>
    );
  }
  
  // Cas 4: Rendu Rich Text avec le renderer officiel
  try {
    const options = getRichTextOptions();
    return render(document, options);
  } catch (error) {
    console.warn('Erreur lors du rendu Rich Text, utilisation du fallback:', error);
    
    // Fallback : extraire le texte et le rendre proprement
    const plainText = extractPlainText(document);
    if (!plainText) { return null; }
    
    return (
      <p className={PRESET_CLASSES.richTextParagraph}>
        {plainText}
      </p>
    );
  }
}

/**
 * Rendu Rich Text pour les titres (extraction du texte brut)
 */
export function renderRichTextTitle(document: any): string {
  if (!document) { return ''; }
  if (typeof document === 'string') { return document; }
  
  return extractPlainText(document);
}

/**
 * Helper pour rendre Rich Text en HTML string (pour dangerouslySetInnerHTML si nécessaire)
 */
export function renderRichTextToHTML(document: any): string {
  if (!document) { return ''; }
  
  if (typeof document === 'string') {
    return `<p class="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify mb-3 xs:mb-4 sm:mb-4 lg:mb-4">${document}</p>`;
  }
  
  try {
    // Pour les cas simples, on extrait le texte
    const plainText = extractPlainText(document);
    if (plainText) {
      return `<p class="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify mb-3 xs:mb-4 sm:mb-4 lg:mb-4">${plainText}</p>`;
    }
    
    return '';
  } catch (error) {
    console.warn('Erreur lors du rendu Rich Text vers HTML:', error);
    return '';
  }
}