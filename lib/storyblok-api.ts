/**
 * Utilitaires pour l'API Storyblok
 * Fonctions pour récupérer le contenu en mode SSG et SSR
 */

import { getStoryblokApi } from '@storyblok/react';

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
  try {
    const storyblokApi = getStoryblokApi();
    
    if (!storyblokApi) {
      console.error('Storyblok API not initialized. Check your configuration.');
      return null;
    }

    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version,
      resolve_relations: [],
    });

    return data.story || null;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'histoire "${slug}":`, error);
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
    const storyblokApi = getStoryblokApi();
    
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