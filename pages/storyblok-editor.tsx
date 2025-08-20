/**
 * Page Storyblok Editor - Interface d'édition visuelle
 * Exemple simple avec HeroSection éditable
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import type { Language } from '@/types';

// Import des composants Storyblok
import HeroSection from '@/components/storyblok/HeroSection';

// Components existants
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import ProgressiveBackground from '@/components/ProgressiveBackground';
import { detectBrowserLanguage } from '@/hooks/useBrowserLanguage';
import { useBackgroundTransition } from '@/hooks/useBackgroundTransition';

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

// Exemple de données Storyblok (normalement viendraient de l'API)
const sampleHeroBlok = {
  _uid: 'sample-hero',
  component: 'hero-section',
  subtitle_fr: 'Un festival d\'Art Déco et Neo Art Déco',
  subtitle_en: 'An Art Deco and Neo Art Deco Festival',
  date_fr: '23 mars 2025 • 19h30',
  date_en: 'March 23, 2025 • 7:30 PM',
  hotel_name_fr: 'Hotel du Collectionneur',
  hotel_name_en: 'Hotel Collectionneur',
  location: 'Paris 75008',
  cta_text_fr: 'Billeterie',
  cta_text_en: 'Tickets',
};

export default function StoryblokEditor() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const { isCompactMode } = useBackgroundTransition();

  // Detect browser language on client side after mount
  useEffect(() => {
    const detectedLang = detectBrowserLanguage();
    setCurrentLang(detectedLang);
  }, []);

  return (
    <>
      <Head>
        <title>
          {currentLang === 'fr' 
            ? 'Storyblok Editor - Festival Art Déco' 
            : 'Storyblok Editor - Art Deco Festival'
          }
        </title>
        <meta 
          name="description" 
          content={
            currentLang === 'fr'
              ? 'Interface d\'édition Storyblok - Festival Art Déco'
              : 'Storyblok Editing Interface - Art Deco Festival'
          }
        />
        {/* Storyblok Visual Editor */}
        <script src="https://app.storyblok.com/f/storyblok-v2-latest.js" async />
      </Head>

      {/* Background progressif */}
      <ProgressiveBackground />

      {/* Navigation */}
      <ResponsiveNavigation
        labels={NAV_LABELS[currentLang]}
        lang={currentLang}
        setLang={setCurrentLang}
        isCompactMode={isCompactMode}
      />

      {/* Contenu principal */}
      <main className="relative z-10">
        
        {/* Message d'information */}
        <div className="fixed top-4 left-4 z-50 bg-primary/10 border border-primary/30 p-4 text-primary text-sm max-w-sm">
          <p className="font-title mb-2">🎨 Mode Éditeur Storyblok</p>
          <p className="font-body">
            {currentLang === 'fr' 
              ? 'Cette page montre comment les composants Storyblok peuvent être édités visuellement.'
              : 'This page shows how Storyblok components can be visually edited.'
            }
          </p>
        </div>

        {/* Section Hero éditable */}
        <HeroSection
          blok={sampleHeroBlok}
          lang={currentLang}
        />

        {/* Section de démonstration */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            <motion.h2
              className="font-title text-4xl text-primary mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {currentLang === 'fr' ? 'Édition Visuelle Active' : 'Visual Editing Active'}
            </motion.h2>
            
            <motion.div
              className="space-y-6 text-primary"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-primary/5 border border-primary/30 p-8 rounded">
                <h3 className="font-title text-2xl text-accent mb-4">
                  {currentLang === 'fr' ? 'Pour votre cliente :' : 'For your client:'}
                </h3>
                <ul className="space-y-3 text-left">
                  <li>• {currentLang === 'fr' 
                    ? 'Cliquez sur les éléments de la section hero ci-dessus' 
                    : 'Click on elements in the hero section above'
                  }</li>
                  <li>• {currentLang === 'fr' 
                    ? 'Modifiez directement les textes, dates, boutons' 
                    : 'Edit texts, dates, buttons directly'
                  }</li>
                  <li>• {currentLang === 'fr' 
                    ? 'Le design reste exactement identique' 
                    : 'The design stays exactly the same'
                  }</li>
                  <li>• {currentLang === 'fr' 
                    ? 'Pas besoin de développeur pour le contenu' 
                    : 'No developer needed for content changes'
                  }</li>
                </ul>
              </div>

              <p className="text-lg">
                {currentLang === 'fr' 
                  ? '🎯 Cette approche vous donne le contrôle total sur votre contenu !'
                  : '🎯 This approach gives you complete control over your content!'
                }
              </p>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}