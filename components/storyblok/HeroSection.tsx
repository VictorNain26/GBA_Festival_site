/**
 * Composant Storyblok: Section Héro du festival
 * Reproduit EXACTEMENT le design original avec tous les éléments visuels
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { storyblokEditable } from '@storyblok/react';
import HeroTitle from '@/components/HeroTitle';
import HeroSubtitle from '@/components/HeroSubtitle';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { extractPlainText } from '@/lib/richTextHelper';
import { getVerticalSpacing, getTypography, PRESET_CLASSES } from '@/constants/designTokens';
import type { Language } from '@/types';
import type { StoryblokBaseBlok } from '@/lib/storyblok';

export interface StoryblokHeroSectionData extends StoryblokBaseBlok {
  subtitle_fr: string;
  subtitle_en: string;
  date_fr: string;
  date_en: string;
  hotel_name_fr: string;
  hotel_name_en: string;
  location: string;
  cta_text_fr: string;
  cta_text_en: string;
}

interface HeroSectionProps {
  blok: StoryblokHeroSectionData;
  lang: Language;
}

export default function HeroSection({ blok, lang }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Memoize animation variants pour éviter les recreations
  const getAnimationVariants = useMemo(() => {
    return (delay = 0) => {
      if (prefersReducedMotion) {
        return {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.1, delay: Math.min(delay, 0.1) }
        };
      }
      
      return {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay }
      };
    };
  }, [prefersReducedMotion]);

  // Récupération des données avec gestion Rich Text et fallbacks
  const subtitle = extractPlainText(blok[`subtitle_${lang}` as keyof StoryblokHeroSectionData]) || '';
  const date = extractPlainText(blok[`date_${lang}` as keyof StoryblokHeroSectionData]) || '';
  const hotelName = extractPlainText(blok[`hotel_name_${lang}` as keyof StoryblokHeroSectionData]) || '';
  const location = extractPlainText(blok.location) || '';
  const cta = extractPlainText(blok[`cta_text_${lang}` as keyof StoryblokHeroSectionData]) || '';

  return (
    <section 
      {...storyblokEditable(blok)}
      id="hero" 
      className={`relative flex flex-col items-center justify-center min-h-screen ${PRESET_CLASSES.container} text-center ${getVerticalSpacing('content')}`}
    >
      {/* Festival subtitle */}
      {subtitle && (
        <HeroSubtitle 
          subtitle={subtitle} 
          getAnimationVariants={getAnimationVariants} 
        />
      )}

      {/* Date */}
      {date && (
        <motion.p
          className={`${getTypography('secondaryText')} text-primary ${getVerticalSpacing('text')} relative z-10`}
          {...getAnimationVariants(0.1)}
        >
          {date}
        </motion.p>
      )}

      {/* Titre principal - utilise le composant original */}
      <HeroTitle getAnimationVariants={getAnimationVariants} />

      {/* Call to action avec layout responsive identique à l'original */}
      <div className={`w-full flex flex-col items-center ${getVerticalSpacing('element')}`}>
        {/* Mobile/Tablet: Vertical stack */}
        <div className="flex lg:hidden flex-col items-center gap-3 xs:gap-4 sm:gap-4">
          {cta && (
            <motion.a
              href="#contact"
              className={`inline-block px-6 xs:px-7 sm:px-7 py-3 xs:py-4 sm:py-3 ${getTypography('navigationText')} uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background`}
              {...getAnimationVariants(0.2)}
            >
              {cta}
            </motion.a>
          )}
          
          <div className="flex flex-col items-center gap-2 xs:gap-3 sm:gap-2">
            {hotelName && (
              <motion.p
                className={`${getTypography('secondaryText')} text-accent`}
                {...getAnimationVariants(0.5)}
              >
                {hotelName}
              </motion.p>
            )}
            
            {location && (
              <motion.p
                className={`${getTypography('secondaryText')} text-accent`}
                {...getAnimationVariants(0.6)}
              >
                {location}
              </motion.p>
            )}
          </div>
        </div>

        {/* Desktop: Horizontal grid */}
        <div className="hidden lg:grid grid-cols-3 items-center w-full max-w-none">
          {hotelName && (
            <motion.p
              className={`${getTypography('secondaryText')} text-accent text-right`}
              {...getAnimationVariants(0.2)}
            >
              {hotelName}
            </motion.p>
          )}
          
          {cta && (
            <motion.a
              href="#contact"
              className={`inline-block px-6 xs:px-7 sm:px-8 lg:px-8 xl:px-10 py-3 xs:py-4 sm:py-3 lg:py-4 ${getTypography('navigationText')} uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background mx-auto`}
              {...getAnimationVariants(0.4)}
            >
              {cta}
            </motion.a>
          )}
          
          {location && (
            <motion.p
              className={`${getTypography('secondaryText')} text-accent text-left`}
              {...getAnimationVariants(0.6)}
            >
              {location}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}