/**
 * Composant Storyblok: Section Contact
 * Gère les informations de contact avec animations
 */

import React from 'react';
import { motion } from 'framer-motion';
import { storyblokEditable } from '@storyblok/react';
import Frame from '@/components/Frame';
import TitleBlock from './TitleBlock';
import TextBlock from './TextBlock';
import type { Language } from '@/types';
import type { StoryblokBaseBlok, StoryblokTitleBlock, StoryblokTextBlock } from '@/lib/storyblok';

export interface StoryblokContactSectionData extends StoryblokBaseBlok {
  title: StoryblokTitleBlock;
  intro_blocks?: StoryblokTextBlock[];
  heading_fr: string;
  heading_en: string;
  phone: string;
  email: string;
  website: string;
  website_display?: string;
  whatsapp_text_fr?: string;
  whatsapp_text_en?: string;
  tickets_text_fr?: string;
  tickets_text_en?: string;
  back_to_top_text_fr?: string;
  back_to_top_text_en?: string;
}

interface ContactSectionProps {
  blok: StoryblokContactSectionData;
  lang: Language;
}

export default function ContactSection({ blok, lang }: ContactSectionProps) {
  const heading = blok[`heading_${lang}` as keyof StoryblokContactSectionData] as string || 'Contact';
  const whatsappText = blok[`whatsapp_text_${lang}` as keyof StoryblokContactSectionData] as string || (lang === 'fr' ? 'Envoyer un message' : 'Send a message');
  const ticketsText = blok[`tickets_text_${lang}` as keyof StoryblokContactSectionData] as string || (lang === 'fr' ? 'Billeterie' : 'Tickets');
  const backToTopText = blok[`back_to_top_text_${lang}` as keyof StoryblokContactSectionData] as string || (lang === 'fr' ? 'Retour en haut' : 'Back to top');

  const websiteDisplay = blok.website_display || blok.website?.replace(/^https?:\/\//, '') || 'Site Web';

  // WhatsApp URL formation
  const whatsappUrl = `https://wa.me/${blok.phone?.replace(/[^\d]/g, '')}`;

  return (
    <section
      {...storyblokEditable(blok)}
      id="contact"
      className="py-16 xs:py-20 sm:py-24 lg:py-32 px-4 xs:px-6 sm:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <Frame>
          <div className="py-8 xs:py-10 sm:py-12 lg:py-16 text-center">
            
            {/* Titre de la section */}
            <motion.div
              className="mb-8 xs:mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <TitleBlock blok={blok.title} lang={lang} />
            </motion.div>

            {/* Introduction (si présente) */}
            {blok.intro_blocks && blok.intro_blocks.length > 0 && (
              <div className="mb-10 xs:mb-12 sm:mb-16 space-y-4 xs:space-y-5 sm:space-y-6">
                {blok.intro_blocks.map((textBlok, index) => (
                  <motion.div
                    key={textBlok._uid}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <TextBlock 
                      blok={textBlok} 
                      lang={lang}
                      className="text-center leading-relaxed"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Nom de l'organisation */}
            <motion.h3
              className="font-title text-xl xs:text-2xl sm:text-3xl text-primary mb-8 xs:mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              {heading}
            </motion.h3>

            {/* Informations de contact */}
            <motion.div
              className="grid sm:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 mb-8 xs:mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              
              {/* Téléphone */}
              <motion.a
                href={`tel:${blok.phone}`}
                className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="font-title text-sm lg:text-base block mb-1">
                  {lang === 'fr' ? 'Téléphone' : 'Phone'}
                </span>
                <span className="font-body text-sm lg:text-base text-accent leading-tight">
                  {blok.phone}
                </span>
              </motion.a>
              
              {/* Email */}
              <motion.a
                href={`mailto:${blok.email}`}
                className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="font-title text-sm lg:text-base block mb-1">
                  Email
                </span>
                <span className="font-body text-sm lg:text-base break-all text-accent leading-tight">
                  {blok.email}
                </span>
              </motion.a>
              
              {/* Site Web */}
              <motion.a
                href={blok.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <span className="font-title text-sm lg:text-base block mb-1">
                  {lang === 'fr' ? 'Site Web' : 'Website'}
                </span>
                <span className="font-body text-sm lg:text-base text-accent">
                  {websiteDisplay}
                </span>
              </motion.a>
            </motion.div>

            {/* Boutons d'action */}
            <motion.div
              className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              
              {/* Bouton Billeterie */}
              <motion.a
                href="#hero"
                className="w-full xs:w-auto xs:min-w-[100px] sm:min-w-[110px] lg:min-w-[130px] inline-block px-2 xs:px-3 sm:px-3 py-3 xs:py-3 sm:py-4 font-title text-sm lg:text-base uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {ticketsText}
              </motion.a>

              {/* Bouton WhatsApp */}
              {blok.phone && (
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full xs:w-auto xs:min-w-[100px] sm:min-w-[110px] lg:min-w-[130px] inline-block px-2 xs:px-3 sm:px-3 py-3 xs:py-3 sm:py-4 font-title text-sm lg:text-base uppercase tracking-wider transition-all duration-300 border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-background text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {whatsappText}
                </motion.a>
              )}

              {/* Bouton Retour en haut */}
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full xs:w-auto xs:min-w-[100px] sm:min-w-[110px] lg:min-w-[130px] inline-block px-2 xs:px-3 sm:px-3 py-3 xs:py-3 sm:py-4 font-title text-sm lg:text-base uppercase tracking-wider transition-all duration-300 border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-background text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {backToTopText}
              </motion.button>
            </motion.div>

          </div>
        </Frame>
      </div>
    </section>
  );
}