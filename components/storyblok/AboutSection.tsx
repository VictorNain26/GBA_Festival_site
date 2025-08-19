/**
 * Composant Storyblok: Section À propos du festival
 * Reproduit EXACTEMENT le design original avec SectionGroup, toutes les images et layout exact
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { storyblokEditable } from '@storyblok/react';
import SectionGroup from '@/components/SectionGroup';
import OptimizedImage from '@/components/OptimizedImage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { Language } from '@/types';
import type { StoryblokBaseBlok } from '@/lib/storyblok';

export interface StoryblokAboutSectionData extends StoryblokBaseBlok {
  title_fr: string;
  title_en: string;
  intro_paragraphs_fr: string;
  intro_paragraphs_en: string;
  conclusion_paragraphs_fr: string;
  conclusion_paragraphs_en: string;
  target_title_fr: string;
  target_title_en: string;
  target_text_fr: string;
  target_text_en: string;
  objective_title_fr: string;
  objective_title_en: string;
  objective_text_fr: string;
  objective_text_en: string;
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

  // Helper pour rendre les paragraphes avec HTML
  const renderParagraphs = (paragraphs: string[]) => {
    if (!paragraphs || paragraphs.length === 0) {
      return null;
    }
    
    return paragraphs.map((p, idx) => (
      <p
        key={idx}
        className="mb-7 xs:mb-8 sm:mb-9 lg:mb-6 xl:mb-7 leading-relaxed text-base sm:text-lg lg:text-xl text-primary text-justify"
        dangerouslySetInnerHTML={{ __html: p }}
      />
    ));
  };

  // Titre sur deux lignes pour le cadre (mais menu reste en une ligne)
  const title = (
    <div className="text-center leading-tight">
      {lang === 'fr' ? (
        <>
          <div>ART DÉCO</div>
          <div>ET NEO ART DÉCO</div>
        </>
      ) : (
        <>
          <div>ART DECO</div>
          <div>AND NEO ART DECO</div>
        </>
      )}
    </div>
  );
  const introParagraphsRaw = blok[`intro_paragraphs_${lang}` as keyof StoryblokAboutSectionData] as string || '';
  const conclusionParagraphsRaw = blok[`conclusion_paragraphs_${lang}` as keyof StoryblokAboutSectionData] as string || '';
  const targetTitle = blok[`target_title_${lang}` as keyof StoryblokAboutSectionData] as string || '';
  const targetText = blok[`target_text_${lang}` as keyof StoryblokAboutSectionData] as string || '';
  const objectiveTitle = blok[`objective_title_${lang}` as keyof StoryblokAboutSectionData] as string || '';
  const objectiveText = blok[`objective_text_${lang}` as keyof StoryblokAboutSectionData] as string || '';

  // Conversion des strings en tableaux de paragraphes
  const introParagraphs = introParagraphsRaw ? introParagraphsRaw.split('\n\n').filter(p => p.trim()) : [];
  const conclusionParagraphs = conclusionParagraphsRaw ? conclusionParagraphsRaw.split('\n\n').filter(p => p.trim()) : [];

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
          {renderParagraphs(introParagraphs)}
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
          {renderParagraphs(conclusionParagraphs)}
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
            {(targetTitle || targetText) && (
              <div className="p-3 xs:p-4 sm:p-4 border border-primary">
                {targetTitle && (
                  <h4 className="font-title text-lg sm:text-xl lg:text-2xl text-accent mb-2 xs:mb-3">
                    {targetTitle}
                  </h4>
                )}
                {targetText && (
                  <p className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed">
                    {targetText}
                  </p>
                )}
              </div>
            )}
            
            {/* Notre Objectif */}
            {(objectiveTitle || objectiveText) && (
              <div className="p-3 xs:p-4 sm:p-4 border border-primary">
                {objectiveTitle && (
                  <h4 className="font-title text-lg sm:text-xl lg:text-2xl text-accent mb-2 xs:mb-3">
                    {objectiveTitle}
                  </h4>
                )}
                {objectiveText && (
                  <p className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed">
                    {objectiveText}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </SectionGroup>
  );
}