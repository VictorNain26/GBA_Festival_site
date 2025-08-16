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
    
    // Prevent initial scroll position jump on page load
    const initializeAfterLoad = (): void => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
      // Don't set scrollY immediately - let it stay at natural position
      setScrollY(window.scrollY);
      setIsHydrated(true);
    };
    
    // Use a small delay to ensure DOM is fully loaded
    if (document.readyState === 'complete') {
      initializeAfterLoad();
    } else {
      window.addEventListener('load', initializeAfterLoad);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', initializeAfterLoad);
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

    // Calculate transition points - adjusted for very small screens
    const aboutRect = aboutSection.getBoundingClientRect();
    const aboutTop = aboutRect.top + scrollY;
    
    // Adjust switch point based on Tailwind breakpoints
    let switchPointOffset = 150;
    if (windowWidth < 480) { // xs breakpoint
      switchPointOffset = 100; // Less aggressive transition on very small screens
    } else if (windowWidth < 768) { // sm breakpoint  
      switchPointOffset = 125; // Medium offset for mobile
    }
    
    const switchPoint = aboutTop - windowHeight + switchPointOffset;
    
    let contactStart = windowHeight * 5.5;
    if (contactSection) {
      const contactRect = contactSection.getBoundingClientRect();
      contactStart = contactRect.top + scrollY - (windowHeight * 0.1); // Start transition slightly earlier
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