import { useState, useEffect } from 'react';
import type { Language } from '@/types';

/**
 * Function to detect browser language (client-side only)
 * Returns 'fr' if browser language is French, otherwise 'en'
 */
export function detectBrowserLanguage(): Language {
  // Only run on client side
  if (typeof window === 'undefined') {
    return 'en'; // Server-side fallback
  }
  
  // Get browser language - handle deprecated userLanguage property for IE
  const browserLanguage = navigator.language || (navigator as { userLanguage?: string }).userLanguage;
  
  // Check if browser language starts with 'fr' (handles fr, fr-FR, fr-CA, etc.)
  const isFrench = browserLanguage && browserLanguage.toLowerCase().startsWith('fr');
  
  return isFrench ? 'fr' : 'en';
}

/**
 * Hook to get browser language with SSR support
 */
export function useBrowserLanguage(): Language {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    setLanguage(detectBrowserLanguage());
  }, []);

  return language;
}

export default useBrowserLanguage;