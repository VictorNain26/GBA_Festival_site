import { memo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '@/hooks/useActiveSection';

/**
 * Responsive navigation that adapts to mobile and desktop screens.
 * Mobile: Compact toggle menu, Desktop: Vertical sidebar.
 */
function ResponsiveNavigation({ labels, lang, setLang }) {
  const activeSection = useActiveSection();
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

  const handleNavClick = () => {
    setIsOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile */}
      <nav 
        className="hidden md:fixed md:right-4 lg:right-8 md:top-1/2 md:transform md:-translate-y-1/2 md:z-50 md:flex md:flex-col md:space-y-3 lg:space-y-4 md:text-right"
        role="navigation"
        aria-label="Desktop site navigation"
      >
        {/* Desktop Navigation items */}
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`text-base lg:text-lg xl:text-xl font-medium transition-colors hover:text-accent ${
              activeSection === item.id 
                ? 'text-accent' 
                : 'text-primary'
            }`}
          >
            {item.label}
          </a>
        ))}

        {/* Desktop Language selector */}
        <div className="flex flex-col space-y-2 pt-3 mt-3 border-t border-primary/20">
          <button
            onClick={() => changeLang('fr')}
            className={`text-sm lg:text-base font-medium transition-colors hover:text-accent ${
              lang === 'fr' ? 'text-accent' : 'text-primary'
            }`}
            aria-label="Switch to French"
          >
            FR
          </button>
          <button
            onClick={() => changeLang('en')}
            className={`text-sm lg:text-base font-medium transition-colors hover:text-accent ${
              lang === 'en' ? 'text-accent' : 'text-primary'
            }`}
            aria-label="Switch to English"
          >
            EN
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 right-6 z-50 w-12 h-12 bg-black/90 backdrop-blur-md border border-primary/30 rounded-full flex items-center justify-center text-primary hover:text-accent transition-colors"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-5 h-5"
        >
          <span className={`absolute inset-x-0 top-2 h-0.5 bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className="absolute inset-x-0 top-1/2 -mt-px h-0.5 bg-current"></span>
          <span className={`absolute inset-x-0 bottom-2 h-0.5 bg-current transition-transform ${isOpen ? 'rotate-90' : ''}`}></span>
        </motion.div>
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
            
            {/* Mobile Menu */}
            <motion.nav
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="md:hidden fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-md border-l border-primary/30 z-45 flex flex-col justify-center px-8"
              role="navigation"
              aria-label="Mobile site navigation"
            >
              {/* Mobile Navigation items */}
              <div className="flex flex-col space-y-6 text-right">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={handleNavClick}
                    className={`text-xl font-medium transition-colors hover:text-accent ${
                      activeSection === item.id 
                        ? 'text-accent' 
                        : 'text-primary'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}

                {/* Mobile Language selector */}
                <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-primary/20">
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