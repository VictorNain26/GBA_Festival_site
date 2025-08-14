import { memo, useCallback } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';

/**
 * Simple vertical navigation with text-only clickable words on the right side.
 * Clean and minimal design integrated into the page layout.
 */
function SimpleVerticalNavigation({ labels, lang, setLang }) {
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
  const changeLang = useCallback((l) => {
    if (l !== lang) setLang(l);
  }, [lang, setLang]);

  return (
    <nav 
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4 text-right"
      role="navigation"
      aria-label="Site navigation"
    >
      {/* Navigation items */}
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`text-lg md:text-xl font-medium transition-colors hover:text-accent ${
            activeSection === item.id 
              ? 'text-accent' 
              : 'text-primary'
          }`}
        >
          {item.label}
        </a>
      ))}

      {/* Language selector */}
      <div className="flex flex-col space-y-2 pt-4 mt-4 border-t border-primary/20">
        <button
          onClick={() => changeLang('fr')}
          className={`text-base md:text-lg font-medium transition-colors hover:text-accent ${
            lang === 'fr' ? 'text-accent' : 'text-primary'
          }`}
          aria-label="Switch to French"
        >
          FR
        </button>
        <button
          onClick={() => changeLang('en')}
          className={`text-base md:text-lg font-medium transition-colors hover:text-accent ${
            lang === 'en' ? 'text-accent' : 'text-primary'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>
    </nav>
  );
}

export default memo(SimpleVerticalNavigation);