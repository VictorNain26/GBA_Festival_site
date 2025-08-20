/**
 * Utilitaires pour l'API Storyblok
 * Fonctions pour récupérer le contenu en mode SSG et SSR
 */

import { storyblokApi } from './storyblok';
import { apiLogger, securityLogger } from '@/utils/logger';

export interface StoryblokStory {
  content: any;
  created_at: string;
  published_at: string;
  id: number;
  uuid: string;
  name: string;
  slug: string;
  full_slug: string;
  default_full_slug: string;
  sort_by_date: string | null;
  position: number;
  tag_list: string[];
  is_startpage: boolean;
  parent_id: number | null;
  meta_data: any;
  group_id: string;
  first_published_at: string;
  release_id: number | null;
  lang: string;
  path: string | null;
  alternates: any[];
  translated_slugs: any[];
}

export interface StoryblokApiResponse {
  story: StoryblokStory;
  cv?: number;
  rels?: any[];
}

/**
 * Récupère une histoire Storyblok (pour SSG/SSR)
 */
export async function getStoryblokStory(
  slug: string = 'festival-homepage',
  version: 'draft' | 'published' = 'published'
): Promise<StoryblokStory | null> {
  const startTime = performance.now();
  
  try {
    if (!storyblokApi) {
      apiLogger.error(`cdn/stories/${slug}`, new Error('Storyblok API not initialized'), {
        version,
        configuration_missing: true
      });
      return null;
    }

    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version,
      resolve_relations: [],
    });

    // Log successful API call performance
    const duration = performance.now() - startTime;
    if (duration > 1000) { // Log slow API calls
      apiLogger.warn(`cdn/stories/${slug}`, 'Slow API response', {
        duration: `${duration.toFixed(2)}ms`,
        version,
        slug
      });
    }

    return data.story || null;
  } catch (error) {
    const duration = performance.now() - startTime;
    
    if (error instanceof Error) {
      // Check for specific error types
      if (error.message.includes('404')) {
        apiLogger.warn(`cdn/stories/${slug}`, 'Story not found', {
          slug,
          version,
          duration: `${duration.toFixed(2)}ms`
        });
      } else if (error.message.includes('401') || error.message.includes('403')) {
        securityLogger.authFailure('Storyblok API authentication failed', {
          slug,
          version,
          endpoint: `cdn/stories/${slug}`
        });
      } else {
        apiLogger.error(`cdn/stories/${slug}`, error, {
          slug,
          version,
          duration: `${duration.toFixed(2)}ms`
        });
      }
    }
    
    return null;
  }
}

/**
 * Récupère plusieurs histoires Storyblok
 */
export async function getStoryblokStories(
  startsWith: string = '',
  version: 'draft' | 'published' = 'published'
): Promise<StoryblokStory[]> {
  try {
    if (!storyblokApi) {
      console.error('Storyblok API not initialized. Check your configuration.');
      return [];
    }

    const { data } = await storyblokApi.get('cdn/stories', {
      starts_with: startsWith,
      version,
      per_page: 100,
    });

    return data.stories || [];
  } catch (error) {
    console.error(`Erreur lors de la récupération des histoires avec prefix "${startsWith}":`, error);
    return [];
  }
}

/**
 * Récupère une histoire via notre API Route (pour les composants client)
 */
export async function fetchStoryFromApi(slug: string = 'festival-homepage'): Promise<StoryblokApiResponse | null> {
  try {
    const response = await fetch(`/api/storyblok/${slug}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur API:', errorData);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur lors de l'appel API pour "${slug}":`, error);
    return null;
  }
}

/**
 * Vérifie si Storyblok est correctement configuré
 */
export function isStoryblokConfigured(): boolean {
  const token = process.env['NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN'];
  return Boolean(token && token.length > 0);
}

/**
 * Récupère le token Storyblok (pour le debug)
 */
export function getStoryblokToken(): string | undefined {
  return process.env['NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN'];
}

/**
 * Mode de version basé sur l'environnement
 */
export function getStoryblokVersion(): 'draft' | 'published' {
  return process.env.NODE_ENV === 'development' ? 'draft' : 'published';
}