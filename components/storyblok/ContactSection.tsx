/**
 * Composant Storyblok: Section Contact
 * Reproduit EXACTEMENT le design original avec SectionGroup et Frame
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { storyblokEditable } from '@storyblok/react';
import SectionGroup from '@/components/SectionGroup';
import Frame from '@/components/Frame';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { Language } from '@/types';
import type { StoryblokBaseBlok } from '@/lib/storyblok';

export interface StoryblokContactSectionData extends StoryblokBaseBlok {
  title_fr: string;
  title_en: string;
  address_title_fr: string;
  address_title_en: string;
  address_lines: string[];
  contact_title_fr: string;
  contact_title_en: string;
  phone: string;
  email: string;
  website: string;
}

interface ContactSectionProps {
  blok: StoryblokContactSectionData;
  lang: Language;
  isCompactMode: boolean;
}

export default function ContactSection({ blok, lang, isCompactMode }: ContactSectionProps) {
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

  // Récupération des données
  const title = blok[`title_${lang}` as keyof StoryblokContactSectionData] as string || '';
  const addressTitle = blok[`address_title_${lang}` as keyof StoryblokContactSectionData] as string || '';
  const contactTitle = blok[`contact_title_${lang}` as keyof StoryblokContactSectionData] as string || '';
  const addressLines = blok.address_lines || [];

  return (
    <SectionGroup 
      {...storyblokEditable(blok)}
      id="contact" 
      title={title} 
      isCompactMode={isCompactMode}
    >
      {/* Contenu dans un Frame - EXACTEMENT comme l'original */}
      <Frame>
        <div className="py-6 xs:py-7 sm:py-8 lg:py-10 px-4 xs:px-5 sm:px-6 lg:px-8">
          
          {/* Deux colonnes: adresse et contact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
            
            {/* Colonne gauche - Adresse */}
            <motion.div {...getAnimationVariants(0.2)} viewport={{ once: true, margin: "-100px" }}>
              <div className="text-center lg:text-left">
                {addressTitle && (
                  <h3 className="font-title text-lg xs:text-xl sm:text-2xl lg:text-3xl text-primary mb-4 xs:mb-5 sm:mb-6">
                    {addressTitle}
                  </h3>
                )}
                
                {/* Lignes d'adresse */}
                <div className="space-y-2 xs:space-y-3">
                  {addressLines.map((line, index) => (
                    <p 
                      key={index}
                      className="text-sm xs:text-base sm:text-lg text-primary leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Colonne droite - Contact */}
            <motion.div {...getAnimationVariants(0.4)} viewport={{ once: true, margin: "-100px" }}>
              <div className="text-center lg:text-left">
                {contactTitle && (
                  <h3 className="font-title text-lg xs:text-xl sm:text-2xl lg:text-3xl text-primary mb-4 xs:mb-5 sm:mb-6">
                    {contactTitle}
                  </h3>
                )}
                
                {/* Informations de contact */}
                <div className="space-y-2 xs:space-y-3">
                  {blok.phone && (
                    <p className="text-sm xs:text-base sm:text-lg text-primary leading-relaxed">
                      <span className="text-accent">Tel:</span> {blok.phone}
                    </p>
                  )}
                  
                  {blok.email && (
                    <p className="text-sm xs:text-base sm:text-lg text-primary leading-relaxed">
                      <span className="text-accent">Email:</span> {blok.email}
                    </p>
                  )}
                  
                  {blok.website && (
                    <p className="text-sm xs:text-base sm:text-lg text-primary leading-relaxed">
                      <span className="text-accent">Web:</span>{' '}
                      <a 
                        href={blok.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-accent hover:text-primary transition-colors duration-300"
                      >
                        {blok.website.replace(/^https?:\/\//, '')}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Frame>
    </SectionGroup>
  );
}