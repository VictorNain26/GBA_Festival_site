/**
 * Composant Storyblok: Section À propos du festival
 * Reproduit EXACTEMENT le design original avec SectionGroup, toutes les images et layout exact
 * VERSION RICH TEXT ROBUSTE: Interface intuitive avec fallback intelligent
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { storyblokEditable } from '@storyblok/react';
import SectionGroup from '@/components/SectionGroup';
import OptimizedImage from '@/components/OptimizedImage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { renderRichText, renderRichTextTitle } from '@/lib/richTextRenderer';
import type { Language } from '@/types';
import type { StoryblokBaseBlok } from '@/lib/storyblok';
import type { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';

export interface StoryblokAboutSectionData extends StoryblokBaseBlok {
  // Version RICH TEXT ROBUSTE: Interface intuitive pour votre cliente
  title_fr: StoryblokRichtext;
  title_en: StoryblokRichtext;
  intro_paragraphs_fr: StoryblokRichtext;
  intro_paragraphs_en: StoryblokRichtext;
  conclusion_paragraphs_fr: StoryblokRichtext;
  conclusion_paragraphs_en: StoryblokRichtext;
  target_title_fr: StoryblokRichtext;
  target_title_en: StoryblokRichtext;
  target_text_fr: StoryblokRichtext;
  target_text_en: StoryblokRichtext;
  objective_title_fr: StoryblokRichtext;
  objective_title_en: StoryblokRichtext;
  objective_text_fr: StoryblokRichtext;
  objective_text_en: StoryblokRichtext;
}

interface AboutSectionProps {
  blok: StoryblokAboutSectionData;
  lang: Language;
  isCompactMode: boolean;
}

export default function AboutSection({ blok, lang, isCompactMode }: AboutSectionProps) {
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

  // VERSION RICH TEXT ROBUSTE: Récupération des champs Rich Text avec rendu intelligent
  const titleDoc = blok[`title_${lang}` as keyof StoryblokAboutSectionData] as StoryblokRichtext;
  const introParagraphsDoc = blok[`intro_paragraphs_${lang}` as keyof StoryblokAboutSectionData] as StoryblokRichtext;
  const conclusionParagraphsDoc = blok[`conclusion_paragraphs_${lang}` as keyof StoryblokAboutSectionData] as StoryblokRichtext;
  const targetTitleDoc = blok[`target_title_${lang}` as keyof StoryblokAboutSectionData] as StoryblokRichtext;
  const targetTextDoc = blok[`target_text_${lang}` as keyof StoryblokAboutSectionData] as StoryblokRichtext;
  const objectiveTitleDoc = blok[`objective_title_${lang}` as keyof StoryblokAboutSectionData] as StoryblokRichtext;
  const objectiveTextDoc = blok[`objective_text_${lang}` as keyof StoryblokAboutSectionData] as StoryblokRichtext;
  
  // Extraction des titres pour la navigation
  const title = renderRichTextTitle(titleDoc) || 'About';
  const targetTitle = renderRichTextTitle(targetTitleDoc);
  const objectiveTitle = renderRichTextTitle(objectiveTitleDoc);

  return (
    <SectionGroup 
      {...storyblokEditable(blok)}
      id="about" 
      title={title} 
      isCompactMode={isCompactMode}
    >
      <motion.div
        {...getAnimationVariants(0.2)}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Premiers paragraphes d'introduction */}
        <div className="mb-3 xs:mb-4 sm:mb-4 lg:mb-4">
          {renderRichText(introParagraphsDoc)}
        </div>
        
        {/* Erté Angel Image - EXACTEMENT comme l'original */}
        <div className="flex justify-center mb-3 xs:mb-4 sm:mb-4 lg:mb-4">
          <OptimizedImage
            src="/images/ange_erte.jpg"
            alt="Ange d'Erté - Illustration Art Déco"
            width={450}
            height={570}
            className="w-full max-w-sm xs:max-w-md sm:max-w-lg lg:max-w-xl object-cover"
          />
        </div>
        
        {/* Paragraphes de conclusion */}
        <div>
          {renderRichText(conclusionParagraphsDoc)}
        </div>
        
        {/* Danseuse image et objectifs - Layout exact en 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 mt-4 xs:mt-5 sm:mt-6 lg:mt-8">
          {/* Colonne gauche - Image Danseuse */}
          <OptimizedImage
            src="/images/danseuse.png"
            alt="Danseuse Art Déco"
            width={320}
            height={410}
            className="w-full max-w-44 xs:max-w-48 sm:max-w-52 lg:max-w-56 object-cover mx-auto"
          />
          
          {/* Colonne droite - Objectifs avec bordures */}
          <div className="flex flex-col justify-center space-y-3 xs:space-y-4">
            {/* Public Cible */}
            {(targetTitle || targetTextDoc) && (
              <div className="p-3 xs:p-4 sm:p-4 border border-primary">
                {targetTitle && (
                  <h4 className="font-title text-lg sm:text-xl lg:text-2xl text-accent mb-2 xs:mb-3">
                    {targetTitle}
                  </h4>
                )}
                {renderRichText(targetTextDoc)}
              </div>
            )}
            
            {/* Notre Objectif */}
            {(objectiveTitle || objectiveTextDoc) && (
              <div className="p-3 xs:p-4 sm:p-4 border border-primary">
                {objectiveTitle && (
                  <h4 className="font-title text-lg sm:text-xl lg:text-2xl text-accent mb-2 xs:mb-3">
                    {objectiveTitle}
                  </h4>
                )}
                {renderRichText(objectiveTextDoc)}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </SectionGroup>
  );
}