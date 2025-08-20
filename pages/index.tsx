/**
 * Page principale avec intégration Storyblok complète et Rich Text corrigé
 * Utilise storyblok-rich-text-react-renderer pour la compatibilité Next.js 15
 * Récupère les données depuis Storyblok et maintient le design exact
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import type { Language } from '@/types';

// Components principaux du design original
import SectionGroup from '@/components/SectionGroup';
import HeroSubtitle from '@/components/HeroSubtitle';
import OptimizedImage from '@/components/OptimizedImage';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import ProgressiveBackground from '@/components/ProgressiveBackground';
import ErrorBoundary from '@/components/ErrorBoundary';
import { detectBrowserLanguage } from '@/hooks/useBrowserLanguage';
import { useBackgroundTransition } from '@/hooks/useBackgroundTransition';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion } from 'framer-motion';

// API Storyblok pour le contenu éditable
import { getStoryblokStory, getStoryblokVersion } from '@/lib/storyblok-api';
import type { StoryblokStory } from '@/lib/storyblok-api';

// Contenu statique de fallback (design préservé)
import { 
  HERO_CONTENT, 
  ABOUT_CONTENT, 
  PARTNERS_INTRO,
  PARTNERS_COLLABORATION,
  DECO_BALL_INTRO,
  CONTACT_CONTENT,
  ON_THE_WAY_CONTENT,
  FESTIVAL_OBJECTIVE
} from '@/constants/content';

// Navigation labels
const NAV_LABELS = {
  fr: {
    hero: 'Accueil',
    about: 'Art Deco et Neo Art Deco', 
    partners: 'Nos Partenaires',
    ontheway: 'On the Way',
    decoball: 'Le Bal Art Deco',
    contact: 'Contact',
    tickets: 'Billeterie',
  },
  en: {
    hero: 'Home',
    about: 'Art Deco and Neo Art Deco',
    partners: 'Our Partners', 
    ontheway: 'On the Way',
    decoball: 'The Art Deco Ball',
    contact: 'Contact',
    tickets: 'Tickets',
  },
};

interface HomeProps {
  story: StoryblokStory | null;
  hasStoryblokData: boolean;
  buildTime: string;
}

export default function Home({ story, hasStoryblokData, buildTime }: HomeProps) {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const { isCompactMode } = useBackgroundTransition();
  const prefersReducedMotion = useReducedMotion();

  // Detect browser language on client side after mount
  useEffect(() => {
    const detectedLang = detectBrowserLanguage();
    setCurrentLang(detectedLang);
  }, []);

  // Helper pour obtenir le contenu Storyblok ou utiliser le fallback
  const getContent = (field: string, fallback: any) => {
    if (!hasStoryblokData || !story?.content) {
      return fallback;
    }
    
    // Pour les champs simples de texte dans Storyblok
    const storyblokContent = story.content[field];
    return storyblokContent || fallback;
  };

  // Animation variants
  const getAnimationVariants = (delay = 0) => {
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

  return (
    <>
      <Head>
        <title>
          {currentLang === 'fr' 
            ? 'Florilège de l\'Art Déco - Festival Art Déco et Neo Art Déco' 
            : 'Florilège de l\'Art Déco - Art Deco & Neo Art Deco Festival'
          }
        </title>
        <meta 
          name="description" 
          content={
            currentLang === 'fr'
              ? 'Festival Art Déco et Neo Art Déco - 18 octobre 2025 - Hôtel du Collectionneur, Paris'
              : 'Art Deco & Neo Art Deco Festival - October 18, 2025 - Hôtel du Collectionneur, Paris'
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ErrorBoundary>
        {/* Background progressif */}
        <ProgressiveBackground />

        {/* Navigation */}
        <ResponsiveNavigation
          labels={NAV_LABELS[currentLang]}
          lang={currentLang}
          setLang={setCurrentLang}
          isCompactMode={isCompactMode}
        />

        {/* Status Storyblok */}
        <div className="fixed top-4 right-4 z-50 text-xs">
          <div className={`px-3 py-2 rounded border ${
            hasStoryblokData 
              ? 'bg-green-900/20 border-green-500/30 text-green-400' 
              : 'bg-amber-900/20 border-amber-500/30 text-amber-400'
          }`}>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                hasStoryblokData ? 'bg-green-400' : 'bg-amber-400'
              }`} />
              <span className="font-mono">
                {hasStoryblokData ? 'Storyblok ✓' : 'Static Mode'}
              </span>
            </div>
            <div className="text-xs opacity-60 mt-1">
              {buildTime}
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <main className="relative z-10">
          
          {/* Section Hero - Design original préservé */}
          <section 
            id="hero" 
            className="min-h-screen flex flex-col justify-center items-center relative px-4 xs:px-6 sm:px-8 lg:px-12"
          >
            <motion.div
              {...getAnimationVariants(0.2)}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center"
            >
              {/* Titre principal avec design original */}
              <div className="flex flex-col items-center">
                {/* Mobile/Tablet - Titre puis images */}
                <div className="lg:hidden flex flex-col items-center">
                  <motion.h1
                    className="font-title text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-accent text-center mb-6 xs:mb-8 sm:mb-10 lg:mb-12"
                    style={{
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5)'
                    }}
                    {...getAnimationVariants(0)}
                  >
                    {getContent(`hero_title_${currentLang}`, HERO_CONTENT[currentLang].title)}
                  </motion.h1>

                  <motion.div 
                    className="flex items-center justify-center gap-3 xs:gap-4 sm:gap-5 md:gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <motion.div className="block" {...getAnimationVariants(0.3)}>
                      <OptimizedImage
                        src="/images/statue.jpg"
                        alt=""
                        width={200}
                        height={300}
                        className="object-contain transition-all duration-500 ease-in-out w-14 h-21 xs:w-16 xs:h-24 sm:w-18 sm:h-27 md:w-20 md:h-30 scale-x-[-1]"
                      />
                    </motion.div>

                    <motion.div className="relative" {...getAnimationVariants(0.2)}>
                      <OptimizedImage
                        src="/images/eiffel.jpg"
                        alt=""
                        width={240}
                        height={360}
                        className="object-contain transition-all duration-500 ease-in-out w-16 h-24 xs:w-18 xs:h-27 sm:w-20 sm:h-30 md:w-22 md:h-33"
                      />
                    </motion.div>

                    <motion.div className="block" {...getAnimationVariants(0.3)}>
                      <OptimizedImage
                        src="/images/statue.jpg"
                        alt=""
                        width={200}
                        height={300}
                        className="object-contain transition-all duration-500 ease-in-out w-14 h-21 xs:w-16 xs:h-24 sm:w-18 sm:h-27 md:w-20 md:h-30"
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Desktop - Images avec titre superposé */}
                <div className="hidden lg:block relative">
                  <motion.div 
                    className="flex items-end justify-center gap-16 lg:gap-20 xl:gap-24 2xl:gap-28"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <motion.div className="block" {...getAnimationVariants(0.2)}>
                      <OptimizedImage
                        src="/images/statue.jpg"
                        alt=""
                        width={200}
                        height={300}
                        className="object-contain opacity-85 transition-all duration-500 ease-in-out w-38 h-57 lg:w-42 lg:h-63 xl:w-46 xl:h-69 2xl:w-50 2xl:h-75 scale-x-[-1]"
                      />
                    </motion.div>

                    <motion.div className="relative" {...getAnimationVariants(0.1)}>
                      <OptimizedImage
                        src="/images/eiffel.jpg"
                        alt=""
                        width={240}
                        height={360}
                        className="object-contain opacity-70 transition-all duration-500 ease-in-out w-38 h-57 lg:w-42 lg:h-63 xl:w-46 xl:h-69 2xl:w-50 2xl:h-75"
                      />
                    </motion.div>

                    <motion.div className="block" {...getAnimationVariants(0.2)}>
                      <OptimizedImage
                        src="/images/statue.jpg"
                        alt=""
                        width={200}
                        height={300}
                        className="object-contain opacity-85 transition-all duration-500 ease-in-out w-38 h-57 lg:w-42 lg:h-63 xl:w-46 xl:h-69 2xl:w-50 2xl:h-75"
                      />
                    </motion.div>
                  </motion.div>

                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.h1
                      className="font-title text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-accent text-center"
                      style={{
                        textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9), 0 0 15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 0, 0, 0.5)'
                      }}
                      {...getAnimationVariants(0)}
                    >
                      {getContent(`hero_title_${currentLang}`, HERO_CONTENT[currentLang].title)}
                    </motion.h1>
                  </div>
                </div>
              </div>
              
              <HeroSubtitle 
                subtitle={getContent(`hero_subtitle_${currentLang}`, HERO_CONTENT[currentLang].subtitle)}
                getAnimationVariants={getAnimationVariants}
              />
              
              <div className="space-y-2 xs:space-y-3 text-base xs:text-lg sm:text-xl lg:text-2xl text-primary font-body mb-8 xs:mb-10 sm:mb-12 lg:mb-16">
                <p>{getContent(`hero_date_${currentLang}`, HERO_CONTENT[currentLang].date)}</p>
                <p>{getContent(`hero_location_${currentLang}`, HERO_CONTENT[currentLang].location)}</p>
              </div>
              
              <motion.a
                href="#tickets"
                className="inline-block bg-accent text-background font-title text-lg xs:text-xl sm:text-2xl lg:text-3xl px-6 xs:px-8 sm:px-10 lg:px-12 py-3 xs:py-4 sm:py-5 lg:py-6 border border-accent hover:bg-transparent hover:text-accent transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getContent(`hero_cta_${currentLang}`, HERO_CONTENT[currentLang].cta)}
              </motion.a>
            </motion.div>
          </section>

          {/* Section About - Design original préservé */}
          <SectionGroup id="about" title="Art Deco et Neo Art Deco" isCompactMode={isCompactMode}>
            <motion.div
              {...getAnimationVariants(0.2)}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Paragraphes d'introduction */}
              <div className="mb-3 xs:mb-4 sm:mb-4 lg:mb-4">
                {ABOUT_CONTENT[currentLang].slice(0, 2).map((paragraph, index) => (
                  <p key={index} className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify mb-3 xs:mb-4 sm:mb-4 lg:mb-4">
                    {getContent(`about_paragraph_${index + 1}_${currentLang}`, paragraph)}
                  </p>
                ))}
              </div>
              
              {/* Image Ange Erté */}
              <div className="flex justify-center mb-3 xs:mb-4 sm:mb-4 lg:mb-4">
                <OptimizedImage
                  src="/images/ange_erte.jpg"
                  alt="Ange d'Erté - Illustration Art Déco"
                  width={450}
                  height={570}
                  className="w-full max-w-sm xs:max-w-md sm:max-w-lg lg:max-w-xl object-cover"
                />
              </div>
              
              {/* Paragraphes de conclusion */}
              <div>
                {ABOUT_CONTENT[currentLang].slice(2).map((paragraph, index) => (
                  <p key={index + 2} className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify mb-3 xs:mb-4 sm:mb-4 lg:mb-4">
                    {getContent(`about_paragraph_${index + 3}_${currentLang}`, paragraph)}
                  </p>
                ))}
              </div>
              
              {/* Layout avec image danseuse et objectifs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 mt-4 xs:mt-5 sm:mt-6 lg:mt-8">
                {/* Image Danseuse */}
                <OptimizedImage
                  src="/images/danseuse.png"
                  alt="Danseuse Art Déco"
                  width={320}
                  height={410}
                  className="w-full max-w-44 xs:max-w-48 sm:max-w-52 lg:max-w-56 object-cover mx-auto"
                />
                
                {/* Objectifs avec bordures */}
                <div className="flex flex-col justify-center space-y-3 xs:space-y-4">
                  <div className="p-3 xs:p-4 sm:p-4 border border-primary">
                    <p className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                      {getContent(`about_target_${currentLang}`, FESTIVAL_OBJECTIVE[currentLang][0])}
                    </p>
                  </div>
                  
                  <div className="p-3 xs:p-4 sm:p-4 border border-primary">
                    <p className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                      {getContent(`about_objective_${currentLang}`, FESTIVAL_OBJECTIVE[currentLang][1])}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </SectionGroup>

          {/* Section Partners - Design original préservé */}
          <SectionGroup id="partners" title="Nos Partenaires" isCompactMode={isCompactMode}>
            <div className="mb-6 xs:mb-7 sm:mb-8 lg:mb-10">
              <p className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify mb-3 xs:mb-4 sm:mb-4 lg:mb-4">
                {getContent(`partners_intro_${currentLang}`, PARTNERS_INTRO[currentLang][0])}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <p className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                  {getContent(`partners_collaboration_${currentLang}`, PARTNERS_COLLABORATION[currentLang])}
                </p>
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
                viewport={{ once: true, margin: '-50px' }}
              />
            </div>
          </SectionGroup>

          {/* Section On The Way - Design original préservé */}
          <SectionGroup id="ontheway" title="On the Way" isCompactMode={isCompactMode}>
            <div className="space-y-3 xs:space-y-4 sm:space-y-4 lg:space-y-4">
              {ON_THE_WAY_CONTENT[currentLang].map((paragraph, index) => (
                <motion.p 
                  key={index}
                  className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify"
                  {...getAnimationVariants(0.1 * index)}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {getContent(`ontheway_paragraph_${index + 1}_${currentLang}`, paragraph)}
                </motion.p>
              ))}
            </div>
          </SectionGroup>

          {/* Section Deco Ball - Design original préservé */}
          <SectionGroup id="decoball" title="Le Bal Art Deco" isCompactMode={isCompactMode}>
            <div className="text-center">
              <motion.p
                className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed mb-6 xs:mb-7 sm:mb-8 lg:mb-10"
                {...getAnimationVariants(0.2)}
                viewport={{ once: true, margin: "-100px" }}
              >
                {getContent(`decoball_intro_${currentLang}`, DECO_BALL_INTRO[currentLang])}
              </motion.p>
              
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto">
                {Array.from({ length: 8 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="aspect-square relative"
                    {...getAnimationVariants(0.1 * i)}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <OptimizedImage
                      src={`/images/gallery_${i + 1}.png`}
                      alt={`Galerie Art Déco ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionGroup>

          {/* Section Contact - Design original préservé */}
          <SectionGroup id="contact" title="Contact" isCompactMode={isCompactMode}>
            <div className="text-center max-w-2xl mx-auto">
              <motion.div
                {...getAnimationVariants(0.2)}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="font-title text-2xl sm:text-3xl lg:text-4xl text-accent mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
                  {getContent(`contact_heading_${currentLang}`, CONTACT_CONTENT[currentLang].heading)}
                </h3>
                
                <p className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed mb-6 xs:mb-7 sm:mb-8 lg:mb-10">
                  {getContent(`contact_intro_${currentLang}`, CONTACT_CONTENT[currentLang].intro)}
                </p>
                
                <div className="space-y-2 xs:space-y-3 text-base xs:text-lg sm:text-xl lg:text-2xl text-primary font-body">
                  <p>{getContent(`contact_phone_${currentLang}`, CONTACT_CONTENT[currentLang].phone)}</p>
                  <p className="break-all">{getContent(`contact_email_${currentLang}`, CONTACT_CONTENT[currentLang].email)}</p>
                  <a 
                    href={getContent(`contact_website_${currentLang}`, CONTACT_CONTENT[currentLang].website)}
                    className="text-accent hover:text-primary transition-colors duration-200 underline block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    grandbattementdailes.com
                  </a>
                </div>
              </motion.div>
            </div>
          </SectionGroup>

        </main>
      </ErrorBoundary>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const buildTime = new Date().toISOString();
  
  try {
    // Récupération de la story principale depuis Storyblok
    console.warn('🔍 Tentative de récupération de la story "festival-homepage"...');
    const story = await getStoryblokStory('festival-homepage', getStoryblokVersion());
    
    if (story) {
      console.warn('✅ Story Storyblok récupérée avec succès:', {
        name: story.name,
        content_body_length: story.content?.body?.length || 0,
      });
    } else {
      console.warn('❌ Story Storyblok non trouvée');
    }
    
    const hasStoryblokData = Boolean(
      story && 
      story.content && 
      Array.isArray(story.content.body) && 
      story.content.body.length > 0
    );
    
    // Sérialisation sécurisée pour éviter les problèmes de sérialisation Next.js
    const serializedStory = story ? JSON.parse(JSON.stringify(story)) : null;
    
    return {
      props: {
        story: serializedStory,
        hasStoryblokData,
        buildTime,
      },
      // Revalidation toutes les 60 secondes en production
      revalidate: 60,
    };
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des données Storyblok:', error);
    
    // Retourner des props vides en cas d'erreur
    return {
      props: {
        story: null,
        hasStoryblokData: false,
        buildTime,
      },
      revalidate: 60,
    };
  }
};