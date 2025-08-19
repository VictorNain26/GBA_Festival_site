/**
 * Composant Storyblok: Section "Le Bal Art Déco"
 * Reproduit EXACTEMENT le design original avec images danse superposées + galerie
 */

import React from 'react';
import { motion } from 'framer-motion';
import { storyblokEditable } from '@storyblok/react';
import SectionGroup from '@/components/SectionGroup';
import OptimizedImage from '@/components/OptimizedImage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { Language } from '@/types';
import type { StoryblokBaseBlok } from '@/lib/storyblok';

export interface StoryblokDecoBallSectionData extends StoryblokBaseBlok {
  title_fr: string;
  title_en: string;
  intro_text_fr: string;
  intro_text_en: string;
}

interface DecoBallSectionProps {
  blok: StoryblokDecoBallSectionData;
  lang: Language;
  isCompactMode: boolean;
}

export default function DecoBallSection({ blok, lang, isCompactMode }: DecoBallSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const getAnimationVariants = React.useMemo(() => {
    return (delay: number = 0) => {
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
  const title = blok[`title_${lang}` as keyof StoryblokDecoBallSectionData] as string || '';
  const introText = blok[`intro_text_${lang}` as keyof StoryblokDecoBallSectionData] as string || '';

  // Galerie d'images hardcodée - EXACTEMENT comme l'original (9 images .jpg)
  const galleryImages = [
    { src: '/images/gallery_1.jpg', alt: 'Art Déco Gallery 1', rotate: -12 },
    { src: '/images/gallery_2.jpg', alt: 'Art Déco Gallery 2', rotate: 6 },
    { src: '/images/gallery_3.jpg', alt: 'Art Déco Gallery 3', rotate: -8 },
    { src: '/images/gallery_4.jpg', alt: 'Art Déco Gallery 4', rotate: 10 },
    { src: '/images/gallery_5.jpg', alt: 'Art Déco Gallery 5', rotate: -15 },
    { src: '/images/gallery_6.jpg', alt: 'Art Déco Gallery 6', rotate: 8 },
    { src: '/images/gallery_7.jpg', alt: 'Art Déco Gallery 7', rotate: -12 },
    { src: '/images/gallery_8.jpg', alt: 'Art Déco Gallery 8', rotate: 14 },
    { src: '/images/gallery_9.jpg', alt: 'Art Déco Gallery 9', rotate: -6 },
  ];

  return (
    <SectionGroup 
      {...storyblokEditable(blok)}
      id="decoball" 
      title={title} 
      isCompactMode={isCompactMode}
    >
      {/* Two columns: content text and stacked dance images - EXACTEMENT comme l'original */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
        {/* Left column - Content text */}
        {introText && (
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p 
              className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: introText }}
            />
          </motion.div>
        )}
        
        {/* Right column - Stacked dance images with offset - EXACTEMENT comme l'original */}
        <div className="relative w-full flex justify-center">
          <div className="relative">
            {/* Image de fond - danse2 - TRÈS GRANDE SANS LIMITATION */}
            <div className="relative z-10">
              <OptimizedImage
                src="/images/danse2.jpg"
                alt="Danse Art Déco - Bal des Années Folles"
                width={900}
                height={1080}
                className="w-full max-w-[320px] xs:max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] object-cover"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              />
            </div>
            
            {/* Image superposée - danse1 - BAS GAUCHE avec danse2 qui dépasse un peu */}
            <div className="absolute z-20 bottom-8 -left-6 xs:bottom-10 xs:-left-8 sm:bottom-12 sm:-left-10 lg:bottom-14 lg:-left-12 xl:bottom-16 xl:-left-16 transform translate-y-2 xs:translate-y-3 sm:translate-y-4 lg:translate-y-5 xl:translate-y-6">
              <OptimizedImage
                src="/images/danse1.jpg"
                alt="Élégance Art Déco - Soirée Dansante"
                width={240}
                height={300}
                className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Florilège gallery - Images artistiquement disposées EXACTEMENT comme l'original */}
      <div className="mt-12 xs:mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
        {/* Première ligne - 5 images décalées */}
        <div className="relative flex flex-wrap justify-center items-center gap-4 xs:gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-8 xs:mb-10 sm:mb-12 lg:mb-16 xl:mb-20">
          {galleryImages.slice(0, 5).map((image, index) => (
            <OptimizedImage
              key={index}
              src={image.src}
              alt={image.alt}
              width={160}
              height={200}
              className={`w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer will-change-transform ${
                index === 1 ? '-mt-2' : index === 2 ? 'mt-1' : index === 3 ? '-mt-3' : index === 4 ? 'mt-2' : ''
              }`}
              initial={{ opacity: 0, rotate: image.rotate, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: image.rotate, scale: 1 }}
              whileHover={{ rotate: image.rotate / 2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
        
        {/* Deuxième ligne - 4 images décalées */}
        <div className="relative flex flex-wrap justify-center items-center gap-6 xs:gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          {galleryImages.slice(5).map((image, index) => (
            <OptimizedImage
              key={index + 5}
              src={image.src}
              alt={image.alt}
              width={160}
              height={200}
              className={`w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer will-change-transform ${
                index === 0 ? 'mt-1' : index === 1 ? '-mt-1' : index === 2 ? 'mt-3' : '-mt-2'
              }`}
              initial={{ opacity: 0, rotate: image.rotate, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: image.rotate, scale: 1 }}
              whileHover={{ rotate: image.rotate / 2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </div>
    </SectionGroup>
  );
}