import { useState, useEffect } from 'react';

/**
 * Hook to track scroll state and determine when ornaments should be visible
 * Synchronizes with About section visibility for precise transitions
 */
export function useScrollState() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [showOrnaments, setShowOrnaments] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);
    
    // Initial setup
    handleResize();
    handleScroll();

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Find the about section element for precise timing
    const aboutSection = document.getElementById('about');
    
    if (aboutSection && windowHeight > 0) {
      // Get the position of the about section
      const aboutRect = aboutSection.getBoundingClientRect();
      const aboutTop = aboutRect.top + scrollY;
      
      // Contact section calculation
      const contactSection = document.getElementById('contact');
      let contactStart = windowHeight * 5.5; // fallback
      
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        contactStart = contactRect.top + scrollY;
      }
      
      // Show ornaments when about section title appears at the bottom of viewport
      const triggerPoint = aboutTop - windowHeight;
      
      // Show ornaments and navigation starting when About section becomes visible
      const shouldShowOrnaments = scrollY >= triggerPoint && scrollY < contactStart;
      const shouldShowNavigation = scrollY >= triggerPoint && scrollY < contactStart;
      
      setShowOrnaments(shouldShowOrnaments);
      setShowNavigation(shouldShowNavigation);
    }
  }, [scrollY, windowHeight]);

  return {
    scrollY,
    windowHeight,
    showOrnaments,
    showNavigation,
    // Helper function to check if we should show first background
    showFirstBackground: (scrollY, windowHeight) => {
      // Server-side rendering protection
      if (typeof window === 'undefined') return true;
      
      const aboutSection = document.getElementById('about');
      const contactSection = document.getElementById('contact');
      
      if (!aboutSection) return true; // fallback to show first background
      
      const aboutRect = aboutSection.getBoundingClientRect();
      const aboutTop = aboutRect.top + scrollY;
      const triggerPoint = aboutTop - windowHeight;
      
      let contactStart = windowHeight * 5.5;
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        contactStart = contactRect.top + scrollY;
      }
      
      // Show first background in hero section and contact section
      return scrollY < triggerPoint || scrollY >= contactStart;
    }
  };
}