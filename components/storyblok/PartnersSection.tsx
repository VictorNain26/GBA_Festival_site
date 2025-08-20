/**
 * Composant Storyblok: Section Partenaires
 * Reproduit EXACTEMENT le design original avec SectionGroup et l'image danseuse2
 * VERSION RICH TEXT ROBUSTE: Interface intuitive avec fallback intelligent
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

export interface StoryblokPartnersSectionData extends StoryblokBaseBlok {
  title_fr: StoryblokRichtext;
  title_en: StoryblokRichtext;
  intro_paragraphs_fr: StoryblokRichtext;
  intro_paragraphs_en: StoryblokRichtext;
  collaboration_text_fr: StoryblokRichtext;
  collaboration_text_en: StoryblokRichtext;
}

interface PartnersSectionProps {
  blok: StoryblokPartnersSectionData;
  lang: Language;
  isCompactMode: boolean;
}

export default function PartnersSection({ blok, lang, isCompactMode }: PartnersSectionProps) {

  // VERSION RICH TEXT ROBUSTE: Récupération des champs Rich Text avec rendu intelligent
  const titleDoc = blok[`title_${lang}` as keyof StoryblokPartnersSectionData] as StoryblokRichtext;
  const introParagraphsDoc = blok[`intro_paragraphs_${lang}` as keyof StoryblokPartnersSectionData] as StoryblokRichtext;
  const collaborationTextDoc = blok[`collaboration_text_${lang}` as keyof StoryblokPartnersSectionData] as StoryblokRichtext;
  
  // Extraction du titre pour la navigation
  const title = renderRichTextTitle(titleDoc) || 'Partners';

  return (
    <SectionGroup 
      {...storyblokEditable(blok)}
      id="partners" 
      title={title} 
      isCompactMode={isCompactMode}
    >
      {/* Paragraphe d'introduction */}
      <div className="mb-6 xs:mb-7 sm:mb-8 lg:mb-10">
        {renderRichText(introParagraphsDoc)}
      </div>
      
      {/* Deux colonnes: texte collaboration et image danseuse2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
        {/* Colonne gauche - Texte Collaboration */}
        {collaborationTextDoc && (
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            {renderRichText(collaborationTextDoc)}
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