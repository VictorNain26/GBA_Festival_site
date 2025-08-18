/**
 * Page de démonstration complète Storyblok
 * Affiche le contenu structuré selon nos composants
 */

import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import type { Language, NavigationLabels } from '@/types';

// Import des composants Storyblok
import HeroSection from '@/components/storyblok/HeroSection';

// Components existants
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import ProgressiveBackground from '@/components/ProgressiveBackground';
import useBrowserLanguage from '@/hooks/useBrowserLanguage';

// Navigation labels pour cette démo
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

interface StoryblokFullDemoProps {
  storyData: any;
}

export default function StoryblokFullDemo({ storyData }: StoryblokFullDemoProps) {
  const browserLang = useBrowserLanguage();
  const [currentLang, setCurrentLang] = useState<Language>(browserLang);


  const sections = storyData.content.body;

  return (
    <>
      <Head>
        <title>
          {currentLang === 'fr' 
            ? 'Florilège de l\'Art Déco - Démonstration Storyblok' 
            : 'Florilège of Art Deco - Storyblok Demo'
          }
        </title>
        <meta 
          name="description" 
          content={
            currentLang === 'fr'
              ? 'Festival Art Déco et Neo Art Déco - Démonstration de l\'intégration Storyblok'
              : 'Art Deco and Neo Art Deco Festival - Storyblok Integration Demo'
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
        
        {/* Badge Storyblok Demo */}
        <motion.div
          className="fixed top-4 right-4 z-50 bg-accent text-background px-3 py-2 font-title text-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          STORYBLOK DEMO
        </motion.div>

        {/* Sections Storyblok */}
        {sections?.map((section: any) => {
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
            case 'partners-section':
            case 'on-the-way-section':
            case 'deco-ball-section':
            case 'contact-section':
              return (
                <div key={section._uid} className="p-16 text-center">
                  <div className="max-w-4xl mx-auto border-2 border-primary/30 bg-primary/5 p-8">
                    <h2 className="font-title text-2xl text-primary mb-4">
                      {section.component.toUpperCase()}
                    </h2>
                    <p className="font-body text-primary/80">
                      {currentLang === 'fr' 
                        ? 'Section en développement - Structure Storyblok prête'
                        : 'Section in development - Storyblok structure ready'
                      }
                    </p>
                  </div>
                </div>
              );
            default:
              return (
                <div key={section._uid} className="p-8 text-center text-primary">
                  <p>Composant non reconnu: {section.component}</p>
                </div>
              );
          }
        })}

        {/* Footer de démo */}
        <footer className="py-8 px-4 text-center text-primary border-t border-primary/20">
          <motion.p
            className="text-sm opacity-80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {currentLang === 'fr' 
              ? 'Démonstration de l\'intégration Storyblok - Contenu entièrement géré par CMS'
              : 'Storyblok Integration Demo - Content fully managed by CMS'
            }
          </motion.p>
        </footer>

      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Pour cette démo, nous chargeons le contenu depuis notre fichier JSON local
  // En production, ceci serait remplacé par un appel à l'API Storyblok
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'storyblok-content', 'festival-homepage.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const storyData = JSON.parse(fileContents);

    return {
      props: {
        storyData,
      },
      revalidate: 60, // Revalidation toutes les minutes
    };
  } catch (error) {
    console.error('Erreur lors du chargement des données Storyblok:', error);
    
    // Fallback avec structure vide
    return {
      props: {
        storyData: {
          content: {
            component: 'festival-page',
            body: []
          }
        },
      },
    };
  }
};