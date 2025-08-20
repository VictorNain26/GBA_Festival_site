/**
 * Page principale avec intégration Storyblok complète
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
}

export default function Home({ story, hasStoryblokData }: HomeProps) {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const { isCompactMode } = useBackgroundTransition();

  // Detect browser language on client side after mount
  useEffect(() => {
    const detectedLang = detectBrowserLanguage();
    setCurrentLang(detectedLang);
  }, []);

  // Fonction pour extraire les sections par type
  const getSectionByType = (componentType: string) => {
    if (!story?.content?.body) {
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

        {/* Message d'information si pas de données Storyblok */}
        {!hasStoryblokData && (
          <div className="fixed top-4 right-4 z-50 bg-accent/10 border border-accent/30 p-4 text-accent text-sm max-w-xs">
            <p className="font-title mb-2">⚠️ Mode Fallback</p>
            <p className="font-body text-xs">
              {currentLang === 'fr' 
                ? 'Données Storyblok non disponibles. Contenu de fallback affiché.'
                : 'Storyblok data unavailable. Showing fallback content.'
              }
            </p>
          </div>
        )}

        {/* Contenu principal */}
        <main className="relative z-10">
          
          {/* Section Hero */}
          {heroSection ? (
            <HeroSection
              blok={heroSection}
              lang={currentLang}
            />
          ) : (
            <div className="min-h-screen flex items-center justify-center">
              <p className="text-primary text-center">
                {currentLang === 'fr' 
                  ? 'Section Hero non disponible'
                  : 'Hero section unavailable'
                }
              </p>
            </div>
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

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Récupération de la story principale depuis Storyblok
    const story = await getStoryblokStory('home', getStoryblokVersion());
    
    const hasStoryblokData = Boolean(story && story.content && story.content.body);
    
    return {
      props: {
        story,
        hasStoryblokData,
      },
      // Revalidation toutes les 60 secondes en production
      revalidate: 60,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données Storyblok:', error);
    
    // Retourner des props vides en cas d'erreur
    return {
      props: {
        story: null,
        hasStoryblokData: false,
      },
      revalidate: 60,
    };
  }
};