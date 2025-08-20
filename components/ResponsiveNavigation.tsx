import { memo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useBackgroundTransition } from '@/hooks/useBackgroundTransition';
import { PRESET_CLASSES } from '@/constants/designTokens';
import type { ResponsiveNavigationProps, Language } from '@/types';

/**
 * Responsive navigation that adapts to mobile and desktop screens.
 * Mobile: Compact toggle menu, Desktop: Vertical sidebar.
 */
function ResponsiveNavigation({ labels, lang, setLang, isCompactMode }: ResponsiveNavigationProps) {
  const activeSection = useActiveSection();
  const { showNavigation } = useBackgroundTransition();
  const [isOpen, setIsOpen] = useState(false);

  // Build an array of navigation items from the labels prop
  const navItems = [
    { id: 'hero', label: labels.hero },
    { id: 'about', label: labels.about },
    { id: 'partners', label: labels.partners },
    { id: 'on-the-way', label: labels['on-the-way'] },
    { id: 'decoball', label: labels.decoball },
    { id: 'contact', label: labels.contact },
  ];

  // Special tickets item that links to contact section
  const ticketsItem = { id: 'contact', label: labels.tickets, isTickets: true };

  // Handler to switch between French and English
  const changeLang = useCallback((l: Language) => {
    if (l !== lang) {
      setLang(l);
    }
    setIsOpen(false); // Close mobile menu after language change
  }, [lang, setLang]);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
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
      {/* Desktop Navigation - Plus compact et discret */}
      <nav 
        className={`hidden lg:block fixed top-1/2 right-2 xl:right-4 z-50 -translate-y-1/2 transition-all duration-700 ease-out ${
          showNavigation && !isCompactMode
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
        aria-label="Desktop site navigation"
        style={{ maxWidth: 'calc(100vw - 1rem)' }}
      >
        <div className="flex flex-col space-y-3 text-right bg-black/70 backdrop-blur-sm rounded-lg py-4 px-4 shadow-lg">
          {/* Navigation Items */}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`text-sm font-title transition-colors hover:text-accent cursor-pointer text-right ${
                activeSection === item.id 
                  ? 'text-accent' 
                  : 'text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Tickets Button */}
          <motion.button
            onClick={(e) => handleNavClick(e, ticketsItem.id)}
            className="px-3 py-2 mt-3 text-xs font-title uppercase tracking-wider transition-all duration-300 bg-accent text-background hover:bg-accent/80 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {ticketsItem.label}
          </motion.button>

          {/* Language Selector */}
          <div className="flex flex-row space-x-2 justify-end pt-3 mt-3">
            <button
              onClick={() => changeLang('fr')}
              className={`text-sm font-title transition-colors hover:text-accent cursor-pointer text-right ${
                lang === 'fr' ? 'text-accent' : 'text-primary'
              }`}
              aria-label="Switch to French"
            >
              FR
            </button>
            <button
              onClick={() => changeLang('en')}
              className={`text-sm font-title transition-colors hover:text-accent cursor-pointer text-right ${
                lang === 'en' ? 'text-accent' : 'text-primary'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Toggle Button - Simple Square */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed right-4 top-20 xs:top-20 sm:top-24 z-[45] w-12 h-12 bg-black/60 backdrop-blur-sm border border-primary/30 flex items-center justify-center text-primary hover:text-accent transition-colors duration-300"
        style={{
          display: isOpen ? 'none' : 'flex'
        }}
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ 
          opacity: showNavigation && isCompactMode ? 1 : 0,
          x: showNavigation && isCompactMode ? 0 : 100,
          scale: showNavigation && isCompactMode ? 1 : 0.8
        }}
        transition={{ 
          duration: 0.5, 
          ease: 'easeOut',
          delay: showNavigation && isCompactMode ? 0.3 : 0
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open menu"
        aria-expanded={false}
      >
        {/* Hamburger icon - 3 lines */}
        <div className="w-6 h-4 flex flex-col justify-between">
          <div className="w-full h-0.5 bg-current" />
          <div className="w-full h-0.5 bg-current" />
          <div className="w-full h-0.5 bg-current" />
        </div>
      </motion.button>

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
              className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[50]"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Menu - Positionnement CSS propre avec animation translateX */}
            <motion.nav
              initial={{ opacity: 0, translateX: '100%' }}
              animate={{ opacity: 1, translateX: '0%' }}
              exit={{ opacity: 0, translateX: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="lg:hidden fixed top-0 right-0 h-full w-64 sm:w-72 md:w-80 bg-black/90 backdrop-blur-md border-l border-primary/20 z-[50] flex flex-col justify-center px-8"
              style={{ maxWidth: '100vw' }}
              aria-label="Mobile site navigation"
            >
              {/* Close Button - Simple Square */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm border border-accent/30 flex items-center justify-center text-accent hover:text-primary transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                transition={{ duration: 0.5, delay: 0.3, ease: 'backOut' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close menu"
              >
                {/* X icon */}
                <div className="relative w-6 h-6">
                  <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
                  <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 -rotate-45" />
                </div>
              </motion.button>
              {/* Mobile Navigation items */}
              <div className="flex flex-col space-y-6 text-right">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`${PRESET_CLASSES.navigationLink} ${
                      activeSection === item.id 
                        ? 'text-accent' 
                        : 'text-primary'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Mobile Tickets Button */}
                <motion.button
                  onClick={(e) => handleNavClick(e, ticketsItem.id)}
                  className="px-6 py-3 mt-6 text-sm font-title uppercase tracking-wider transition-all duration-300 bg-accent text-background hover:bg-accent/80 text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {ticketsItem.label}
                </motion.button>

                {/* Mobile Language selector */}
                <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-primary/20">
                  <button
                    onClick={() => changeLang('fr')}
                    className={`${PRESET_CLASSES.navigationLink} ${
                      lang === 'fr' ? 'text-accent' : 'text-primary'
                    }`}
                    aria-label="Switch to French"
                  >
                    FR
                  </button>
                  <button
                    onClick={() => changeLang('en')}
                    className={`${PRESET_CLASSES.navigationLink} ${
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
