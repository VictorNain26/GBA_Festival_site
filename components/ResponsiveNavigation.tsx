import { memo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useBackgroundTransition } from '@/hooks/useBackgroundTransition';

/**
 * Responsive navigation that adapts to mobile and desktop screens.
 * Mobile: Compact toggle menu, Desktop: Vertical sidebar.
 */
function ResponsiveNavigation({ labels, lang, setLang, isCompactMode }) {
  const activeSection = useActiveSection();
  const { showNavigation, showOrnaments } = useBackgroundTransition();
  const [isOpen, setIsOpen] = useState(false);

  // Build an array of navigation items from the labels prop
  const navItems = [
    { id: 'hero', label: labels.hero },
    { id: 'about', label: labels.about },
    { id: 'partners', label: labels.partners },
    { id: 'ontheway', label: labels.ontheway },
    { id: 'decoball', label: labels.decoball },
    { id: 'gallery', label: labels.gallery },
    { id: 'contact', label: labels.contact },
  ];

  // Handler to switch between French and English
  const changeLang = useCallback((l) => {
    if (l !== lang) setLang(l);
    setIsOpen(false); // Close mobile menu after language change
  }, [lang, setLang]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu after navigation
    
    // Smooth scroll to target without changing URL
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Always render navigation, control visibility with CSS

  return (
    <>
      {/* Desktop Navigation - 100% Tailwind CSS */}
      <nav 
        className={`hidden md:block fixed top-1/2 right-8 z-50 -translate-y-1/2 transition-all duration-700 ease-out ${
          showNavigation && !isCompactMode
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
        aria-label="Desktop site navigation"
      >
        <div className="flex flex-col space-y-4 text-right">
          {/* Navigation Items */}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`text-base lg:text-lg xl:text-xl font-medium transition-colors hover:text-accent cursor-pointer text-right ${
                activeSection === item.id 
                  ? 'text-accent' 
                  : 'text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Language Selector */}
          <div className="flex flex-col space-y-2 pt-4 mt-4 border-t border-primary/20">
            <button
              onClick={() => changeLang('fr')}
              className={`text-sm lg:text-base font-medium transition-colors hover:text-accent text-right ${
                lang === 'fr' ? 'text-accent' : 'text-primary'
              }`}
              aria-label="Switch to French"
            >
              FR
            </button>
            <button
              onClick={() => changeLang('en')}
              className={`text-sm lg:text-base font-medium transition-colors hover:text-accent text-right ${
                lang === 'en' ? 'text-accent' : 'text-primary'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden fixed top-6 left-6 z-50 w-10 h-10 bg-black/80 border border-accent/40 flex items-center justify-center text-primary hover:text-accent transition-all duration-500 ease-out ${
          showNavigation && isCompactMode
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-75 pointer-events-none'
        }`}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <div className="w-5 h-4 flex flex-col justify-between">
          <span
            className={`w-full h-0.5 bg-current transition-transform duration-200 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-full h-0.5 bg-current transition-opacity duration-200 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-full h-0.5 bg-current transition-transform duration-200 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Menu - Simple */}
            <motion.nav
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="md:hidden fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-md border-l border-accent/30 z-40 flex flex-col justify-center px-8"
              aria-label="Mobile site navigation"
            >
              {/* Mobile Navigation items */}
              <div className="flex flex-col space-y-6 text-right">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`text-xl font-medium transition-colors hover:text-accent cursor-pointer ${
                      activeSection === item.id 
                        ? 'text-accent' 
                        : 'text-primary'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Mobile Language selector */}
                <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-accent/20">
                  <button
                    onClick={() => changeLang('fr')}
                    className={`text-lg font-medium transition-colors hover:text-accent ${
                      lang === 'fr' ? 'text-accent' : 'text-primary'
                    }`}
                    aria-label="Switch to French"
                  >
                    FR
                  </button>
                  <button
                    onClick={() => changeLang('en')}
                    className={`text-lg font-medium transition-colors hover:text-accent ${
                      lang === 'en' ? 'text-accent' : 'text-primary'
                    }`}
                    aria-label="Switch to English"
                  >
                    EN
                  </button>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(ResponsiveNavigation);
