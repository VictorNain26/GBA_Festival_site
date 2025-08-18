/**
 * Composant Storyblok: Bloc de titre bilingue
 * Gère les titres de sections avec style Art Déco
 */

import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import type { Language } from '@/types';
import type { StoryblokTitleBlock } from '@/lib/storyblok';

interface TitleBlockProps {
  blok: StoryblokTitleBlock;
  lang: Language;
  className?: string;
}

export default function TitleBlock({ blok, lang, className = '' }: TitleBlockProps) {
  const title = blok[`title_${lang}` as keyof StoryblokTitleBlock] as string || '';
  const subtitle = blok[`subtitle_${lang}` as keyof StoryblokTitleBlock] as string || '';
  
  // Classes CSS basées sur le style
  const getStyles = () => {
    switch (blok.style) {
      case 'hero':
        return {
          title: 'font-title text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-primary leading-tight tracking-wider',
          subtitle: 'font-body text-lg xs:text-xl sm:text-2xl lg:text-3xl text-primary/90 mt-4'
        };
      case 'section':
        return {
          title: 'font-title text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-primary leading-tight tracking-wide',
          subtitle: 'font-body text-base xs:text-lg sm:text-xl lg:text-2xl text-primary/80 mt-3'
        };
      case 'subsection':
        return {
          title: 'font-title text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-primary leading-tight',
          subtitle: 'font-body text-sm xs:text-base sm:text-lg lg:text-xl text-primary/70 mt-2'
        };
      default:
        return {
          title: 'font-title text-2xl text-primary leading-tight',
          subtitle: 'font-body text-base text-primary/80 mt-2'
        };
    }
  };
  
  const styles = getStyles();
  const Tag = blok.level || 'h2';

  return (
    <div
      {...storyblokEditable(blok)}
      className={`text-center ${className}`}
    >
      <Tag className={styles.title}>
        {/* Support des retours à la ligne dans les titres */}
        {title.split('\\n').map((line, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </Tag>
      
      {subtitle && (
        <div className={styles.subtitle}>
          {subtitle.split('\\n').map((line, index) => (
            <React.Fragment key={index}>
              {index > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}