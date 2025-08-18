/**
 * Composant Storyblok: Section On the Way
 * Gère les 5 sections narratives en colonnes avec images
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

export interface StoryblokOnTheWayStoryData extends StoryblokBaseBlok {
  text_blocks: StoryblokTextBlock[];
  image?: string;
  image_alt_fr?: string;
  image_alt_en?: string;
  image_position: 'left' | 'right';
}

export interface StoryblokOnTheWaySectionData extends StoryblokBaseBlok {
  title: StoryblokTitleBlock;
  stories: StoryblokOnTheWayStoryData[];
}

interface OnTheWaySectionProps {
  blok: StoryblokOnTheWaySectionData;
  lang: Language;
}

export default function OnTheWaySection({ blok, lang }: OnTheWaySectionProps) {
  return (
    <section
      {...storyblokEditable(blok)}
      id="ontheway"
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

            {/* Histoires narratives */}
            <div className="space-y-16 xs:space-y-20 sm:space-y-24 lg:space-y-32">
              {blok.stories?.map((storyBlok, storyIndex) => {
                const imageAlt = storyBlok[`image_alt_${lang}` as keyof StoryblokOnTheWayStoryData] as string || `On the Way ${storyIndex + 1}`;
                const isImageLeft = storyBlok.image_position === 'left';

                return (
                  <motion.div
                    key={storyBlok._uid}
                    className="grid lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 lg:gap-16 items-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: storyIndex * 0.2 }}
                    viewport={{ once: true, margin: '-100px' }}
                  >
                    
                    {/* Image (position gauche) */}
                    {storyBlok.image && isImageLeft && (
                      <motion.div
                        className="order-2 lg:order-1"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: storyIndex * 0.2 + 0.3 }}
                        viewport={{ once: true, margin: '-50px' }}
                      >
                        <OptimizedImage
                          src={storyBlok.image!}
                          alt={imageAlt}
                          width={600}
                          height={400}
                          className="w-full max-w-sm xs:max-w-md sm:max-w-lg lg:max-w-none h-auto object-cover mx-auto"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.4 }}
                        />
                      </motion.div>
                    )}

                    {/* Contenu textuel */}
                    <div className={`space-y-4 xs:space-y-5 sm:space-y-6 ${
                      isImageLeft ? 'order-1 lg:order-2' : 'order-1'
                    }`}>
                      {storyBlok.text_blocks?.map((textBlok, textIndex) => (
                        <motion.div
                          key={textBlok._uid}
                          initial={{ opacity: 0, x: isImageLeft ? 40 : -40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.8, 
                            delay: storyIndex * 0.2 + 0.4 + (textIndex * 0.1) 
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

                    {/* Image (position droite) */}
                    {storyBlok.image && !isImageLeft && (
                      <motion.div
                        className="order-2"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: storyIndex * 0.2 + 0.3 }}
                        viewport={{ once: true, margin: '-50px' }}
                      >
                        <OptimizedImage
                          src={storyBlok.image!}
                          alt={imageAlt}
                          width={600}
                          height={400}
                          className="w-full max-w-sm xs:max-w-md sm:max-w-lg lg:max-w-none h-auto object-cover mx-auto"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.4 }}
                        />
                      </motion.div>
                    )}

                  </motion.div>
                );
              })}
            </div>

          </div>
        </Frame>
      </div>
    </section>
  );
}