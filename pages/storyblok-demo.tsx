/**
 * Page de démo simple pour Storyblok
 * Version simplifiée pour validation du concept
 */

import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import ProgressiveBackground from '@/components/ProgressiveBackground';
import ErrorBoundary from '@/components/ErrorBoundary';
import Frame from '@/components/Frame';
import { useBackgroundTransition } from '@/hooks/useBackgroundTransition';
import type { Language } from '@/types';

export default function StoryblokDemoPage() {
  // États de base
  const [lang, setLang] = useState<Language>('fr');
  
  // Hook pour la transition de background
  const {
    showNavigation,
    isCompactMode,
  } = useBackgroundTransition();

  // Navigation labels temporaire
  const navLabels = {
    hero: lang === 'fr' ? 'Accueil' : 'Home',
    about: lang === 'fr' ? 'Art Deco et Neo Art Deco' : 'Art Deco and Neo Art Deco',
    partners: lang === 'fr' ? 'Nos Partenaires' : 'Our Partners',
    ontheway: lang === 'fr' ? 'On the Way' : 'On the Way',
    decoball: lang === 'fr' ? 'Le Bal Art Deco' : 'The Art Deco Ball',
    contact: 'Contact',
    tickets: lang === 'fr' ? 'Billeterie' : 'Tickets',
  };

  // Mock data Storyblok simplifié
  const storyblokContent = {
    hero: {
      title: lang === 'fr' 
        ? 'Florilège\nde l\'Art Déco' 
        : 'Florilège\nof Art Deco',
      subtitle: lang === 'fr'
        ? 'Festival Art Déco et Neo Art Déco'
        : 'Art Deco & Neo Art Deco Festival',
      date: lang === 'fr' ? '18 octobre 2025' : '18 October 2025',
      location: 'Hotel du Collectionneur, Paris 75008',
      cta: lang === 'fr' ? 'Billeterie' : 'Tickets'
    },
    about: {
      title: lang === 'fr' 
        ? 'Art Déco\net Neo Art Déco' 
        : 'Art Deco\nand Neo Art Deco',
      content: lang === 'fr'
        ? 'Depuis plus de cent ans l\'Art déco séduit le monde. Mais c\'est bien l\'Exposition Internationale des Arts décoratifs et industriels modernes de Paris, évènement fondateur de l\'année 1925, qui a donné le nom à l\'Art Déco.'
        : 'For more than a century Art Deco has captivated the world. But it was the International Exhibition of Modern Decorative and Industrial Arts in Paris, a landmark event held in 1925, that gave the movement its name.'
    }
  };

  return (
    <ErrorBoundary>
      <Head>
        <title>
          {lang === 'fr' 
            ? 'Démo Storyblok - Florilège de l\'Art Déco' 
            : 'Storyblok Demo - Florilège of Art Deco'
          }
        </title>
        <meta 
          name="description" 
          content={lang === 'fr' 
            ? 'Démonstration de l\'intégration Storyblok pour le Festival Art Déco' 
            : 'Demonstration of Storyblok integration for Art Deco Festival'
          } 
        />
      </Head>

      {/* Background avec ornements Art Déco */}
      <ProgressiveBackground />

      {/* Navigation */}
      {showNavigation && (
        <ResponsiveNavigation
          labels={navLabels}
          lang={lang}
          setLang={setLang}
          isCompactMode={isCompactMode}
        />
      )}

      <main className="relative">
        {/* Section Status */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <Frame className="w-full max-w-4xl mx-auto">
            <div className="text-center py-16">
              <motion.h1 
                className="font-title text-4xl xs:text-5xl sm:text-6xl lg:text-7xl text-primary mb-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                🏗️ Storyblok Integration
              </motion.h1>

              {/* Status Cards */}
              <div className="grid sm:grid-cols-2 gap-6 mt-12">
                
                {/* Configuration Status */}
                <motion.div 
                  className="p-6 border border-primary bg-background/30"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="font-title text-xl text-accent mb-4">
                    ✅ Configuration
                  </h3>
                  <ul className="font-body text-sm text-primary/80 space-y-2 text-left">
                    <li>• SDK Storyblok @5.4.4 installé</li>
                    <li>• Configuration TypeScript</li>
                    <li>• Composants de base créés</li>
                    <li>• Types bilingues définis</li>
                  </ul>
                </motion.div>

                {/* Components Status */}
                <motion.div 
                  className="p-6 border border-primary bg-background/30"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="font-title text-xl text-accent mb-4">
                    🚧 Composants
                  </h3>
                  <ul className="font-body text-sm text-primary/80 space-y-2 text-left">
                    <li>• TextBlock ✅</li>
                    <li>• TitleBlock ✅</li>
                    <li>• HeroSection ⏳</li>
                    <li>• Autres sections ⏳</li>
                  </ul>
                </motion.div>

              </div>

              {/* Demo Content Simulation */}
              <div className="mt-16 space-y-12">
                
                {/* Hero Content Demo */}
                <motion.div
                  className="p-8 border border-accent/30 bg-accent/5"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h3 className="font-title text-lg text-accent mb-4">
                    📝 Contenu Héro (Simulation Storyblok)
                  </h3>
                  <div className="text-left space-y-3 font-body text-primary/80">
                    <p><strong>Titre:</strong> {storyblokContent.hero.title.replace('\n', ' ')}</p>
                    <p><strong>Sous-titre:</strong> {storyblokContent.hero.subtitle}</p>
                    <p><strong>Date:</strong> {storyblokContent.hero.date}</p>
                    <p><strong>CTA:</strong> {storyblokContent.hero.cta}</p>
                  </div>
                </motion.div>

                {/* About Content Demo */}
                <motion.div
                  className="p-8 border border-accent/30 bg-accent/5"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <h3 className="font-title text-lg text-accent mb-4">
                    📖 Section À Propos (Simulation Storyblok)
                  </h3>
                  <div className="text-left space-y-3 font-body text-primary/80">
                    <p><strong>Titre:</strong> {storyblokContent.about.title.replace('\n', ' ')}</p>
                    <p><strong>Contenu:</strong> {storyblokContent.about.content.substring(0, 200)}...</p>
                  </div>
                </motion.div>

              </div>

              {/* Next Steps */}
              <motion.div
                className="mt-16 p-8 border border-primary"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h3 className="font-title text-2xl text-primary mb-6">
                  {lang === 'fr' ? 'Prochaines Étapes' : 'Next Steps'}
                </h3>
                <div className="grid sm:grid-cols-3 gap-4 text-left font-body text-sm text-primary/80">
                  <div>
                    <strong className="text-accent">1. Finaliser les composants</strong><br />
                    - Terminer HeroSection<br />
                    - Créer les autres sections<br />
                    - Tests d&apos;intégration
                  </div>
                  <div>
                    <strong className="text-accent">2. Configurer Storyblok</strong><br />
                    - Créer l&apos;espace Storyblok<br />
                    - Définir les schémas<br />
                    - Paramétrer l&apos;éditeur
                  </div>
                  <div>
                    <strong className="text-accent">3. Migrer le contenu</strong><br />
                    - Importer le contenu existant<br />
                    - Tester les traductions<br />
                    - Formation utilisateur
                  </div>
                </div>
              </motion.div>

            </div>
          </Frame>
        </section>
      </main>
    </ErrorBoundary>
  );
}