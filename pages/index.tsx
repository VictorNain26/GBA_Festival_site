/**
 * Page Storyblok Live - Connexion API réelle
 * Démontre l'intégration complète avec l'API Storyblok
 */

import React, { useState } from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { motion } from 'framer-motion';
import type { Language } from '@/types';
import SEO from '@/components/SEO';

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
import useBrowserLanguage from '@/hooks/useBrowserLanguage';
import { useBackgroundTransition } from '@/hooks/useBackgroundTransition';

// API Storyblok
import { getStoryblokStory, isStoryblokConfigured } from '@/lib/storyblok-api';
import type { StoryblokStory } from '@/lib/storyblok-api';

// Helpers pour les titres de sections
import { extractSectionTitles, generateNavigationLabels } from '@/lib/sectionTitles';

// Navigation labels (maintenant dynamiques via extractSectionTitles)

interface StoryblokLiveProps {
  story: StoryblokStory | null;
  isConfigured: boolean;
  error: string | null;
}

export default function StoryblokLive({ story, isConfigured, error }: StoryblokLiveProps) {
  const browserLang = useBrowserLanguage();
  const [currentLang, setCurrentLang] = useState<Language>(browserLang);
  const { isCompactMode } = useBackgroundTransition();

  // État pour le contenu dynamique
  const [liveStory, setLiveStory] = useState<StoryblokStory | null>(story);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(error);

  // Extraction dynamique des titres depuis le story Storyblok
  const extractedTitles = liveStory ? extractSectionTitles(liveStory) : {};
  const dynamicLabels = generateNavigationLabels(extractedTitles, currentLang);

  // Fonction pour recharger le contenu depuis l'API
  const reloadContent = async () => {
    setLoading(true);
    setApiError(null);
    
    try {
      const response = await fetch('/api/storyblok/festival-homepage');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      setLiveStory(data.story);
      // Les titres dynamiques seront automatiquement mis à jour via extractedTitles
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Erreur de chargement');
      console.error('Erreur rechargement:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour tester la connectivité Storyblok
  const testConnection = async () => {
    await reloadContent();
  };

  return (
    <>
      <SEO lang={currentLang} />

      {/* Background progressif avec toutes les images Art Déco */}
      <ProgressiveBackground />

      {/* Navigation */}
      <ResponsiveNavigation
        labels={dynamicLabels}
        lang={currentLang}
        setLang={setCurrentLang}
        isCompactMode={isCompactMode}
      />

      {/* Contenu principal */}
      <main className="relative z-10">
        

        {/* Contenu conditionnel */}
        {!isConfigured ? (
          // Configuration manquante
          <section className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">
              <motion.h1
                className="font-title text-4xl text-accent mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Configuration Storyblok Manquante
              </motion.h1>
              <motion.div
                className="space-y-4 text-primary"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p>Pour utiliser cette page, vous devez configurer:</p>
                <code className="block bg-primary/10 p-4 text-left">
                  NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_token_here
                </code>
                <p>Consultez le guide dans <code>storyblok-content/STORYBLOK_SETUP_GUIDE.md</code></p>
              </motion.div>
            </div>
          </section>
        ) : !liveStory ? (
          // Erreur de chargement
          <section className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">
              <motion.h1
                className="font-title text-4xl text-red-400 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Erreur de Connexion Storyblok
              </motion.h1>
              <motion.div
                className="space-y-4 text-primary"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p>Impossible de récupérer le contenu depuis Storyblok</p>
                {apiError && <p className="text-red-400">Erreur: {apiError}</p>}
                <button
                  onClick={testConnection}
                  disabled={loading}
                  className="px-6 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-background transition-all disabled:opacity-50"
                >
                  {loading ? 'Test en cours...' : 'Tester la connexion'}
                </button>
              </motion.div>
            </div>
          </section>
        ) : (
          // Contenu Storyblok réussi
          <>
            {Array.isArray(liveStory.content.body) && liveStory.content.body.map((section: any) => {
              switch (section.component) {
                case 'hero-section':
                  return (
                    <HeroSection
                      key={section._uid}
                      blok={section}
                      lang={currentLang}
                    />
                  );
                case 'about-section':
                  return (
                    <AboutSection
                      key={section._uid}
                      blok={section}
                      lang={currentLang}
                      isCompactMode={isCompactMode}
                    />
                  );
                case 'partners-section':
                  return (
                    <PartnersSection
                      key={section._uid}
                      blok={section}
                      lang={currentLang}
                      isCompactMode={isCompactMode}
                    />
                  );
                case 'on-the-way-section':
                  return (
                    <OnTheWaySection
                      key={section._uid}
                      blok={section}
                      lang={currentLang}
                      isCompactMode={isCompactMode}
                    />
                  );
                case 'deco-ball-section':
                  return (
                    <DecoBallSection
                      key={section._uid}
                      blok={section}
                      lang={currentLang}
                      isCompactMode={isCompactMode}
                    />
                  );
                case 'contact-section':
                  return (
                    <ContactSection
                      key={section._uid}
                      blok={section}
                      lang={currentLang}
                      isCompactMode={isCompactMode}
                    />
                  );
                default:
                  return (
                    <div key={section._uid} className="p-16 text-center">
                      <div className="max-w-4xl mx-auto border-2 border-primary/30 bg-primary/5 p-8">
                        <h2 className="font-title text-2xl text-primary mb-4">
                          {section.component.toUpperCase()}
                        </h2>
                        <p className="font-body text-primary/80">
                          Section Storyblok chargée depuis l&apos;API ✅
                        </p>
                      </div>
                    </div>
                  );
              }
            })}

          </>
        )}

      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const isConfigured = isStoryblokConfigured();
  const isPreview = context.preview || false;

  let story: StoryblokStory | null = null;
  let error: string | null = null;

  if (isConfigured) {
    try {
      // En mode preview, utiliser la version draft
      const version = isPreview ? 'draft' : 'published';
      story = await getStoryblokStory('festival-homepage', version);
      if (!story) {
        error = 'Histoire non trouvée dans Storyblok';
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Erreur de récupération';
    }
  } else {
    error = 'Token Storyblok non configuré';
  }

  return {
    props: {
      story,
      isConfigured,
      error,
    },
    revalidate: isPreview ? 1 : 60, // Revalidation plus fréquente en mode preview
  };
};