/**
 * Composant Hero Section
 * SRP : Responsabilité unique d'affichage de la section hero
 * OCP : Ouvert à l'extension via props, fermé à la modification
 */

import { motion } from 'framer-motion';
import HeroTitle from './HeroTitle';
import HeroSubtitle from './HeroSubtitle';
import type { Language } from '@/types';
import type { StoryblokDataService } from '@/services/storyblokService';

interface HeroSectionProps {
  lang: Language;
  storyblokData: StoryblokDataService;
  getAnimationVariants: (delay?: number) => any;
}

/**
 * Section Hero avec titre, sous-titre et call-to-action
 * Architecture SOLID : composant focalisé sur une seule responsabilité
 */
export default function HeroSection({ 
  lang, 
  storyblokData, 
  getAnimationVariants 
}: HeroSectionProps) {
  return (
    <section 
      id="hero" 
      className="relative flex flex-col items-center justify-center min-h-screen px-6 xs:px-8 sm:px-12 lg:px-20 xl:px-24 text-center py-4 xs:py-5 sm:py-6 md:py-7 lg:py-8 xl:py-10"
    >
      {/* Festival subtitle */}
      <HeroSubtitle 
        subtitle={storyblokData.getSimpleText(`hero_subtitle_${lang}`)} 
        getAnimationVariants={getAnimationVariants} 
      />

      {/* Date */}
      <motion.p
        className="font-title text-base sm:text-lg lg:text-xl text-primary mb-2 xs:mb-3 sm:mb-3 lg:mb-2 xl:mb-3 relative z-10"
        {...getAnimationVariants(0.1)}
      >
        {storyblokData.getSimpleText(`hero_date_${lang}`)}
      </motion.p>

      {/* Titre principal */}
      <HeroTitle 
        getAnimationVariants={getAnimationVariants} 
        title={storyblokData.getSimpleText(`hero_title_${lang}`)}
      />

      {/* Call to action */}
      <div className="w-full flex flex-col items-center mt-4 xs:mt-5 sm:mt-6 md:mt-7 lg:mt-6 xl:mt-8">
        {/* Mobile/Tablet: Vertical stack */}
        <div className="flex lg:hidden flex-col items-center gap-3 xs:gap-4 sm:gap-4">
          <motion.a
            href="#contact"
            className="inline-block px-6 xs:px-7 sm:px-7 py-3 xs:py-4 sm:py-3 font-title text-sm lg:text-base uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background"
            {...getAnimationVariants(0.2)}
          >
            {storyblokData.getSimpleText(`hero_cta_${lang}`)}
          </motion.a>
          
          <div className="flex flex-col items-center gap-2 xs:gap-3 sm:gap-2">
            <motion.p
              className="font-title text-sm lg:text-base text-accent"
              {...getAnimationVariants(0.5)}
            >
              {storyblokData.getSimpleText('hero_location_name')}
            </motion.p>
            
            <motion.p
              className="font-title text-sm lg:text-base text-accent"
              {...getAnimationVariants(0.6)}
            >
              {storyblokData.getSimpleText('hero_location_address')}
            </motion.p>
          </div>
        </div>

        {/* Desktop: Horizontal grid */}
        <div className="hidden lg:grid grid-cols-3 items-center w-full max-w-none">
          <motion.p
            className="font-title text-base lg:text-lg xl:text-xl text-accent text-right"
            {...getAnimationVariants(0.2)}
          >
            {storyblokData.getSimpleText('hero_location_name')}
          </motion.p>
          
          <motion.a
            href="#contact"
            className="inline-block px-8 lg:px-10 py-3 lg:py-4 font-title text-sm lg:text-base uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background text-center mx-auto"
            {...getAnimationVariants(0.2)}
          >
            {storyblokData.getSimpleText(`hero_cta_${lang}`)}
          </motion.a>
          
          <motion.p
            className="font-title text-base lg:text-lg xl:text-xl text-accent text-left"
            {...getAnimationVariants(0.2)}
          >
            {storyblokData.getSimpleText('hero_location_address')}
          </motion.p>
        </div>
      </div>
    </section>
  );
}