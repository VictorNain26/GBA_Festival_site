import { useState, useEffect } from 'react';

/**
 * Hook for background transitions between first_background and ornaments
 * - first_background visible during hero section
 * - ornaments appear when "À propos" title becomes visible
 * - clean transitions at specific scroll points (no gradual fade)
 */
export function useBackgroundTransition() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);
    
    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate transition states
  const getTransitionState = () => {
    if (typeof window === 'undefined' || windowHeight === 0) {
      return {
        firstBackgroundOpacity: 1,
        ornamentsOpacity: 0,
        showNavigation: false
      };
    }

    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');
    
    if (!aboutSection) {
      return {
        firstBackgroundOpacity: 1,
        ornamentsOpacity: 0,
        showNavigation: false
      };
    }

    const aboutRect = aboutSection.getBoundingClientRect();
    const aboutTop = aboutRect.top + scrollY;
    
    // Simple: point de basculement quand le titre "À propos" devient visible
    const switchPoint = aboutTop - windowHeight + 150;
    
    let contactStart = windowHeight * 5.5;
    if (contactSection) {
      const contactRect = contactSection.getBoundingClientRect();
      contactStart = contactRect.top + scrollY;
    }

    // Logique simple et claire - jamais de superposition
    let showFirstBackground = true;
    let showOrnaments = false;
    let showNavigation = false;

    if (scrollY >= contactStart) {
      // Contact section: first_background
      showFirstBackground = true;
      showOrnaments = false;
      showNavigation = false;
    } else if (scrollY >= switchPoint) {
      // Section À propos et suivantes: ornements
      showFirstBackground = false;
      showOrnaments = true;
      showNavigation = true;
    } else {
      // Hero section: first_background
      showFirstBackground = true;
      showOrnaments = false;
      showNavigation = false;
    }

    return {
      showFirstBackground,
      showOrnaments,
      showNavigation,
      scrollY,
      windowHeight
    };
  };

  return getTransitionState();
}