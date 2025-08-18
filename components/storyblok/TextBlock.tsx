/**
 * Composant Storyblok: Bloc de texte bilingue
 * Remplace les contenus texte actuels par du contenu éditable
 */

import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import type { Language } from '@/types';
import type { StoryblokTextBlock } from '@/lib/storyblok';

interface TextBlockProps {
  blok: StoryblokTextBlock;
  lang: Language;
  className?: string;
}

export default function TextBlock({ blok, lang, className = '' }: TextBlockProps) {
  // Récupère le contenu dans la langue active
  const content = blok[`content_${lang}` as keyof StoryblokTextBlock] as string || '';
  const highlightedPhrases = blok[`highlighted_phrases_${lang}` as keyof StoryblokTextBlock] as string || '';
  
  // Parse les phrases surlignées (séparées par virgules)
  const phrasesToHighlight = highlightedPhrases 
    ? highlightedPhrases.split(',').map(phrase => phrase.trim())
    : [];
  
  // Fonction pour surligner les phrases
  const highlightText = (text: string): React.ReactNode => {
    if (phrasesToHighlight.length === 0 || !text) {
      return text;
    }
    
    let result: React.ReactNode = text;
    
    phrasesToHighlight.forEach((phrase, index) => {
      if (typeof result === 'string' && phrase.length > 0) {
        const parts = result.split(phrase);
        if (parts.length > 1) {
          result = parts.reduce<React.ReactNode[]>((acc, part, i) => {
            if (i === 0) {
              return [part];
            }
            return [
              ...acc,
              <span key={`highlight-${index}-${i}`} className="text-accent">
                {phrase}
              </span>,
              part
            ];
          }, []);
        }
      }
    });
    
    return result;
  };

  return (
    <div
      {...storyblokEditable(blok)}
      className={`font-body text-base xs:text-lg sm:text-xl lg:text-2xl text-primary leading-relaxed ${className}`}
    >
      {highlightText(content)}
    </div>
  );
}