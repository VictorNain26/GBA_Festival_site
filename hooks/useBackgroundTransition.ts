import { useState, useEffect } from 'react';
import type { UseBackgroundTransitionReturn } from '@/types';

/**
 * Hook for background transitions between first_background and ornaments
 * - first_background visible during hero section
 * - ornaments appear when "À propos" title becomes visible
 * - clean transitions at specific scroll points (no gradual fade)
 */
export function useBackgroundTransition(): UseBackgroundTransitionReturn {
  const [scrollY, setScrollY] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => setScrollY(window.scrollY);
    const handleResize = (): void => setWindowHeight(window.innerHeight);
    
    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate transition states
  const getTransitionState = (): UseBackgroundTransitionReturn => {
    if (typeof window === 'undefined' || windowHeight === 0) {
      return {
        showFirstBackground: true,
        showOrnaments: false,
        showNavigation: false,
        scrollY: 0,
        windowHeight: 0
      };
    }

    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');
    
    if (!aboutSection) {
      return {
        showFirstBackground: true,
        showOrnaments: false,
        showNavigation: false,
        scrollY,
        windowHeight
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