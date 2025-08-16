import { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useActiveSection } from '@/hooks/useActiveSection';
import type { ResponsiveNavigationProps, Language } from '@/types';

/**
 * Vertical navigation sidebar fixed on the right side of the screen.
 * Contains navigation links and language selector arranged vertically.
 */
function VerticalNavigation({ labels, lang, setLang }: ResponsiveNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const activeSection = useActiveSection();

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
  const changeLang = useCallback((l: Language) => {
    if (l !== lang) {
      setLang(l);
    }
    setIsExpanded(false);
  }, [lang, setLang]);

  return (
    <>
      {/* Backdrop overlay for mobile when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
      
      {/* Vertical Navigation */}
      <nav 
        className="fixed right-0 top-0 h-full z-50 bg-black/90 backdrop-blur-md border-l border-primary"
        aria-label="Site navigation"
      >
        {/* Toggle button for mobile */}
        <button
          className="lg:hidden absolute -left-12 top-4 w-12 h-12 bg-black/90 backdrop-blur-md border border-primary rounded-l-lg flex items-center justify-center text-primary hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label={isExpanded ? 'Close menu' : 'Open menu'}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Menu icon */}
          <div className="flex flex-col space-y-1">
            <span className={`block w-4 h-0.5 bg-current transition-transform ${isExpanded ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-4 h-0.5 bg-current transition-opacity ${isExpanded ? 'opacity-0' : ''}`}></span>
            <span className={`block w-4 h-0.5 bg-current transition-transform ${isExpanded ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>

        {/* Navigation content */}
        <motion.div 
          className={`h-full w-16 lg:w-20 ${isExpanded ? 'lg:w-48' : 'lg:hover:w-48'} transition-all duration-300 ease-in-out flex flex-col items-center py-8 px-2`}
          initial={false}
          animate={{ 
            width: isExpanded ? '12rem' : '4rem'
          } as any}
          whileHover={{ width: '12rem' }}
          transition={prefersReducedMotion ? { duration: 0.1 } : { duration: 0.3 }}
        >
          {/* Navigation items */}
          <div className="flex flex-col space-y-6 mb-8 w-full">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`group flex items-center py-2 px-2 transition-colors ${
                  activeSection === item.id 
                    ? 'text-accent' 
                    : 'text-primary hover:text-accent'
                }`}
                onClick={() => setIsExpanded(false)}
                whileHover={{ x: 4 }}
                transition={prefersReducedMotion ? { duration: 0.1 } : { duration: 0.2 }}
              >
                {/* Navigation dot/indicator */}
                <div className={`w-2 h-2 rounded-full transition-all flex-shrink-0 ${
                  activeSection === item.id 
                    ? 'bg-accent scale-125' 
                    : 'bg-current opacity-60 group-hover:opacity-100'
                }`}></div>
                
                {/* Navigation label */}
                <span className={`ml-4 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  isExpanded || 'lg:group-hover:opacity-100 lg:opacity-0 lg:translate-x-2 lg:group-hover:translate-x-0'
                }`}>
                  {item.label}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Language selector */}
          <div className="flex flex-col items-center space-y-3 mt-auto">
            <div className="w-8 h-px bg-primary/30"></div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => changeLang('fr')}
                className={`px-2 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded ${
                  lang === 'fr' ? 'text-accent bg-accent/10' : 'text-primary hover:text-accent'
                }`}
                aria-label="Switch to French"
                aria-pressed={lang === 'fr'}
              >
                FR
              </button>
              <button
                onClick={() => changeLang('en')}
                className={`px-2 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded ${
                  lang === 'en' ? 'text-accent bg-accent/10' : 'text-primary hover:text-accent'
                }`}
                aria-label="Switch to English"
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
            </div>
          </div>
        </motion.div>
      </nav>
    </>
  );
}

export default memo(VerticalNavigation);
