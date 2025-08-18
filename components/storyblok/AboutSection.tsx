/**
 * Composant Storyblok: Section À propos du festival
 * Gère les paragraphes multiples avec mise en valeur automatique
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

export interface StoryblokAboutSectionData extends StoryblokBaseBlok {
  title: StoryblokTitleBlock;
  content_blocks: StoryblokTextBlock[];
  image?: string;
  image_alt_fr?: string;
  image_alt_en?: string;
  image_position?: 'left' | 'right' | 'none';
}

interface AboutSectionProps {
  blok: StoryblokAboutSectionData;
  lang: Language;
}

export default function AboutSection({ blok, lang }: AboutSectionProps) {
  const imageAlt = blok[`image_alt_${lang}` as keyof StoryblokAboutSectionData] as string || 'Art Déco';
  const hasImage = blok.image && blok.image_position !== 'none';
  const imagePosition = blok.image_position || 'none';

  return (
    <section
      {...storyblokEditable(blok)}
      id="about"
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

            {/* Contenu principal */}
            <div className={`${
              hasImage 
                ? 'grid lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 lg:gap-16 items-center' 
                : 'max-w-4xl mx-auto'
            }`}>
              
              {/* Image (si présente et position gauche) */}
              {hasImage && imagePosition === 'left' && (
                <motion.div
                  className="order-1 lg:order-none"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <OptimizedImage
                    src={blok.image!}
                    alt={imageAlt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              )}

              {/* Blocs de contenu */}
              <div className={`space-y-6 xs:space-y-8 sm:space-y-10 ${
                hasImage ? 'order-2' : ''
              }`}>
                {blok.content_blocks?.map((textBlok, index) => (
                  <motion.div
                    key={textBlok._uid}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: hasImage ? 0.4 + (index * 0.1) : index * 0.1 
                    }}
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <TextBlock 
                      blok={textBlok} 
                      lang={lang}
                      className="text-justify leading-relaxed"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Image (si présente et position droite) */}
              {hasImage && imagePosition === 'right' && (
                <motion.div
                  className="order-1 lg:order-2"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <OptimizedImage
                    src={blok.image!}
                    alt={imageAlt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              )}

            </div>

            {/* Image centrée (si position none mais image présente) */}
            {blok.image && blok.image_position === 'none' && (
              <motion.div
                className="mt-12 xs:mt-16 sm:mt-20 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <OptimizedImage
                  src={blok.image!}
                  alt={imageAlt}
                  width={800}
                  height={400}
                  className="max-w-3xl mx-auto w-full h-auto object-cover"
                />
              </motion.div>
            )}

          </div>
        </Frame>
      </div>
    </section>
  );
}