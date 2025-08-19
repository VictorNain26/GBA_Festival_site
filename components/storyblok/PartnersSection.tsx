/**
 * Composant Storyblok: Section Partenaires
 * Reproduit EXACTEMENT le design original avec SectionGroup et l'image danseuse2
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { storyblokEditable } from '@storyblok/react';
import SectionGroup from '@/components/SectionGroup';
import OptimizedImage from '@/components/OptimizedImage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { Language } from '@/types';
import type { StoryblokBaseBlok } from '@/lib/storyblok';

export interface StoryblokPartnersSectionData extends StoryblokBaseBlok {
  title_fr: string;
  title_en: string;
  intro_paragraphs_fr: string[];
  intro_paragraphs_en: string[];
  collaboration_text_fr: string;
  collaboration_text_en: string;
}

interface PartnersSectionProps {
  blok: StoryblokPartnersSectionData;
  lang: Language;
  isCompactMode: boolean;
}

export default function PartnersSection({ blok, lang, isCompactMode }: PartnersSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Memoize animation variants
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

  // Helper pour rendre les paragraphes
  const renderParagraphs = (paragraphs: string[]) => {
    if (!paragraphs || paragraphs.length === 0) return null;
    
    return paragraphs.map((p, idx) => (
      <p
        key={idx}
        className="mb-7 xs:mb-8 sm:mb-9 lg:mb-6 xl:mb-7 leading-relaxed text-base sm:text-lg lg:text-xl text-primary text-justify"
        dangerouslySetInnerHTML={{ __html: p }}
      />
    ));
  };

  // Récupération des données
  const title = blok[`title_${lang}` as keyof StoryblokPartnersSectionData] as string || '';
  const introParagraphs = blok[`intro_paragraphs_${lang}` as keyof StoryblokPartnersSectionData] as string[] || [];
  const collaborationText = blok[`collaboration_text_${lang}` as keyof StoryblokPartnersSectionData] as string || '';

  return (
    <SectionGroup 
      {...storyblokEditable(blok)}
      id="partners" 
      title={title} 
      isCompactMode={isCompactMode}
    >
      {/* Paragraphe d'introduction */}
      <div className="mb-6 xs:mb-7 sm:mb-8 lg:mb-10">
        {renderParagraphs(introParagraphs)}
      </div>
      
      {/* Deux colonnes: texte collaboration et image danseuse2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
        {/* Colonne gauche - Texte Collaboration */}
        {collaborationText && (
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <p 
              className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: collaborationText }}
            />
          </motion.div>
        )}
        
        {/* Colonne droite - Image Danseuse2 */}
        <OptimizedImage
          src="/images/danseuse2.jpg"
          alt="Danseuse Art Déco - Partenaires"
          width={320}
          height={410}
          className="w-full max-w-44 xs:max-w-48 sm:max-w-52 lg:max-w-56 object-cover mx-auto"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
        />
      </div>
    </SectionGroup>
  );
}