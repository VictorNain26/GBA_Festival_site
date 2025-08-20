import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import ProgressiveBackground from '@/components/ProgressiveBackground';
import HeroTitle from '@/components/HeroTitle';
import SectionGroup from '@/components/SectionGroup';
import HeroSubtitle from '@/components/HeroSubtitle';
import OptimizedImage from '@/components/OptimizedImage';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { detectBrowserLanguage } from '@/hooks/useBrowserLanguage';
import { useBackgroundTransition } from '@/hooks/useBackgroundTransition';
import { getStoryblokStory, getStoryblokVersion } from '@/lib/storyblok-api';
import type { StoryblokStory } from '@/lib/storyblok-api';
import { renderRichText } from '@/lib/richTextRenderer';
import { NAV_LABELS } from '@/constants/content';
import type { Language } from '@/types';

interface HomeProps {
  story: StoryblokStory | null;
  hasStoryblokData: boolean;
}

/**
 * The main landing page for the festival site
 * All content comes from Storyblok CMS
 */
export default function Home({ story, hasStoryblokData }: HomeProps) {
  const [lang, setLang] = useState<Language>('en');
  const prefersReducedMotion = useReducedMotion();
  const { isCompactMode } = useBackgroundTransition();
  
  // Detect browser language on client side after mount
  useEffect(() => {
    const detectedLang = detectBrowserLanguage();
    setLang(detectedLang);
  }, []);

  // Helper pour le texte simple depuis le hero-section
  const getSimpleText = (field: string, fallback?: string): string => {
    if (!hasStoryblokData || !story?.content || !story.content.body) {
      return fallback || `${field}`;
    }
    
    // Chercher le bloc hero-section
    const heroSection = story.content.body.find((block: any) => block.component === 'hero-section');
    if (heroSection && heroSection[field]) {
      const fieldData = heroSection[field];
      
      // Si c'est déjà un string, le retourner
      if (typeof fieldData === 'string') {
        return fieldData;
      }
      
      // Si c'est un objet Rich Text, extraire le texte
      if (fieldData && typeof fieldData === 'object') {
        try {
          // Essayer d'extraire le texte brut des objets Rich Text
          if (fieldData.type === 'doc' && fieldData.content) {
            const extractText = (node: any): string => {
              if (!node) {
                return '';
              }
              if (typeof node === 'string') {
                return node;
              }
              if (node.text) {
                return node.text;
              }
              if (Array.isArray(node.content)) {
                return node.content.map(extractText).join('');
              }
              if (Array.isArray(node)) {
                return node.map(extractText).join('');
              }
              return '';
            };
            return extractText(fieldData);
          }
        } catch (error) {
          console.warn(`Erreur extraction texte pour ${field}:`, error);
        }
      }
      
      // Fallback: convertir en string
      return String(fieldData);
    }
    
    return fallback || `${field}`;
  };

  // Helper pour récupérer des données depuis des blocs de section
  const getSectionData = (sectionName: string, field: string, fallback?: string) => {
    if (!hasStoryblokData || !story?.content || !story.content.body) {
      return fallback || `${sectionName}_section.${field}`;
    }
    
    // Chercher le bon composant dans body
    const componentName = `${sectionName}-section`;
    const sectionContent = story.content.body.find((block: any) => block.component === componentName);
    
    if (sectionContent && sectionContent[field]) {
      return sectionContent[field];
    }
    return fallback || `${sectionName}_section.${field}`;
  };

  const getSectionRichText = (sectionName: string, field: string) => {
    if (!hasStoryblokData || !story?.content || !story.content.body) {
      return <span className="text-gray-400 italic">{sectionName}_section.{field}</span>;
    }
    
    // Chercher le bon composant dans body
    const componentName = `${sectionName}-section`;
    const sectionContent = story.content.body.find((block: any) => block.component === componentName);
    
    if (sectionContent && sectionContent[field]) {
      // Validation supplémentaire pour éviter les objets React invalides
      const fieldData = sectionContent[field];
      
      // Si c'est un string simple
      if (typeof fieldData === 'string') {
        return (
          <p className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify mb-3 xs:mb-4 sm:mb-4 lg:mb-4">
            {fieldData}
          </p>
        );
      }
      
      // Si c'est un objet Rich Text valide
      if (fieldData && typeof fieldData === 'object') {
        try {
          return renderRichText(fieldData);
        } catch (error) {
          console.warn(`Erreur rendu Rich Text pour ${sectionName}.${field}:`, error);
          return <span className="text-gray-400 italic">{sectionName}_section.{field} [erreur rendu]</span>;
        }
      }
    }
    return <span className="text-gray-400 italic">{sectionName}_section.{field}</span>;
  };

  // Memoize animation variants
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

  // Titre du site en fonction de la langue (SEO en dur)
  const siteTitle = lang === 'fr' 
    ? 'Florilège de l\'Art Déco - Festival Art Déco et Neo Art Déco'
    : 'Florilège de l\'Art Déco - Art Deco & Neo Art Deco Festival';

  const siteDescription = lang === 'fr'
    ? 'Festival Art Déco et Neo Art Déco - 18 octobre 2025 - Hôtel du Collectionneur, Paris'
    : 'Art Deco & Neo Art Deco Festival - October 18, 2025 - Hôtel du Collectionneur, Paris';

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
      </Head>
      
      <ErrorBoundary>
      {/* Progressive Background System */}
      <ProgressiveBackground />
      
      {/* Responsive Navigation */}
      <ResponsiveNavigation labels={NAV_LABELS[lang]} lang={lang} setLang={setLang} isCompactMode={isCompactMode} />
      
      {/* Main content */}
      <main aria-label="Festival content" className="relative z-10 overflow-x-hidden">
        {/* Hero section */}
        <section 
          id="hero" 
          className="relative flex flex-col items-center justify-center min-h-screen px-6 xs:px-8 sm:px-12 lg:px-20 xl:px-24 text-center py-4 xs:py-5 sm:py-6 md:py-7 lg:py-8 xl:py-10"
        >
          {/* Festival subtitle */}
          <HeroSubtitle 
            subtitle={getSimpleText(`hero_subtitle_${lang}`)} 
            getAnimationVariants={getAnimationVariants} 
          />

          {/* Date */}
          <motion.p
            className="font-title text-base sm:text-lg lg:text-xl text-primary mb-2 xs:mb-3 sm:mb-3 lg:mb-2 xl:mb-3 relative z-10"
            {...getAnimationVariants(0.1)}
          >
            {getSimpleText(`hero_date_${lang}`)}
          </motion.p>

          {/* Titre principal */}
          <HeroTitle 
            getAnimationVariants={getAnimationVariants} 
            title={getSimpleText(`hero_title_${lang}`)}
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
                {getSimpleText(`hero_cta_${lang}`)}
              </motion.a>
              
              <div className="flex flex-col items-center gap-2 xs:gap-3 sm:gap-2">
                <motion.p
                  className="font-title text-sm lg:text-base text-accent"
                  {...getAnimationVariants(0.5)}
                >
                  {getSimpleText('hero_location_name')}
                </motion.p>
                
                <motion.p
                  className="font-title text-sm lg:text-base text-accent"
                  {...getAnimationVariants(0.6)}
                >
                  {getSimpleText('hero_location_address')}
                </motion.p>
              </div>
            </div>

            {/* Desktop: Horizontal grid */}
            <div className="hidden lg:grid grid-cols-3 items-center w-full max-w-none">
              <motion.p
                className="font-title text-base lg:text-lg xl:text-xl text-accent text-right"
                {...getAnimationVariants(0.2)}
              >
                {getSimpleText('hero_location_name')}
              </motion.p>
              
              <motion.a
                href="#contact"
                className="inline-block px-8 lg:px-10 py-3 lg:py-4 font-title text-sm lg:text-base uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background text-center mx-auto"
                {...getAnimationVariants(0.2)}
              >
                {getSimpleText(`hero_cta_${lang}`)}
              </motion.a>
              
              <motion.p
                className="font-title text-base lg:text-lg xl:text-xl text-accent text-left"
                {...getAnimationVariants(0.2)}
              >
                {getSimpleText('hero_location_address')}
              </motion.p>
            </div>
          </div>
        </section>

        {/* About section */}
        <SectionGroup id="about" title={getSectionData('about', `title_${lang}`)} isCompactMode={isCompactMode}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* About content */}
            <div className="mb-3 xs:mb-4 sm:mb-4 lg:mb-4">
              <div className="mb-7 xs:mb-8 sm:mb-9 lg:mb-6 xl:mb-7 leading-relaxed text-base sm:text-lg lg:text-xl text-primary text-justify">
                {getSectionRichText('about', `content_${lang}`)}
              </div>
            </div>
            
            {/* Erté Angel Image */}
            <div className="flex justify-center mb-3 xs:mb-4 sm:mb-4 lg:mb-4">
              <OptimizedImage
                src="/images/ange_erte.jpg"
                alt="Ange d'Erté - Illustration Art Déco"
                width={450}
                height={570}
                className="w-full max-w-sm xs:max-w-md sm:max-w-lg lg:max-w-xl object-cover"
              />
            </div>

            {/* Description after image */}
            <div className="mb-6 xs:mb-7 sm:mb-8 lg:mb-10">
              <div className="leading-relaxed text-base sm:text-lg lg:text-xl text-primary text-justify">
                {getSectionRichText('about', `description_${lang}`)}
              </div>
            </div>
            
            {/* Danseuse image and objectives */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 mt-4 xs:mt-5 sm:mt-6 lg:mt-8">
              <OptimizedImage
                src="/images/danseuse.png"
                alt="Danseuse Art Déco"
                width={320}
                height={410}
                className="w-full max-w-44 xs:max-w-48 sm:max-w-52 lg:max-w-56 object-cover mx-auto"
              />
              
              <div className="flex flex-col justify-center space-y-3 xs:space-y-4">
                <div className="p-3 xs:p-4 sm:p-4 border border-primary">
                  <h4 className="font-title text-lg sm:text-xl lg:text-2xl text-accent mb-2 xs:mb-3">
                    {getSectionData('about', `target_audience_title_${lang}`)}
                  </h4>
                  <div className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed">
                    {getSectionRichText('about', `target_audience_${lang}`)}
                  </div>
                </div>
                
                <div className="p-3 xs:p-4 sm:p-4 border border-primary">
                  <h4 className="font-title text-lg sm:text-xl lg:text-2xl text-accent mb-2 xs:mb-3">
                    {getSectionData('about', `objective_title_${lang}`)}
                  </h4>
                  <div className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed">
                    {getSectionRichText('about', `objective_${lang}`)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </SectionGroup>

        {/* Partners section */}
        <SectionGroup id="partners" title={getSectionData('partners', `title_${lang}`)} isCompactMode={isCompactMode}>
          <div className="mb-6 xs:mb-7 sm:mb-8 lg:mb-10">
            <div className="mb-7 xs:mb-8 sm:mb-9 lg:mb-6 xl:mb-7 leading-relaxed text-base sm:text-lg lg:text-xl text-primary text-justify">
              {getSectionRichText('partners', `intro_${lang}`)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                {getSectionRichText('partners', `collaboration_${lang}`)}
              </div>
            </motion.div>
            
            <OptimizedImage
              src="/images/danseuse2.jpg"
              alt="Danseuse Art Déco - Partenaires"
              width={320}
              height={410}
              className="w-full max-w-44 xs:max-w-48 sm:max-w-52 lg:max-w-56 object-cover mx-auto"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </SectionGroup>

        {/* On the Way section */}
        <SectionGroup id="on-the-way" isCompactMode={isCompactMode} title={
          <div className="text-center space-y-1">
            <div className="font-bold leading-tight">{getSectionData('on-the-way', `title_${lang}`)}</div>
            <div className="h-px w-12 bg-accent mx-auto opacity-60"></div>
            <div className="font-body text-accent text-[0.5em] font-normal uppercase tracking-[0.3em] leading-none opacity-90">
              {getSectionData('on-the-way', `subtitle_${lang}`)}
            </div>
          </div>
        }>
          <div className="space-y-6 xs:space-y-7 sm:space-y-8 lg:space-y-10">
            {/* Content sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                  {getSectionRichText('on-the-way', `content_1_${lang}`)}
                </div>
              </motion.div>
              
              <OptimizedImage
                src="/images/bateau.png"
                alt="Bateau - Port du Havre 1925"
                width={400}
                height={500}
                className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
              <OptimizedImage
                src="/images/woman_or.jpg"
                alt="Femme Art Déco"
                width={400}
                height={500}
                className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              />
              
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                  {getSectionRichText('on-the-way', `content_2_${lang}`)}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                  {getSectionRichText('on-the-way', `content_3_${lang}`)}
                </div>
              </motion.div>
              
              <OptimizedImage
                src="/images/restaurant.jpg"
                alt="Restaurant Art Déco"
                width={400}
                height={500}
                className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
              <OptimizedImage
                src="/images/men.jpg"
                alt="Hommes élégants Art Déco"
                width={400}
                height={500}
                className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              />
              
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                  {getSectionRichText('on-the-way', `content_4_${lang}`)}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                  {getSectionRichText('on-the-way', `content_5_${lang}`)}
                </div>
              </motion.div>
              
              <OptimizedImage
                src="/images/tete_air.jpg"
                alt="Portrait Art Déco"
                width={400}
                height={500}
                className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </SectionGroup>

        {/* Deco Ball section */}
        <SectionGroup id="decoball" title={getSectionData('decoball', `title_${lang}`)} isCompactMode={isCompactMode}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                {getSectionRichText('decoball', `intro_${lang}`)}
              </div>
            </motion.div>
            
            {/* Dance images */}
            <div className="relative w-full flex justify-center">
              <div className="relative">
                <div className="relative z-10">
                  <OptimizedImage
                    src="/images/danse2.jpg"
                    alt="Danse Art Déco"
                    width={900}
                    height={1080}
                    className="w-full max-w-[320px] xs:max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] object-cover"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  />
                </div>
                
                <div className="absolute z-20 bottom-8 -left-6 xs:bottom-10 xs:-left-8 sm:bottom-12 sm:-left-10 lg:bottom-14 lg:-left-12 xl:bottom-16 xl:-left-16 transform translate-y-2 xs:translate-y-3 sm:translate-y-4 lg:translate-y-5 xl:translate-y-6">
                  <OptimizedImage
                    src="/images/danse1.jpg"
                    alt="Élégance Art Déco"
                    width={240}
                    height={300}
                    className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Gallery images */}
          <div className="mt-12 xs:mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
            <div className="relative flex flex-wrap justify-center items-center gap-4 xs:gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-8 xs:mb-10 sm:mb-12 lg:mb-16 xl:mb-20">
              <OptimizedImage
                src="/images/gallery_1.jpg"
                alt="Art Déco Gallery 1"
                width={160}
                height={200}
                className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer will-change-transform"
                initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: -12, scale: 1 }}
                whileHover={{ rotate: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <OptimizedImage
                src="/images/gallery_2.jpg"
                alt="Art Déco Gallery 2"
                width={160}
                height={200}
                className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer will-change-transform"
                initial={{ opacity: 0, rotate: 6, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: 6, scale: 1 }}
                whileHover={{ rotate: 3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <OptimizedImage
                src="/images/gallery_3.jpg"
                alt="Art Déco Gallery 3"
                width={160}
                height={200}
                className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer will-change-transform"
                initial={{ opacity: 0, rotate: -8, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: -8, scale: 1 }}
                whileHover={{ rotate: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <OptimizedImage
                src="/images/gallery_4.jpg"
                alt="Art Déco Gallery 4"
                width={160}
                height={200}
                className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer will-change-transform"
                initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: 10, scale: 1 }}
                whileHover={{ rotate: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <OptimizedImage
                src="/images/gallery_5.jpg"
                alt="Art Déco Gallery 5"
                width={160}
                height={200}
                className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer will-change-transform"
                initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: -15, scale: 1 }}
                whileHover={{ rotate: -7, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </div>
            
            <div className="relative flex flex-wrap justify-center items-center gap-6 xs:gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
              <OptimizedImage
                src="/images/gallery_6.jpg"
                alt="Art Déco Gallery 6"
                width={160}
                height={200}
                className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer will-change-transform"
                initial={{ opacity: 0, rotate: 8, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: 8, scale: 1 }}
                whileHover={{ rotate: 4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <OptimizedImage
                src="/images/gallery_7.jpg"
                alt="Art Déco Gallery 7"
                width={160}
                height={200}
                className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer will-change-transform"
                initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: -12, scale: 1 }}
                whileHover={{ rotate: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <OptimizedImage
                src="/images/gallery_8.jpg"
                alt="Art Déco Gallery 8"
                width={160}
                height={200}
                className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer will-change-transform"
                initial={{ opacity: 0, rotate: 14, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: 14, scale: 1 }}
                whileHover={{ rotate: 7, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <OptimizedImage
                src="/images/gallery_9.jpg"
                alt="Art Déco Gallery 9"
                width={160}
                height={200}
                className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer will-change-transform"
                initial={{ opacity: 0, rotate: -6, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
                whileHover={{ rotate: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </div>
          </div>
        </SectionGroup>

        {/* Contact section */}
        <section id="contact" className="relative min-h-screen flex flex-col justify-center px-8 xs:px-12 sm:px-16 lg:px-20 xl:px-24 2xl:px-32 py-12 xs:py-14 sm:py-16 lg:py-20 xl:py-24">
          <motion.h2
            className="font-title text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-accent mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {getSectionData('contact', `title_${lang}`)}
          </motion.h2>
          
          <div className="max-w-3xl mx-auto">
            <motion.h3
              className="font-title text-xl sm:text-2xl lg:text-3xl text-primary mb-1 xs:mb-2 sm:mb-2 lg:mb-3 xl:mb-4 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {getSectionData('contact', `heading_${lang}`)}
            </motion.h3>
            
            <motion.p
              className="font-body text-base sm:text-lg lg:text-xl text-accent mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {getSectionData('contact', `intro_${lang}`)}
            </motion.p>
            
            <motion.div
              className="flex flex-col lg:grid lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 lg:gap-4 xl:gap-5 mb-4 xs:mb-5 sm:mb-6 lg:mb-6 xl:mb-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.a
                href={`https://wa.me/${getSectionData('contact', 'phone').replace(/\s+/g, '')}`}
                className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="font-title text-sm lg:text-base block mb-1">
                  {getSectionData('contact', `whatsapp_${lang}`)}
                </span>
                <span className="font-body text-sm lg:text-base text-accent">
                  {getSectionData('contact', 'phone')}
                </span>
              </motion.a>
              
              <motion.a
                href={`mailto:${getSectionData('contact', 'email')}`}
                className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="font-title text-sm lg:text-base block mb-1">
                  Email
                </span>
                <span className="font-body text-sm lg:text-base break-all text-accent leading-tight">
                  {getSectionData('contact', 'email')}
                </span>
              </motion.a>
              
              <motion.a
                href={getSectionData('contact', 'website')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span className="font-title text-sm lg:text-base block mb-1">
                  Site Web
                </span>
                <span className="font-body text-sm lg:text-base text-accent">
                  grandbattementdailes.com
                </span>
              </motion.a>
            </motion.div>

            <motion.div
              className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.a
                href="#hero"
                className="w-full xs:w-auto xs:min-w-[100px] sm:min-w-[110px] lg:min-w-[130px] inline-block px-2 xs:px-3 sm:px-3 py-3 xs:py-3 sm:py-4 font-title text-sm lg:text-base uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {getSimpleText(`hero_cta_${lang}`)}
              </motion.a>

              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full xs:w-auto xs:min-w-[100px] sm:min-w-[110px] lg:min-w-[130px] inline-block px-2 xs:px-3 sm:px-3 py-3 xs:py-3 sm:py-4 font-title text-sm lg:text-base uppercase tracking-wider transition-all duration-300 border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-background text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {getSectionData('contact', `back_to_top_${lang}`)}
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      </ErrorBoundary>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    console.log('🔍 Tentative de récupération de la story "festival-homepage"...');
    
    const version = getStoryblokVersion();
    const story = await getStoryblokStory('festival-homepage', version);
    
    if (story) {
      console.log('✅ Story Storyblok récupérée avec succès:', { 
        name: story.name, 
        content_body_length: Object.keys(story.content || {}).length 
      });
      
      return {
        props: {
          story,
          hasStoryblokData: true
        },
        revalidate: 60 * 1, // Revalidate every 1 minute
      };
    } else {
      console.log('⚠️ Aucune story trouvée, utilisation du contenu par défaut');
      return {
        props: {
          story: null,
          hasStoryblokData: false
        },
        revalidate: 60 * 5, // Revalidate every 5 minutes when no data
      };
    }
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de la story Storyblok:', error);
    return {
      props: {
        story: null,
        hasStoryblokData: false
      },
      revalidate: 60 * 5, // Revalidate every 5 minutes on error
    };
  }
};