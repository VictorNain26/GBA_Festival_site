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
  const [isCompactMode, setIsCompactMode] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => setScrollY(window.scrollY);
    
    const handleResize = (): void => {
      setWindowHeight(window.innerHeight);
      checkCompactMode();
    };

    const checkCompactMode = () => {
      if (typeof window === 'undefined') return;

      const { innerWidth: width, innerHeight: height } = window;
      
      // Logique simplifiée et professionnelle basée sur les standards 2024
      // Compact mode: Mobile + petites tablettes + écrans trop courts
      const shouldUseCompactMode = 
        width < 1024 ||   // En dessous du breakpoint laptop (mobile + tablettes)
        height < 700;     // Écrans trop courts (landscape mobiles, netbooks)

      setIsCompactMode(shouldUseCompactMode);
    };
    
    // Initial setup
    handleResize();
    checkCompactMode();
    setIsHydrated(true); // Mark as hydrated after first setup
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', checkCompactMode);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', checkCompactMode);
    };
  }, []);

  // Calculate transition states
  const getTransitionState = (): UseBackgroundTransitionReturn => {
    if (typeof window === 'undefined') {
      // Server-side: neutral state
      return {
        showFirstBackground: false,
        showOrnaments: true,
        showNavigation: false,
        scrollY: 0,
        windowHeight: 0,
        isCompactMode: false
      };
    }

    if (!isHydrated) {
      // Client-side before hydration complete
      return {
        showFirstBackground: false,
        showOrnaments: true,
        showNavigation: false,
        scrollY: 0,
        windowHeight: 0,
        isCompactMode: false
      };
    }

    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');
    
    if (!aboutSection) {
      return {
        showFirstBackground: !isCompactMode,
        showOrnaments: isCompactMode,
        showNavigation: false,
        scrollY,
        windowHeight,
        isCompactMode
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

    // Logique étendue avec support du mode compact
    let showFirstBackground = true;
    let showOrnaments = false;
    let showNavigation = false;

    if (scrollY >= contactStart) {
      // Contact section: first_background (sauf si compact mode)
      showFirstBackground = !isCompactMode;
      showOrnaments = isCompactMode;
      showNavigation = false;
    } else if (scrollY >= switchPoint) {
      // Section À propos et suivantes: ornements
      showFirstBackground = false;
      showOrnaments = true;
      showNavigation = true;
    } else {
      // Hero section: conditionally show background based on compact mode
      if (isCompactMode) {
        // Mode compact: ornements au lieu du first_background
        showFirstBackground = false;
        showOrnaments = true;
        showNavigation = false;
      } else {
        // Mode normal: first_background
        showFirstBackground = true;
        showOrnaments = false;
        showNavigation = false;
      }
    }

    return {
      showFirstBackground,
      showOrnaments,
      showNavigation,
      scrollY,
      windowHeight,
      isCompactMode
    };
  };

  return getTransitionState();
}