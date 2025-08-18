/**
 * Composant Storyblok: Section Partenaires
 * Gère l'introduction et la collaboration avec les partenaires
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

export interface StoryblokPartnersSectionData extends StoryblokBaseBlok {
  title: StoryblokTitleBlock;
  intro_blocks: StoryblokTextBlock[];
  collaboration_blocks: StoryblokTextBlock[];
  collaboration_image?: string;
  collaboration_image_alt_fr?: string;
  collaboration_image_alt_en?: string;
  objectives?: StoryblokTextBlock[];
}

interface PartnersSectionProps {
  blok: StoryblokPartnersSectionData;
  lang: Language;
}

export default function PartnersSection({ blok, lang }: PartnersSectionProps) {
  const collaborationImageAlt = blok[`collaboration_image_alt_${lang}` as keyof StoryblokPartnersSectionData] as string || 'Partenaires';

  return (
    <section
      {...storyblokEditable(blok)}
      id="partners"
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

            {/* Introduction des partenaires */}
            {blok.intro_blocks && blok.intro_blocks.length > 0 && (
              <div className="mb-12 xs:mb-16 sm:mb-20 max-w-4xl mx-auto space-y-6 xs:space-y-8">
                {blok.intro_blocks.map((textBlok, index) => (
                  <motion.div
                    key={textBlok._uid}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
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

            {/* Section Collaboration avec image */}
            {blok.collaboration_blocks && blok.collaboration_blocks.length > 0 && (
              <div className="grid lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 lg:gap-16 items-center mb-12 xs:mb-16 sm:mb-20">
                
                {/* Contenu collaboration */}
                <div className="space-y-6 xs:space-y-8">
                  {blok.collaboration_blocks.map((textBlok, index) => (
                    <motion.div
                      key={textBlok._uid}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
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

                {/* Image collaboration */}
                {blok.collaboration_image && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <OptimizedImage
                      src={blok.collaboration_image!}
                      alt={collaborationImageAlt}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                )}

              </div>
            )}

            {/* Objectifs du festival (si présents) */}
            {blok.objectives && blok.objectives.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 lg:gap-12">
                {blok.objectives.map((objectiveBlok, index) => (
                  <motion.div
                    key={objectiveBlok._uid}
                    className="p-6 xs:p-8 sm:p-10 border border-primary/30 bg-primary/5 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
                    viewport={{ once: true, margin: '-50px' }}
                    whileHover={{ 
                      borderColor: 'rgba(211, 170, 65, 0.6)',
                      backgroundColor: 'rgba(211, 170, 65, 0.1)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <TextBlock 
                      blok={objectiveBlok} 
                      lang={lang}
                      className="text-center leading-relaxed"
                    />
                  </motion.div>
                ))}
              </div>
            )}

          </div>
        </Frame>
      </div>
    </section>
  );
}