import { useState, useEffect } from 'react';

/**
 * Hook to detect when the "About" section title becomes visible
 * Returns true when the about section title enters the viewport
 */
export function useAboutVisibility() {
  const [showNavigation, setShowNavigation] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

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
    // Find the about section element
    const aboutSection = document.getElementById('about');
    
    if (aboutSection && windowHeight > 0) {
      // Get the position of the about section
      const aboutRect = aboutSection.getBoundingClientRect();
      const aboutTop = aboutRect.top + scrollY;
      
      // Show navigation when about section title is about to appear
      // We check if the top of about section is at the bottom of the viewport
      const triggerPoint = aboutTop - windowHeight;
      
      setShowNavigation(scrollY >= triggerPoint);
    }
  }, [scrollY, windowHeight]);

  return {
    showNavigation,
    scrollY,
    windowHeight
  };
}