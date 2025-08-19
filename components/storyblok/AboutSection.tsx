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
import { renderStoryblokRichText, extractPlainText } from '@/lib/richTextHelper';
import type { Language } from '@/types';
import type { StoryblokBaseBlok } from '@/lib/storyblok';

export interface StoryblokAboutSectionData extends StoryblokBaseBlok {
  title_fr: any; // Rich Text
  title_en: any; // Rich Text
  intro_paragraphs_fr: any; // Rich Text
  intro_paragraphs_en: any; // Rich Text
  conclusion_paragraphs_fr: any; // Rich Text
  conclusion_paragraphs_en: any; // Rich Text
  target_title_fr: any; // Rich Text
  target_title_en: any; // Rich Text
  target_text_fr: any; // Rich Text
  target_text_en: any; // Rich Text
  objective_title_fr: any; // Rich Text
  objective_title_en: any; // Rich Text
  objective_text_fr: any; // Rich Text
  objective_text_en: any; // Rich Text
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

  // Helper pour rendre le contenu Rich Text
  const renderRichTextContent = (htmlContent: string) => {
    if (!htmlContent) {
      return null;
    }
    
    return (
      <div 
        className="rich-text-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };

  // Récupération des contenus Rich Text depuis Storyblok
  const titleDoc = blok[`title_${lang}` as keyof StoryblokAboutSectionData];
  const introParagraphsDoc = blok[`intro_paragraphs_${lang}` as keyof StoryblokAboutSectionData];
  const conclusionParagraphsDoc = blok[`conclusion_paragraphs_${lang}` as keyof StoryblokAboutSectionData];
  const targetTitleDoc = blok[`target_title_${lang}` as keyof StoryblokAboutSectionData];
  const targetTextDoc = blok[`target_text_${lang}` as keyof StoryblokAboutSectionData];
  const objectiveTitleDoc = blok[`objective_title_${lang}` as keyof StoryblokAboutSectionData];
  const objectiveTextDoc = blok[`objective_text_${lang}` as keyof StoryblokAboutSectionData];
  
  // Extraction du titre en texte brut pour le menu
  const title = extractPlainText(titleDoc) || '';
  
  // Rendu des contenus Rich Text avec formatage
  const introParagraphsHtml = renderStoryblokRichText(introParagraphsDoc);
  const conclusionParagraphsHtml = renderStoryblokRichText(conclusionParagraphsDoc);
  const targetTitle = extractPlainText(targetTitleDoc) || '';
  const targetTextHtml = renderStoryblokRichText(targetTextDoc);
  const objectiveTitle = extractPlainText(objectiveTitleDoc) || '';
  const objectiveTextHtml = renderStoryblokRichText(objectiveTextDoc);

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
          {renderRichTextContent(introParagraphsHtml)}
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
          {renderRichTextContent(conclusionParagraphsHtml)}
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
            {(targetTitle || targetTextHtml) && (
              <div className="p-3 xs:p-4 sm:p-4 border border-primary">
                {targetTitle && (
                  <h4 className="font-title text-lg sm:text-xl lg:text-2xl text-accent mb-2 xs:mb-3">
                    {targetTitle}
                  </h4>
                )}
                {targetTextHtml && (
                  <div className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: targetTextHtml }}
                  />
                )}
              </div>
            )}
            
            {/* Notre Objectif */}
            {(objectiveTitle || objectiveTextHtml) && (
              <div className="p-3 xs:p-4 sm:p-4 border border-primary">
                {objectiveTitle && (
                  <h4 className="font-title text-lg sm:text-xl lg:text-2xl text-accent mb-2 xs:mb-3">
                    {objectiveTitle}
                  </h4>
                )}
                {objectiveTextHtml && (
                  <div className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: objectiveTextHtml }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </SectionGroup>
  );
}