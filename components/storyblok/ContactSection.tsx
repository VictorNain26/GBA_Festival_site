/**
 * Composant Storyblok: Section Contact
 * Reproduit EXACTEMENT le design original centré (SANS SectionGroup ni Frame)
 * VERSION RICH TEXT ROBUSTE: Interface intuitive avec fallback intelligent
 */

import React from 'react';
import { motion } from 'framer-motion';
import { storyblokEditable } from '@storyblok/react';
import { renderRichText, renderRichTextTitle } from '@/lib/richTextRenderer';
import type { Language } from '@/types';
import type { StoryblokBaseBlok } from '@/lib/storyblok';
import type { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';

export interface StoryblokContactSectionData extends StoryblokBaseBlok {
  title_fr: StoryblokRichtext;
  title_en: StoryblokRichtext;
  heading_fr: StoryblokRichtext;
  heading_en: StoryblokRichtext;
  intro_fr: StoryblokRichtext;
  intro_en: StoryblokRichtext;
  phone: string;
  email: string;
  website: string;
  cta_text_fr: StoryblokRichtext;
  cta_text_en: StoryblokRichtext;
  back_to_top_fr: StoryblokRichtext;
  back_to_top_en: StoryblokRichtext;
}

interface ContactSectionProps {
  blok: StoryblokContactSectionData;
  lang: Language;
  isCompactMode: boolean;
}

export default function ContactSection({ blok, lang }: ContactSectionProps) {
  // const prefersReducedMotion = useReducedMotion(); // Unused in this simplified version

  // Animations simplifiées pour ce composant centré

  // VERSION RICH TEXT ROBUSTE: Récupération des champs Rich Text avec rendu intelligent
  const titleDoc = blok[`title_${lang}` as keyof StoryblokContactSectionData] as StoryblokRichtext;
  const headingDoc = blok[`heading_${lang}` as keyof StoryblokContactSectionData] as StoryblokRichtext;
  const introDoc = blok[`intro_${lang}` as keyof StoryblokContactSectionData] as StoryblokRichtext;
  const ctaTextDoc = blok[`cta_text_${lang}` as keyof StoryblokContactSectionData] as StoryblokRichtext;
  const backToTopTextDoc = blok[`back_to_top_${lang}` as keyof StoryblokContactSectionData] as StoryblokRichtext;
  
  // Extraction des textes pour l'affichage
  const title = renderRichTextTitle(titleDoc) || 'Contact';
  const heading = renderRichTextTitle(headingDoc) || '';
  const ctaText = renderRichTextTitle(ctaTextDoc) || (lang === 'fr' ? 'Contact' : 'Contact');
  const backToTopText = renderRichTextTitle(backToTopTextDoc) || (lang === 'fr' ? 'Retour en haut' : 'Back to top');

  return (
    // EXACTEMENT comme l'original: section centrée sans SectionGroup
    <section 
      {...storyblokEditable(blok)}
      id="contact" 
      className="relative min-h-screen flex flex-col justify-center px-8 xs:px-12 sm:px-16 lg:px-20 xl:px-24 2xl:px-32 py-12 xs:py-14 sm:py-16 lg:py-20 xl:py-24"
    >
      {/* Section Title - Centered (no menu in this section) */}
      <motion.h2
        className="font-title text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-accent mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      
      {/* Contact Content - Centered design (no menu in this section) */}
      <div className="max-w-3xl mx-auto">
        {heading && (
          <motion.h3
            className="font-title text-xl sm:text-2xl lg:text-3xl text-primary mb-1 xs:mb-2 sm:mb-2 lg:mb-3 xl:mb-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {heading}
          </motion.h3>
        )}
        
        {introDoc && (
          <motion.p
            className="font-body text-base sm:text-lg lg:text-xl text-accent mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {renderRichText(introDoc)}
          </motion.p>
        )}
        
        {/* Layout responsive pour les contacts - Style Art Déco unifié */}
        <motion.div
          className="flex flex-col lg:grid lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 lg:gap-4 xl:gap-5 mb-4 xs:mb-5 sm:mb-6 lg:mb-6 xl:mb-7"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Téléphone/WhatsApp */}
          {blok.phone && (
            <motion.a
              href={`https://wa.me/${blok.phone.replace(/\s+/g, '')}`}
              className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="font-title text-sm lg:text-base block mb-1">
                {lang === 'fr' ? 'Envoyer un message' : 'Send a message'}
              </span>
              <span className="font-body text-sm lg:text-base text-accent">
                {blok.phone}
              </span>
            </motion.a>
          )}
          
          {/* Email */}
          {blok.email && (
            <motion.a
              href={`mailto:${blok.email}`}
              className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="font-title text-sm lg:text-base block mb-1">
                Email
              </span>
              <span className="font-body text-sm lg:text-base break-all text-accent leading-tight">
                {blok.email}
              </span>
            </motion.a>
          )}
          
          {/* Site Web */}
          {blok.website && (
            <motion.a
              href={blok.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="font-title text-sm lg:text-base block mb-1">
                Site Web
              </span>
              <span className="font-body text-sm lg:text-base text-accent">
                {blok.website.replace(/^https?:\/\//, '')}
              </span>
            </motion.a>
          )}
        </motion.div>

        {/* Boutons d'action - EXACTEMENT comme l'original */}
        <motion.div
          className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Bouton Billeterie - Style unifié */}
          {ctaText && (
            <motion.a
              href="#hero"
              className="w-full xs:w-auto xs:min-w-[100px] sm:min-w-[110px] lg:min-w-[130px] inline-block px-2 xs:px-3 sm:px-3 py-3 xs:py-3 sm:py-4 font-title text-sm lg:text-base uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {ctaText}
            </motion.a>
          )}

          {/* Bouton Retour en haut - Version rouge */}
          {backToTopText && (
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full xs:w-auto xs:min-w-[100px] sm:min-w-[110px] lg:min-w-[130px] inline-block px-2 xs:px-3 sm:px-3 py-3 xs:py-3 sm:py-4 font-title text-sm lg:text-base uppercase tracking-wider transition-all duration-300 border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-background text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {backToTopText}
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
}