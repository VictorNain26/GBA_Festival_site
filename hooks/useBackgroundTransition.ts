import { useState, useEffect } from 'react';
import type { UseBackgroundTransitionReturn } from '@/types';

/**
 * Hook for background transitions between first_background and ornaments
 * - Robust breakpoint detection with proper hydration handling
 * - Clean transitions at specific scroll points
 * - Prevents flash between desktop/mobile layouts
 */
export function useBackgroundTransition(): UseBackgroundTransitionReturn {
  const [scrollY, setScrollY] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => setScrollY(window.scrollY);
    
    const handleResize = (): void => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    
    // Initialize immediately
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
    setScrollY(window.scrollY);
    setIsHydrated(true);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate transition states - simplified logic
  const getTransitionState = (): UseBackgroundTransitionReturn => {
    // Server-side rendering or before hydration: safe defaults
    if (typeof window === 'undefined' || !isHydrated) {
      return {
        showFirstBackground: true,
        showOrnaments: false,
        showNavigation: false,
        scrollY: 0,
        windowHeight: 0,
        isCompactMode: false // Always false during SSR to match server rendering
      };
    }

    // Detect compact mode based on screen width (mobile and tablet)
    // Using Tailwind's lg breakpoint (1024px) as threshold
    const isCompactMode = windowWidth < 1024;

    // Robust section detection
    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');
    
    // Fallback if sections not found
    if (!aboutSection) {
      return {
        showFirstBackground: true,
        showOrnaments: false,
        showNavigation: false,
        scrollY,
        windowHeight,
        isCompactMode
      };
    }

    // Calculate transition points
    const aboutRect = aboutSection.getBoundingClientRect();
    const aboutTop = aboutRect.top + scrollY;
    const switchPoint = aboutTop - windowHeight + 150;
    
    let contactStart = windowHeight * 5.5;
    if (contactSection) {
      const contactRect = contactSection.getBoundingClientRect();
      contactStart = contactRect.top + scrollY;
    }

    // Simple, clear logic
    if (scrollY >= contactStart) {
      // Contact section: show first_background
      return {
        showFirstBackground: true,
        showOrnaments: false,
        showNavigation: false,
        scrollY,
        windowHeight,
        isCompactMode
      };
    } else if (scrollY >= switchPoint) {
      // Middle sections: show ornaments
      return {
        showFirstBackground: false,
        showOrnaments: true,
        showNavigation: true,
        scrollY,
        windowHeight,
        isCompactMode
      };
    } else {
      // Hero section: show first_background
      return {
        showFirstBackground: true,
        showOrnaments: false,
        showNavigation: false,
        scrollY,
        windowHeight,
        isCompactMode
      };
    }
  };

  return getTransitionState();
}