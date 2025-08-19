/**
 * Composant Storyblok: Section "Le Bal Art Déco" / "The Art Deco Ball"
 * Reproduit EXACTEMENT le design original avec SectionGroup, galerie d'images et CTA
 */

import React, { useMemo } from 'react';
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
  cta_text_fr: string;
  cta_text_en: string;
  cta_link: string;
}

interface DecoBallSectionProps {
  blok: StoryblokDecoBallSectionData;
  lang: Language;
  isCompactMode: boolean;
}

export default function DecoBallSection({ blok, lang, isCompactMode }: DecoBallSectionProps) {
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
  const title = blok[`title_${lang}` as keyof StoryblokDecoBallSectionData] as string || '';
  const introText = blok[`intro_text_${lang}` as keyof StoryblokDecoBallSectionData] as string || '';
  const ctaText = blok[`cta_text_${lang}` as keyof StoryblokDecoBallSectionData] as string || '';
  const ctaLink = blok.cta_link || '#tickets';

  // Galerie d'images hardcodée - EXACTEMENT comme l'original
  const galleryImages = [
    { src: '/images/gallery_1.png', alt: 'Art Déco - Galerie 1' },
    { src: '/images/gallery_2.png', alt: 'Art Déco - Galerie 2' },
    { src: '/images/gallery_3.png', alt: 'Art Déco - Galerie 3' },
    { src: '/images/gallery_4.png', alt: 'Art Déco - Galerie 4' },
    { src: '/images/gallery_5.png', alt: 'Art Déco - Galerie 5' },
    { src: '/images/gallery_6.png', alt: 'Art Déco - Galerie 6' },
    { src: '/images/gallery_7.png', alt: 'Art Déco - Galerie 7' },
    { src: '/images/gallery_8.png', alt: 'Art Déco - Galerie 8' },
  ];

  return (
    <SectionGroup 
      {...storyblokEditable(blok)}
      id="decoball" 
      title={title} 
      isCompactMode={isCompactMode}
    >
      {/* Texte d'introduction */}
      <motion.div {...getAnimationVariants(0.2)} viewport={{ once: true, margin: "-100px" }}>
        <div className="text-center mb-6 xs:mb-7 sm:mb-8 lg:mb-10">
          {introText && (
            <p 
              className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed max-w-4xl mx-auto"
              dangerouslySetInnerHTML={{ __html: introText }}
            />
          )}
        </div>
      </motion.div>

      {/* Galerie d'images - Grid responsive EXACTEMENT comme l'original */}
      <motion.div {...getAnimationVariants(0.4)} viewport={{ once: true, margin: "-100px" }}>
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 lg:gap-5 mb-8 xs:mb-9 sm:mb-10 lg:mb-12">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
              className="relative group cursor-pointer overflow-hidden"
            >
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                width={300}
                height={300}
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay au hover */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bouton CTA - EXACTEMENT comme l'original */}
      {ctaText && ctaLink && (
        <motion.div 
          {...getAnimationVariants(0.6)} 
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.a
            href={ctaLink}
            className="inline-block px-8 xs:px-10 sm:px-12 lg:px-16 py-3 xs:py-4 sm:py-4 lg:py-5 border-2 border-accent text-accent font-title text-base xs:text-lg sm:text-xl lg:text-2xl transition-all duration-300 hover:bg-accent hover:text-background hover:scale-105"
            whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
          >
            {ctaText}
          </motion.a>
        </motion.div>
      )}
    </SectionGroup>
  );
}