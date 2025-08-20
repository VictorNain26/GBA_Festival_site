/**
 * Composant Storyblok: Section "On The Way"
 * Reproduit EXACTEMENT le design original avec SectionGroup, titre complexe et 2 layouts
 */

import React from 'react';
import { motion } from 'framer-motion';
import { storyblokEditable } from '@storyblok/react';
import SectionGroup from '@/components/SectionGroup';
import OptimizedImage from '@/components/OptimizedImage';
import { renderRichText, renderRichTextTitle } from '@/lib/richTextRenderer';
import type { Language } from '@/types';
import type { StoryblokBaseBlok } from '@/lib/storyblok';
import type { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';

export interface StoryblokOnTheWaySectionData extends StoryblokBaseBlok {
  title_fr: StoryblokRichtext;
  title_en: StoryblokRichtext;
  // Section 1 - Texte + Image bateau
  section1_text_fr: StoryblokRichtext;
  section1_text_en: StoryblokRichtext;
  // Section 2 - Image woman_or + Texte esthétique transatlantique
  section2_text_fr: StoryblokRichtext;
  section2_text_en: StoryblokRichtext;
  // Section 3 - Texte voyageurs + Image restaurant
  section3_text_fr: StoryblokRichtext;
  section3_text_en: StoryblokRichtext;
  // Section 4 - Image men + Texte ambiance parisienne
  section4_text_fr: StoryblokRichtext;
  section4_text_en: StoryblokRichtext;
  // Section 5 - Texte mise en scène + Image tete_air
  section5_text_fr: StoryblokRichtext;
  section5_text_en: StoryblokRichtext;
}

interface OnTheWaySectionProps {
  blok: StoryblokOnTheWaySectionData;
  lang: Language;
  isCompactMode: boolean;
}

export default function OnTheWaySection({ blok, lang, isCompactMode }: OnTheWaySectionProps) {
  // Rich Text avec rendu robuste
  const titleDoc = blok[`title_${lang}` as keyof StoryblokOnTheWaySectionData] as StoryblokRichtext;
  const section1TextDoc = blok[`section1_text_${lang}` as keyof StoryblokOnTheWaySectionData] as StoryblokRichtext;
  const section2TextDoc = blok[`section2_text_${lang}` as keyof StoryblokOnTheWaySectionData] as StoryblokRichtext;
  const section3TextDoc = blok[`section3_text_${lang}` as keyof StoryblokOnTheWaySectionData] as StoryblokRichtext;
  const section4TextDoc = blok[`section4_text_${lang}` as keyof StoryblokOnTheWaySectionData] as StoryblokRichtext;
  const section5TextDoc = blok[`section5_text_${lang}` as keyof StoryblokOnTheWaySectionData] as StoryblokRichtext;
  
  const title = renderRichTextTitle(titleDoc) || 'On the Way';

  // Titre complexe avec sous-titre EXACTEMENT comme l'original - TAILLES AJUSTÉES
  const complexTitle = (
    <div className="text-center space-y-1">
      <div className="font-bold leading-tight">{title}</div>
      <div className="h-px w-12 bg-accent mx-auto opacity-60"></div>
      <div className="font-body text-accent text-[0.45em] xs:text-[0.5em] sm:text-[0.55em] lg:text-[0.6em] font-normal uppercase tracking-[0.15em] xs:tracking-[0.2em] sm:tracking-[0.25em] leading-tight opacity-90">
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
      {/* SECTION 1: texte ON THE WAY flashmob + image bateau */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
        {/* Colonne gauche - Texte section 1 */}
        {section1TextDoc && (
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
              {renderRichText(section1TextDoc)}
            </div>
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
      
      {/* SECTION 2: image woman_or + texte esthétique transatlantique */}
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
        
        {/* Colonne droite - Texte section 2 */}
        {section2TextDoc && (
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
              {renderRichText(section2TextDoc)}
            </div>
          </motion.div>
        )}
      </div>

      {/* SECTION 3: texte voyageurs (Coco Chanel, etc.) + image restaurant */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10 mt-6 xs:mt-7 sm:mt-8 lg:mt-10">
        {/* Colonne gauche - Texte section 3 */}
        {section3TextDoc && (
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
              {renderRichText(section3TextDoc)}
            </div>
          </motion.div>
        )}
        
        {/* Colonne droite - Image restaurant */}
        <OptimizedImage
          src="/images/restaurant.jpg"
          alt="Restaurant Art Déco - Ambiance des Années Folles"
          width={400}
          height={500}
          className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
        />
      </div>

      {/* SECTION 4: image men + texte ambiance parisienne 1925 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10 mt-6 xs:mt-7 sm:mt-8 lg:mt-10">
        {/* Colonne gauche - Image men */}
        <OptimizedImage
          src="/images/men.jpg"
          alt="Hommes élégants - Époque Art Déco"
          width={400}
          height={500}
          className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
        />
        
        {/* Colonne droite - Texte section 4 */}
        {section4TextDoc && (
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
              {renderRichText(section4TextDoc)}
            </div>
          </motion.div>
        )}
      </div>

      {/* SECTION 5: texte mise en scène Julie Durieux + image tete_air */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10 mt-6 xs:mt-7 sm:mt-8 lg:mt-10">
        {/* Colonne gauche - Texte section 5 */}
        {section5TextDoc && (
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
              {renderRichText(section5TextDoc)}
            </div>
          </motion.div>
        )}
        
        {/* Colonne droite - Image tete_air */}
        <OptimizedImage
          src="/images/tete_air.jpg"
          alt="Portrait Art Déco - Mise en scène Julie Durieux"
          width={400}
          height={500}
          className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
        />
      </div>
    </SectionGroup>
  );
}