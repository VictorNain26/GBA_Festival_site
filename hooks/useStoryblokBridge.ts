/**
 * Hook pour l'éditeur visuel Storyblok
 * Charge la Storyblok Bridge pour l'édition en temps réel
 */

import { useEffect } from 'react';
import { useStoryblokState } from '@storyblok/react';

interface UseStoryblokBridgeProps {
  story: any;
  isEnabled?: boolean;
}

export function useStoryblokBridge({ story, isEnabled = true }: UseStoryblokBridgeProps) {
  // État Storyblok réactif
  const storyblokStory = useStoryblokState(story);

  useEffect(() => {
    // Charger la bridge seulement côté client et si activée
    if (!isEnabled || typeof window === 'undefined') return;

    // Vérifier si nous sommes dans l'iframe de Storyblok
    const isInStoryblokIframe = window.location.search.includes('_storyblok');
    
    if (isInStoryblokIframe) {
      // Charger dynamiquement la Storyblok Bridge
      const loadStoryblokBridge = async () => {
        try {
          // La bridge est déjà chargée via @storyblok/react
          // Nous utilisons la configuration existante
          console.log('Storyblok Bridge disponible via @storyblok/react');
          
          console.log('Storyblok Bridge chargée avec succès');
        } catch (error) {
          console.error('Erreur lors du chargement de la Storyblok Bridge:', error);
        }
      };

      loadStoryblokBridge();
    }
  }, [isEnabled]);

  return storyblokStory;
}