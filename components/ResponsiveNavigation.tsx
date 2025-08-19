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
    { id: 'ontheway', label: labels.ontheway },
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

          {/* Tickets Button - Art Déco Style Desktop */}
          <motion.button
            onClick={(e) => handleNavClick(e, ticketsItem.id)}
            className="relative px-3 py-2 mt-3 text-xs font-title uppercase tracking-wider transition-all duration-300 bg-transparent text-accent hover:text-background text-center flex items-center justify-center group overflow-hidden"
            style={{
              clipPath: 'polygon(10% 0%, 90% 0%, 100% 30%, 90% 100%, 10% 100%, 0% 70%)',
              background: 'linear-gradient(135deg, rgba(229,91,69,0.1) 0%, transparent 50%, rgba(229,91,69,0.1) 100%)',
              border: '1.5px solid #E55B45',
              boxShadow: '0 0 10px rgba(229, 91, 69, 0.2), inset 0 1px 0 rgba(229, 91, 69, 0.3)'
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 0 20px rgba(229, 91, 69, 0.4), inset 0 1px 0 rgba(229, 91, 69, 0.5)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Fond hover Art Déco */}
            <motion.div
              className="absolute inset-0 bg-accent"
              style={{
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 30%, 90% 100%, 10% 100%, 0% 70%)'
              }}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Détails décoratifs plus petits pour desktop */}
            <span className="absolute left-2 top-1/2 w-0.5 h-0.5 bg-accent rounded-full transform -translate-y-1/2 group-hover:bg-background transition-colors duration-300" />
            <span className="absolute right-2 top-1/2 w-0.5 h-0.5 bg-accent rounded-full transform -translate-y-1/2 group-hover:bg-background transition-colors duration-300" />
            
            <span className="relative z-10">{ticketsItem.label}</span>
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

      {/* Mobile Navigation Toggle Button - Art Déco Design 
          Forme géométrique avec détails dorés caractéristiques */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed right-4 top-20 xs:top-20 sm:top-24 z-[45] w-14 h-14 bg-black/80 backdrop-blur-sm flex items-center justify-center text-primary hover:text-accent transition-all duration-300 group"
        style={{
          display: isOpen ? 'none' : 'flex',
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
          background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(211,170,65,0.1) 50%, rgba(0,0,0,0.9) 100%)',
          border: '1.5px solid #D3AA41',
          boxShadow: '0 0 15px rgba(211, 170, 65, 0.3), inset 0 1px 0 rgba(211, 170, 65, 0.4)'
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
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 0 20px rgba(211, 170, 65, 0.5), inset 0 1px 0 rgba(211, 170, 65, 0.6)'
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open menu"
        aria-expanded={false}
      >
        {/* Hamburger icon Art Déco - Lignes géométriques avec détails dorés */}
        <div className="relative w-7 h-7 flex items-center justify-center">
          <div className="absolute inset-0 flex flex-col justify-center space-y-1.5">
            {/* Ligne supérieure - Courte aux extrémités (style Art Déco) */}
            <motion.div 
              className="relative h-0.5 bg-current group-hover:bg-accent transition-colors duration-300"
              style={{ width: '20px' }}
              initial={{ scaleX: 0.6, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {/* Points dorés aux extrémités */}
              <span className="absolute -left-0.5 top-1/2 w-1 h-1 bg-primary rounded-full transform -translate-y-1/2 group-hover:bg-accent transition-colors duration-300" />
              <span className="absolute -right-0.5 top-1/2 w-1 h-1 bg-primary rounded-full transform -translate-y-1/2 group-hover:bg-accent transition-colors duration-300" />
            </motion.div>
            
            {/* Ligne centrale - Plus longue (hiérarchie Art Déco) */}
            <motion.div 
              className="relative h-0.5 bg-current group-hover:bg-accent transition-colors duration-300"
              style={{ width: '24px' }}
              initial={{ scaleX: 0.4, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              {/* Détail central doré */}
              <span className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 group-hover:bg-accent transition-colors duration-300" />
            </motion.div>
            
            {/* Ligne inférieure - Courte aux extrémités (symétrie Art Déco) */}
            <motion.div 
              className="relative h-0.5 bg-current group-hover:bg-accent transition-colors duration-300"
              style={{ width: '20px' }}
              initial={{ scaleX: 0.6, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              {/* Points dorés aux extrémités */}
              <span className="absolute -left-0.5 top-1/2 w-1 h-1 bg-primary rounded-full transform -translate-y-1/2 group-hover:bg-accent transition-colors duration-300" />
              <span className="absolute -right-0.5 top-1/2 w-1 h-1 bg-primary rounded-full transform -translate-y-1/2 group-hover:bg-accent transition-colors duration-300" />
            </motion.div>
          </div>
          
          {/* Bordure intérieure décorative Art Déco */}
          <div 
            className="absolute inset-1 border border-primary/20 group-hover:border-accent/30 transition-colors duration-300"
            style={{
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)'
            }}
          />
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
              {/* Bouton Fermeture Art Déco - Forme géométrique assortie */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/80 backdrop-blur-sm flex items-center justify-center text-accent hover:text-primary transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                transition={{ duration: 0.5, delay: 0.3, ease: 'backOut' }}
                style={{
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)',
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(229,91,69,0.1) 50%, rgba(0,0,0,0.9) 100%)',
                  border: '1.5px solid #E55B45',
                  boxShadow: '0 0 15px rgba(229, 91, 69, 0.3), inset 0 1px 0 rgba(229, 91, 69, 0.4)'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(229, 91, 69, 0.5), inset 0 1px 0 rgba(229, 91, 69, 0.6)'
                }}
                aria-label="Close menu"
              >
                {/* Croix Art Déco avec détails géométriques */}
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {/* Ligne diagonale \ avec points décoratifs */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 rotate-45 group-hover:bg-primary transition-colors duration-300"
                    style={{ transformOrigin: 'center' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    {/* Points dorés aux extrémités */}
                    <span className="absolute -left-0.5 top-1/2 w-1 h-1 bg-accent rounded-full transform -translate-y-1/2 group-hover:bg-primary transition-colors duration-300" />
                    <span className="absolute -right-0.5 top-1/2 w-1 h-1 bg-accent rounded-full transform -translate-y-1/2 group-hover:bg-primary transition-colors duration-300" />
                  </motion.div>
                  
                  {/* Ligne diagonale / avec points décoratifs */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:bg-primary transition-colors duration-300"
                    style={{ transformOrigin: 'center' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    {/* Points dorés aux extrémités */}
                    <span className="absolute -left-0.5 top-1/2 w-1 h-1 bg-accent rounded-full transform -translate-y-1/2 group-hover:bg-primary transition-colors duration-300" />
                    <span className="absolute -right-0.5 top-1/2 w-1 h-1 bg-accent rounded-full transform -translate-y-1/2 group-hover:bg-primary transition-colors duration-300" />
                  </motion.div>
                  
                  {/* Point central décoratif */}
                  <motion.span 
                    className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2 group-hover:bg-primary transition-colors duration-300"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                  />
                  
                  {/* Bordure intérieure décorative */}
                  <div 
                    className="absolute inset-1 border border-accent/20 group-hover:border-primary/30 transition-colors duration-300"
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                    }}
                  />
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

                {/* Mobile Tickets Button - Art Déco Style */}
                <motion.button
                  onClick={(e) => handleNavClick(e, ticketsItem.id)}
                  className="relative px-6 py-3 mt-6 text-sm font-title uppercase tracking-wider transition-all duration-300 bg-transparent text-accent hover:text-background text-center flex items-center justify-center group overflow-hidden"
                  style={{
                    clipPath: 'polygon(8% 0%, 92% 0%, 100% 25%, 92% 100%, 8% 100%, 0% 75%)',
                    background: 'linear-gradient(135deg, rgba(229,91,69,0.1) 0%, transparent 50%, rgba(229,91,69,0.1) 100%)',
                    border: '2px solid #E55B45',
                    boxShadow: '0 0 15px rgba(229, 91, 69, 0.2), inset 0 1px 0 rgba(229, 91, 69, 0.3)'
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 25px rgba(229, 91, 69, 0.4), inset 0 1px 0 rgba(229, 91, 69, 0.5)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {/* Fond hover Art Déco */}
                  <motion.div
                    className="absolute inset-0 bg-accent"
                    style={{
                      clipPath: 'polygon(8% 0%, 92% 0%, 100% 25%, 92% 100%, 8% 100%, 0% 75%)'
                    }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Détails décoratifs */}
                  <span className="absolute left-3 top-1/2 w-1 h-1 bg-accent rounded-full transform -translate-y-1/2 group-hover:bg-background transition-colors duration-300" />
                  <span className="absolute right-3 top-1/2 w-1 h-1 bg-accent rounded-full transform -translate-y-1/2 group-hover:bg-background transition-colors duration-300" />
                  
                  <span className="relative z-10">{ticketsItem.label}</span>
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
