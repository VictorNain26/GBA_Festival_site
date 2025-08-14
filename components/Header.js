import { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Responsive sticky header with a language toggle and smooth
 * scrolling navigation. On small screens a hamburger button
 * reveals the menu. On larger screens the links are displayed
 * inline. The header uses Tailwind CSS utilities and the
 * imported fonts for a cohesive look. The parent passes in
 * the current language labels and a setter for the language.
 */
function Header({ labels, lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Build an array of navigation items from the labels prop. The
  // order of the keys defines the order in the menu. Each item
  // corresponds to a section ID on the page.
  const navItems = [
    { id: 'hero', label: labels.hero },
    { id: 'about', label: labels.about },
    { id: 'partners', label: labels.partners },
    { id: 'ontheway', label: labels.ontheway },
    { id: 'decoball', label: labels.decoball },
    { id: 'gallery', label: labels.gallery },
    { id: 'contact', label: labels.contact },
  ];

  // Handler to switch between French and English. We deliberately
  // avoid toggling if the user clicks the active language to
  // prevent unnecessary re‑renders.
  const changeLang = useCallback((l) => {
    if (l !== lang) setLang(l);
    setMenuOpen(false);
  }, [lang, setLang]);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-primary"
      role="banner"
      aria-label="Site navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        {/* Logo or festival name stub */}
        <a 
          href="#hero" 
          className="font-title text-2xl md:text-3xl text-accent"
          aria-label="Florilège de l'Art Déco - Return to top"
        >
          Florilège
        </a>
        {/* Desktop navigation */}
        <nav 
          className="hidden md:flex gap-6 lg:gap-8 items-center"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-primary hover:text-accent transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-2" role="group" aria-label="Language selection">
            <button
              onClick={() => changeLang('fr')}
              className={`px-2 py-1 ${lang === 'fr' ? 'text-accent' : 'text-primary'} hover:text-accent transition-colors`}
              aria-label="Switch to French"
              aria-pressed={lang === 'fr'}
            >
              FR
            </button>
            <span className="text-primary">|</span>
            <button
              onClick={() => changeLang('en')}
              className={`px-2 py-1 ${lang === 'en' ? 'text-accent' : 'text-primary'} hover:text-accent transition-colors`}
              aria-label="Switch to English"
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>
        </nav>
        {/* Mobile hamburger */}
        <button
          className="md:hidden text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {/* Simple hamburger icon */}
          <span className="block w-6 h-0.5 bg-primary mb-1"></span>
          <span className="block w-6 h-0.5 bg-primary mb-1"></span>
          <span className="block w-6 h-0.5 bg-primary"></span>
        </button>
      </div>
      {/* Mobile nav overlay */}
      {menuOpen && (
        <motion.nav
          id="mobile-navigation"
          initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0.1 } : { duration: 0.3 }}
          className="md:hidden bg-black/90 backdrop-blur-md border-b border-primary"
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col items-center py-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="w-full text-center py-2 text-primary hover:text-accent transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-2 mt-4" role="group" aria-label="Language selection">
              <button
                onClick={() => changeLang('fr')}
                className={`px-3 py-1 ${lang === 'fr' ? 'text-accent' : 'text-primary'} hover:text-accent transition-colors focus:ring-2 focus:ring-accent`}
                aria-label="Switch to French"
                aria-pressed={lang === 'fr'}
              >
                FR
              </button>
              <span className="text-primary">|</span>
              <button
                onClick={() => changeLang('en')}
                className={`px-3 py-1 ${lang === 'en' ? 'text-accent' : 'text-primary'} hover:text-accent transition-colors focus:ring-2 focus:ring-accent`}
                aria-label="Switch to English"
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
            </div>
          </div>
        </motion.nav>
      )}
    </header>
  );
}

export default memo(Header);