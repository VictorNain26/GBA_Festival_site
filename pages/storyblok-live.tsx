/**
 * Page Storyblok Live - Connexion API réelle
 * Démontre l'intégration complète avec l'API Storyblok
 */

import React, { useState } from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import type { Language, NavigationLabels } from '@/types';

// Import des composants Storyblok
import HeroSection from '@/components/storyblok/HeroSection';

// Components existants
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import ProgressiveBackground from '@/components/ProgressiveBackground';
import useBrowserLanguage from '@/hooks/useBrowserLanguage';

// API Storyblok
import { getStoryblokStory, isStoryblokConfigured, getStoryblokToken } from '@/lib/storyblok-api';
import type { StoryblokStory } from '@/lib/storyblok-api';

// Navigation labels
const NAV_LABELS: Record<Language, NavigationLabels> = {
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

interface StoryblokLiveProps {
  story: StoryblokStory | null;
  isConfigured: boolean;
  tokenInfo: string;
  error: string | null;
  isPreview: boolean;
}

export default function StoryblokLive({ story, isConfigured, tokenInfo, error, isPreview }: StoryblokLiveProps) {
  const browserLang = useBrowserLanguage();
  const [currentLang, setCurrentLang] = useState<Language>(browserLang);

  // État pour le contenu dynamique
  const [liveStory, setLiveStory] = useState<StoryblokStory | null>(story);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(error);

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
      <Head>
        <title>
          {currentLang === 'fr' 
            ? 'Storyblok Live - Festival Art Déco' 
            : 'Storyblok Live - Art Deco Festival'
          }
        </title>
        <meta 
          name="description" 
          content={
            currentLang === 'fr'
              ? 'Intégration Live avec Storyblok CMS - Festival Art Déco'
              : 'Live Storyblok CMS Integration - Art Deco Festival'
          }
        />
      </Head>

      {/* Background progressif */}
      <ProgressiveBackground />

      {/* Navigation */}
      <ResponsiveNavigation
        labels={NAV_LABELS[currentLang]}
        lang={currentLang}
        setLang={setCurrentLang}
        isCompactMode={false}
      />

      {/* Contenu principal */}
      <main className="relative z-10">
        
        {/* Badge Storyblok Live */}
        <motion.div
          className="fixed top-4 right-4 z-50 flex flex-col gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <div className={`px-3 py-2 font-title text-sm ${
            isConfigured && liveStory ? (isPreview ? 'bg-orange-600' : 'bg-green-600') : 'bg-red-600'
          } text-white`}>
            {isConfigured && liveStory ? (isPreview ? 'PREVIEW MODE 🔶' : 'STORYBLOK LIVE ✅') : 'STORYBLOK ERROR ❌'}
          </div>
          
          {/* Bouton de rechargement */}
          <button
            onClick={testConnection}
            disabled={loading}
            className="px-3 py-2 bg-accent text-background font-title text-sm hover:bg-accent/80 transition-colors disabled:opacity-50"
          >
            {loading ? 'LOADING...' : 'RELOAD'}
          </button>
        </motion.div>

        {/* Section de debug/status */}
        <motion.div
          className="fixed bottom-4 right-4 z-50 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="bg-black/80 text-primary p-4 font-mono text-xs border border-primary/30">
            <h4 className="text-accent mb-2">DEBUG INFO:</h4>
            <p><span className="text-primary/60">Configured:</span> {isConfigured ? '✅' : '❌'}</p>
            <p><span className="text-primary/60">Token:</span> {tokenInfo}</p>
            <p><span className="text-primary/60">Story:</span> {liveStory ? '✅' : '❌'}</p>
            {apiError && <p className="text-red-400 mt-2">Error: {apiError}</p>}
          </div>
        </motion.div>

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
            {liveStory.content.body?.map((section: any) => {
              switch (section.component) {
                case 'hero-section':
                  return (
                    <HeroSection
                      key={section._uid}
                      blok={section}
                      lang={currentLang}
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

            {/* Footer Live */}
            <footer className="py-8 px-4 text-center text-primary border-t border-primary/20">
              <motion.p
                className="text-sm opacity-80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {currentLang === 'fr' 
                  ? '🔴 LIVE - Contenu chargé depuis Storyblok API'
                  : '🔴 LIVE - Content loaded from Storyblok API'
                }
              </motion.p>
              <p className="text-xs mt-2 opacity-60">
                Story: {liveStory.name} | Updated: {new Date(liveStory.published_at).toLocaleString(currentLang)}
              </p>
            </footer>
          </>
        )}

      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const isConfigured = isStoryblokConfigured();
  const token = getStoryblokToken();
  const tokenInfo = token ? `${token.substring(0, 8)}...` : 'Non configuré';
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
      tokenInfo,
      error,
      isPreview,
    },
    revalidate: isPreview ? 1 : 60, // Revalidation plus fréquente en mode preview
  };
};