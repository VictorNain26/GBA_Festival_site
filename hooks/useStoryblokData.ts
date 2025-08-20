/**
 * Hook personnalisé pour la gestion des données Storyblok
 * SRP : Responsabilité unique de fournir l'interface de données Storyblok
 * DIP : Interface abstraite indépendante de l'implémentation Storyblok
 */

import { useMemo } from 'react';
import type { StoryblokStory } from '@/lib/storyblok-api';
import { createStoryblokService, type StoryblokDataService } from '@/services/storyblokService';

interface UseStoryblokDataProps {
  story: StoryblokStory | null;
  hasStoryblokData: boolean;
}

interface UseStoryblokDataReturn extends StoryblokDataService {
  story: StoryblokStory | null;
  hasStoryblokData: boolean;
}

/**
 * Hook pour l'accès aux données Storyblok avec cache et optimisation
 * Utilise useMemo pour éviter la recréation du service à chaque render
 */
export function useStoryblokData({ 
  story, 
  hasStoryblokData 
}: UseStoryblokDataProps): UseStoryblokDataReturn {
  
  // Mémoisation du service pour éviter les recréations inutiles
  const storyblokService = useMemo(
    () => createStoryblokService(story, hasStoryblokData),
    [story, hasStoryblokData]
  );
  
  return {
    story,
    hasStoryblokData,
    getSimpleText: storyblokService.getSimpleText.bind(storyblokService),
    getSectionData: storyblokService.getSectionData.bind(storyblokService),
    getSectionRichText: storyblokService.getSectionRichText.bind(storyblokService),
  };
}