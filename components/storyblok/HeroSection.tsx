/**
 * Composant Storyblok: Section Héro du festival
 * Version éditable de la section héro actuelle
 */

import React from 'react';
import { motion } from 'framer-motion';
import { storyblokEditable } from '@storyblok/react';
import type { Language } from '@/types';
import type { StoryblokBaseBlok } from '@/lib/storyblok';

export interface StoryblokHeroSectionData extends StoryblokBaseBlok {
  title_fr: string;
  title_en: string;
  subtitle_fr: string;
  subtitle_en: string;
  date_fr: string;
  date_en: string;
  location_fr: string;
  location_en: string;
  cta_text_fr: string;
  cta_text_en: string;
  cta_link?: string;
}

interface HeroSectionProps {
  blok: StoryblokHeroSectionData;
  lang: Language;
}

export default function HeroSection({ blok, lang }: HeroSectionProps) {
  const title = blok[`title_${lang}` as keyof StoryblokHeroSectionData] as string || '';
  const subtitle = blok[`subtitle_${lang}` as keyof StoryblokHeroSectionData] as string || '';
  const date = blok[`date_${lang}` as keyof StoryblokHeroSectionData] as string || '';
  const location = blok[`location_${lang}` as keyof StoryblokHeroSectionData] as string || '';
  const cta = blok[`cta_text_${lang}` as keyof StoryblokHeroSectionData] as string || '';

  return (
    <section
      {...storyblokEditable(blok)}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 xs:px-6 sm:px-8 py-20"
    >
      {/* Titre principal */}
      <div className="text-center max-w-4xl mx-auto">
        {title && (
          <motion.h1
            className="font-title text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary leading-tight tracking-wider mb-6 xs:mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {title.split(' ').map((word, index) => (
              <span key={index}>
                {word.includes('Deco') ? (
                  <span className="text-accent">{word}</span>
                ) : (
                  word
                )}
                {index < title.split(' ').length - 1 && ' '}
              </span>
            ))}
          </motion.h1>
        )}

        {/* Sous-titre */}
        {subtitle && (
          <motion.p
            className="font-body text-lg xs:text-xl sm:text-2xl lg:text-3xl text-primary/90 mt-6 xs:mt-8 sm:mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Date et lieu */}
        {(date || location) && (
          <motion.div
            className="mt-8 xs:mt-10 sm:mt-12 space-y-2 xs:space-y-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {date && (
              <p className="font-title text-base xs:text-lg sm:text-xl lg:text-2xl text-accent tracking-wider">
                {date}
              </p>
            )}
            {location && (
              <p className="font-body text-sm xs:text-base sm:text-lg lg:text-xl text-primary/80">
                {location}
              </p>
            )}
          </motion.div>
        )}

        {/* Call to Action */}
        {cta && (
          <motion.div
            className="mt-10 xs:mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href={blok.cta_link || "#contact"}
              className="inline-block px-6 xs:px-8 sm:px-10 py-3 xs:py-4 font-title text-sm xs:text-base sm:text-lg lg:text-xl uppercase tracking-wider border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cta}
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
}