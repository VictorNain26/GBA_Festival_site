/**
 * Composant pour rendre le Rich Text de Storyblok
 * Adapté au design Art Déco avec support des couleurs accent
 */

import React from 'react';
import { renderRichText } from '@storyblok/react/rsc';

interface RichTextRendererProps {
  content: any; // Le type RichText de Storyblok
  className?: string;
}

/**
 * Rendu personnalisé du Rich Text Storyblok
 * Conserve les styles Art Déco et gère les couleurs accent
 */
export default function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  if (!content) {
    return null;
  }

  // Configuration du rendu personnalisé
  const renderedContent = renderRichText(content);
  
  if (!renderedContent) {
    return null;
  }

  // Remplacer les classes par défaut de Storyblok par nos classes Tailwind
  const htmlContent = renderedContent
    // Paragraphes avec notre style
    .replace(/<p>/g, '<p class="mb-7 xs:mb-8 sm:mb-9 lg:mb-6 xl:mb-7 leading-relaxed text-base sm:text-lg lg:text-xl text-primary text-justify">')
    // Support pour le texte rouge via l'éditeur
    .replace(/color:\s*#E55B45/gi, 'color: var(--color-accent)')
    .replace(/color:\s*red/gi, 'color: var(--color-accent)')
    .replace(/color:\s*#ff0000/gi, 'color: var(--color-accent)')
    // Gras
    .replace(/<strong>/g, '<strong class="font-bold text-accent">')
    // Italique
    .replace(/<em>/g, '<em class="italic">');

  return (
    <div 
      className={`rich-text-content ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

/**
 * Version alternative pour les textes simples qui peuvent être du Rich Text ou du texte brut
 */
export function renderStoryblokText(content: any | string, className = ''): React.ReactElement {
  // Si c'est une string simple, on la rend directement
  if (typeof content === 'string') {
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Sinon on utilise le Rich Text Renderer
  return <RichTextRenderer content={content} className={className} />;
}