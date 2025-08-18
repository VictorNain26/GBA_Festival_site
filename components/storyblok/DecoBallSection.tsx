/**
 * Composant Storyblok: Section Bal Art Déco
 * Gère le contenu du bal avec images superposées
 */

import React from 'react';
import { motion } from 'framer-motion';
import { storyblokEditable } from '@storyblok/react';
import Frame from '@/components/Frame';
import TitleBlock from './TitleBlock';
import TextBlock from './TextBlock';
import OptimizedImage from '@/components/OptimizedImage';
import type { Language } from '@/types';
import type { StoryblokBaseBlok, StoryblokTitleBlock, StoryblokTextBlock } from '@/lib/storyblok';

export interface StoryblokDecoBallSectionData extends StoryblokBaseBlok {
  title: StoryblokTitleBlock;
  content_blocks: StoryblokTextBlock[];
  dance_image_main?: string;
  dance_image_overlay?: string;
  dance_image_alt_fr?: string;
  dance_image_alt_en?: string;
}

interface DecoBallSectionProps {
  blok: StoryblokDecoBallSectionData;
  lang: Language;
}

export default function DecoBallSection({ blok, lang }: DecoBallSectionProps) {
  const danceImageAlt = blok[`dance_image_alt_${lang}` as keyof StoryblokDecoBallSectionData] as string || 'Danse Art Déco';
  const hasImages = blok.dance_image_main || blok.dance_image_overlay;

  return (
    <section
      {...storyblokEditable(blok)}
      id="decoball"
      className="py-16 xs:py-20 sm:py-24 lg:py-32 px-4 xs:px-6 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <Frame>
          <div className="py-8 xs:py-10 sm:py-12 lg:py-16">
            
            {/* Titre de la section */}
            <motion.div
              className="mb-12 xs:mb-16 sm:mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <TitleBlock blok={blok.title} lang={lang} />
            </motion.div>

            {/* Contenu principal en colonnes */}
            <div className={`${
              hasImages 
                ? 'grid lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 lg:gap-16 items-center' 
                : 'max-w-4xl mx-auto'
            }`}>
              
              {/* Blocs de contenu */}
              <div className="space-y-6 xs:space-y-8 sm:space-y-10">
                {blok.content_blocks?.map((textBlok, index) => (
                  <motion.div
                    key={textBlok._uid}
                    initial={{ opacity: 0, x: hasImages ? -30 : 0, y: hasImages ? 0 : 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <TextBlock 
                      blok={textBlok} 
                      lang={lang}
                      className={`leading-relaxed ${hasImages ? 'text-justify' : 'text-center'}`}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Images superposées (si présentes) */}
              {hasImages && (
                <motion.div
                  className="relative flex justify-center items-center min-h-96"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true, margin: '-50px' }}
                >
                  
                  {/* Image principale (arrière-plan) */}
                  {blok.dance_image_main && (
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                    >
                      <OptimizedImage
                        src={blok.dance_image_main!}
                        alt={`${danceImageAlt} - Principal`}
                        width={400}
                        height={500}
                        className="w-full max-w-80 xs:max-w-96 sm:max-w-112 lg:max-w-96 xl:max-w-112 h-auto object-cover"
                      />
                    </motion.div>
                  )}

                  {/* Image superposée (premier plan) */}
                  {blok.dance_image_overlay && (
                    <motion.div
                      className="absolute -bottom-6 -left-6 xs:-bottom-8 xs:-left-8 sm:-bottom-10 sm:-left-10"
                      initial={{ opacity: 0, x: -20, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.05,
                        x: -5,
                        y: 5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <OptimizedImage
                        src={blok.dance_image_overlay!}
                        alt={`${danceImageAlt} - Superposé`}
                        width={320}
                        height={400}
                        className="w-full max-w-64 xs:max-w-72 sm:max-w-80 lg:max-w-72 xl:max-w-80 h-auto object-cover shadow-lg"
                      />
                    </motion.div>
                  )}
                  
                </motion.div>
              )}

            </div>

          </div>
        </Frame>
      </div>
    </section>
  );
}