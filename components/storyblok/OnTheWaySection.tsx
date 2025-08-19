/**
 * Composant Storyblok: Section "On The Way"
 * Reproduit EXACTEMENT le design original avec SectionGroup, titre complexe et 2 layouts
 */

import React from 'react';
import { motion } from 'framer-motion';
import { storyblokEditable } from '@storyblok/react';
import SectionGroup from '@/components/SectionGroup';
import OptimizedImage from '@/components/OptimizedImage';
import type { Language } from '@/types';
import type { StoryblokBaseBlok } from '@/lib/storyblok';

export interface StoryblokOnTheWaySectionData extends StoryblokBaseBlok {
  title_fr: string;
  title_en: string;
  first_text_fr: string;
  first_text_en: string;
  second_text_fr: string;
  second_text_en: string;
}

interface OnTheWaySectionProps {
  blok: StoryblokOnTheWaySectionData;
  lang: Language;
  isCompactMode: boolean;
}

export default function OnTheWaySection({ blok, lang, isCompactMode }: OnTheWaySectionProps) {
  // Récupération des données
  const title = blok[`title_${lang}` as keyof StoryblokOnTheWaySectionData] as string || '';
  const firstText = blok[`first_text_${lang}` as keyof StoryblokOnTheWaySectionData] as string || '';
  const secondText = blok[`second_text_${lang}` as keyof StoryblokOnTheWaySectionData] as string || '';

  // Titre complexe avec sous-titre EXACTEMENT comme l'original
  const complexTitle = (
    <div className="text-center space-y-1">
      <div className="font-bold leading-tight">{title}</div>
      <div className="h-px w-12 bg-accent mx-auto opacity-60"></div>
      <div className="font-body text-accent text-[0.5em] font-normal uppercase tracking-[0.3em] leading-none opacity-90">
        SPECTACLE IMMERSIF
      </div>
    </div>
  );

  return (
    <SectionGroup 
      {...storyblokEditable(blok)}
      id="ontheway" 
      title={complexTitle}
      isCompactMode={isCompactMode}
    >
      {/* Premier layout: texte et image bateau */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
        {/* Colonne gauche - Premier texte */}
        {firstText && (
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <p 
              className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: firstText }}
            />
          </motion.div>
        )}
        
        {/* Colonne droite - Image bateau */}
        <OptimizedImage
          src="/images/bateau.png"
          alt="Bateau - Port du Havre 1925"
          width={400}
          height={500}
          className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
        />
      </div>
      
      {/* Deuxième layout: image woman_or et texte esthétique transatlantique */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10 mt-6 xs:mt-7 sm:mt-8 lg:mt-10">
        {/* Colonne gauche - Image woman_or */}
        <OptimizedImage
          src="/images/woman_or.jpg"
          alt="Femme Art Déco - Esthétique transatlantique"
          width={400}
          height={500}
          className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
        />
        
        {/* Colonne droite - Deuxième texte */}
        {secondText && (
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <p 
              className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: secondText }}
            />
          </motion.div>
        )}
      </div>
    </SectionGroup>
  );
}