/**
 * Function to detect browser language (client-side only)
 * Returns 'fr' if browser language is French, otherwise 'en'
 */
export function detectBrowserLanguage() {
  // Only run on client side
  if (typeof window === 'undefined') {
    return 'en'; // Server-side fallback
  }
  
  // Get browser language
  const browserLanguage = navigator.language || navigator.userLanguage;
  
  // Check if browser language starts with 'fr' (handles fr, fr-FR, fr-CA, etc.)
  const isFrench = browserLanguage && browserLanguage.toLowerCase().startsWith('fr');
  
  return isFrench ? 'fr' : 'en';
}