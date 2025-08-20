/**
 * Page principale avec intégration Storyblok complète et Rich Text corrigé
 * Utilise storyblok-rich-text-react-renderer pour la compatibilité Next.js 15
 * Récupère les données depuis Storyblok et maintient le design exact
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import type { Language } from '@/types';

// Import des composants Storyblok
import HeroSection from '@/components/storyblok/HeroSection';
import AboutSection from '@/components/storyblok/AboutSection';
import PartnersSection from '@/components/storyblok/PartnersSection';
import OnTheWaySection from '@/components/storyblok/OnTheWaySection';
import DecoBallSection from '@/components/storyblok/DecoBallSection';
import ContactSection from '@/components/storyblok/ContactSection';

// Components existants
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import ProgressiveBackground from '@/components/ProgressiveBackground';
import ErrorBoundary from '@/components/ErrorBoundary';
import { detectBrowserLanguage } from '@/hooks/useBrowserLanguage';
import { useBackgroundTransition } from '@/hooks/useBackgroundTransition';

// API Storyblok
import { getStoryblokStory, getStoryblokVersion } from '@/lib/storyblok-api';
import type { StoryblokStory } from '@/lib/storyblok-api';

// Contenu statique en fallback (si Storyblok indisponible) - importé seulement si nécessaire
// import HeroTitle from '@/components/HeroTitle';
// import SectionGroup from '@/components/SectionGroup';
// import HeroSubtitle from '@/components/HeroSubtitle';
// import OptimizedImage from '@/components/OptimizedImage';
// import { useReducedMotion } from '@/hooks/useReducedMotion';
// import { motion } from 'framer-motion';
// import { 
//   HERO_CONTENT, 
//   ABOUT_CONTENT, 
//   PARTNERS_INTRO,
//   PARTNERS_COLLABORATION,
//   DECO_BALL_INTRO,
//   CONTACT_CONTENT 
// } from '@/constants/content';

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

  // Detect browser language on client side after mount
  useEffect(() => {
    const detectedLang = detectBrowserLanguage();
    setCurrentLang(detectedLang);
  }, []);

  // Fonction pour extraire les sections par type
  const getSectionByType = (componentType: string) => {
    if (!story?.content?.body || !Array.isArray(story.content.body)) {
      return null;
    }
    
    return story.content.body.find((block: any) => 
      block.component === componentType
    ) || null;
  };

  // Récupération des sections
  const heroSection = getSectionByType('hero-section');
  const aboutSection = getSectionByType('about-section');
  const partnersSection = getSectionByType('partners-section');
  const onthewaySection = getSectionByType('ontheway-section');
  const decoballSection = getSectionByType('decoball-section');
  const contactSection = getSectionByType('contact-section');

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
          
          {/* Section Hero */}
          {heroSection ? (
            <HeroSection
              blok={heroSection}
              lang={currentLang}
            />
          ) : (
            // Contenu de fallback : utilise le contenu statique (si nécessaire)
            <div>Contenu en cours de chargement...</div>
          )}

          {/* Section About */}
          {aboutSection && (
            <AboutSection
              blok={aboutSection}
              lang={currentLang}
              isCompactMode={isCompactMode}
            />
          )}

          {/* Section Partners */}
          {partnersSection && (
            <PartnersSection
              blok={partnersSection}
              lang={currentLang}
              isCompactMode={isCompactMode}
            />
          )}

          {/* Section On The Way */}
          {onthewaySection && (
            <OnTheWaySection
              blok={onthewaySection}
              lang={currentLang}
              isCompactMode={isCompactMode}
            />
          )}

          {/* Section Deco Ball */}
          {decoballSection && (
            <DecoBallSection
              blok={decoballSection}
              lang={currentLang}
              isCompactMode={isCompactMode}
            />
          )}

          {/* Section Contact */}
          {contactSection && (
            <ContactSection
              blok={contactSection}
              lang={currentLang}
              isCompactMode={isCompactMode}
            />
          )}

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
    
    // VERSION ROBUSTE: Activation Storyblok avec champs Text simples
    const serializedStory = story ? JSON.parse(JSON.stringify(story)) : null;
    const safeStoryblokData = hasStoryblokData;
    
    return {
      props: {
        story: serializedStory,
        hasStoryblokData: safeStoryblokData,
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