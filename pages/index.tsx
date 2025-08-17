import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import ProgressiveBackground from '@/components/ProgressiveBackground';
import HeroTitle from '@/components/HeroTitle';
import SectionGroup from '@/components/SectionGroup';
import HeroSubtitle from '@/components/HeroSubtitle';
import OptimizedImage from '@/components/OptimizedImage';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { detectBrowserLanguage } from '@/hooks/useBrowserLanguage';
import { useBackgroundTransition } from '@/hooks/useBackgroundTransition';
import { 
  NAV_LABELS, 
  HERO_CONTENT, 
  ABOUT_CONTENT, 
  PARTNER_CATEGORIES, 
  PARTNERS_INTRO,
  ON_THE_WAY_CONTENT,
  DECO_BALL_CONTENT,
  FESTIVAL_OBJECTIVE,
  CONTACT_CONTENT 
} from '@/constants/content';
import type { Language } from '@/types';

/**
 * The main landing page for the festival site with a fixed background
 * and vertical navigation. Content scrolls over the background image
 * while the navigation remains fixed on the right side.
 */
export default function Home() {
  // Start with English to avoid hydration mismatch
  const [lang, setLang] = useState<Language>('en');
  const prefersReducedMotion = useReducedMotion();
  const { isCompactMode } = useBackgroundTransition();
  
  // Detect browser language on client side after mount
  useEffect(() => {
    const detectedLang = detectBrowserLanguage();
    setLang(detectedLang);
  }, []);


  /**
   * Helper to render a paragraph with highlighted words. Because
   * internationalisation often requires emphasis on certain phrases
   * the paragraphs are defined as arrays of React fragments rather
   * than plain strings. Each paragraph is represented as a JSX
   * element which may contain nested spans with accent colouring.
   */
  const renderParagraphs = (paragraphs: React.ReactNode[]) => {
    return paragraphs.map((p, idx) => (
      <p
        key={idx}
        className="mb-7 xs:mb-8 sm:mb-9 lg:mb-6 xl:mb-7 leading-relaxed text-base xs:text-lg sm:text-lg lg:text-xl text-primary text-justify"
      >
        {p}
      </p>
    ));
  };

  // Memoize animation variants to prevent recreation on each render
  const getAnimationVariants = useMemo(() => {
    return (delay = 0) => {
      if (prefersReducedMotion) {
        return {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.1, delay: Math.min(delay, 0.1) }
        };
      }
      
      return {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay }
      };
    };
  }, [prefersReducedMotion]);

  return (
    <ErrorBoundary>
      {/* Progressive Background System */}
      <ProgressiveBackground />
      
      {/* Responsive Navigation */}
      <ResponsiveNavigation labels={NAV_LABELS[lang]} lang={lang} setLang={setLang} isCompactMode={isCompactMode} />
      
      {/* Main content */}
      <main aria-label="Festival content" className="relative z-10 overflow-x-hidden">
        {/* Hero section */}
        <section 
          id="hero" 
          className="relative flex flex-col items-center justify-center min-h-screen px-6 xs:px-8 sm:px-12 lg:px-20 xl:px-24 text-center py-4 xs:py-5 sm:py-6 md:py-7 lg:py-8 xl:py-10"
        >
          {/* Festival subtitle */}
          <HeroSubtitle 
            subtitle={HERO_CONTENT[lang].subtitle} 
            getAnimationVariants={getAnimationVariants} 
          />

          {/* Date */}
          <motion.p
            className="font-title text-lg xs:text-xl sm:text-xl lg:text-xl xl:text-2xl text-primary mb-2 xs:mb-3 sm:mb-3 lg:mb-2 xl:mb-3 relative z-10"
            {...getAnimationVariants(0.1)}
          >
            {HERO_CONTENT[lang].date}
          </motion.p>

          {/* Titre principal */}
          <HeroTitle getAnimationVariants={getAnimationVariants} />

          {/* Call to action */}
          <div className="w-full flex flex-col items-center mt-4 xs:mt-5 sm:mt-6 md:mt-7 lg:mt-6 xl:mt-8">
            {/* Mobile/Tablet: Vertical stack */}
            <div className="flex lg:hidden flex-col items-center gap-3 xs:gap-4 sm:gap-4">
              <motion.a
                href="#contact"
                className="inline-block px-6 xs:px-7 sm:px-7 py-3 xs:py-4 sm:py-3 font-title text-base xs:text-lg sm:text-lg uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background"
                {...getAnimationVariants(0.2)}
              >
                {HERO_CONTENT[lang].cta}
              </motion.a>
              
              <div className="flex flex-col items-center gap-2 xs:gap-3 sm:gap-2">
                <motion.p
                  className="font-title text-base xs:text-lg sm:text-lg text-accent"
                  {...getAnimationVariants(0.5)}
                >
                  {lang === 'fr' ? 'Hotel du Collectionneur' : 'Hotel Collectionneur'}
                </motion.p>
                
                <motion.p
                  className="font-title text-base xs:text-lg sm:text-lg text-accent"
                  {...getAnimationVariants(0.6)}
                >
                  Paris 75008
                </motion.p>
              </div>
            </div>

            {/* Desktop: Horizontal grid */}
            <div className="hidden lg:grid grid-cols-3 items-center w-full max-w-none">
              <motion.p
                className="font-title text-lg lg:text-xl xl:text-2xl text-accent text-right"
                {...getAnimationVariants(0.2)}
              >
                {lang === 'fr' ? 'Hotel du Collectionneur' : 'Hotel Collectionneur'}
              </motion.p>
              
              <motion.a
                href="#contact"
                className="inline-block px-8 lg:px-10 py-3 lg:py-4 font-title text-base lg:text-lg xl:text-xl uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background text-center mx-auto"
                {...getAnimationVariants(0.2)}
              >
                {HERO_CONTENT[lang].cta}
              </motion.a>
              
              <motion.p
                className="font-title text-lg lg:text-xl xl:text-2xl text-accent text-left"
                {...getAnimationVariants(0.2)}
              >
                Paris 75008
              </motion.p>
            </div>
          </div>
        </section>

        {/* About section */}
        <SectionGroup id="about" title={NAV_LABELS[lang].about}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7"
          >
            {renderParagraphs(ABOUT_CONTENT[lang])}
          </motion.div>
          
          {/* Festival objectives section */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-4 lg:gap-5 xl:gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {FESTIVAL_OBJECTIVE[lang].map((objective, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 lg:p-6 border border-primary rounded-lg bg-black/30 backdrop-blur-sm"
              >
                <p className="font-body text-primary leading-relaxed text-base lg:text-lg text-justify">
                  {objective}
                </p>
              </div>
            ))}
          </motion.div>
        </SectionGroup>

        {/* Partners section */}
        <SectionGroup id="partners" title={NAV_LABELS[lang].partners}>
          <div className="mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7">
            {renderParagraphs(PARTNERS_INTRO[lang])}
          </div>
          <div className="grid gap-3 xs:gap-4 sm:gap-4 lg:gap-5 xl:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNER_CATEGORIES.map((cat) => (
              <motion.div
                key={cat.key}
                className="p-4 sm:p-5 lg:p-6 border border-primary rounded-lg bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h3 className="font-title text-2xl text-accent mb-2">
                  {cat.title[lang]}
                </h3>
                <p className="font-body text-primary leading-relaxed text-justify">
                  {cat.desc[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </SectionGroup>

        {/* On the Way section */}
        <SectionGroup id="ontheway" title={NAV_LABELS[lang].ontheway}>
          <div className="mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7">
            {renderParagraphs(ON_THE_WAY_CONTENT[lang])}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-4 lg:gap-5 xl:gap-6">
            <motion.div
              className="w-full h-64 relative overflow-hidden rounded"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <OptimizedImage
                src="/images/gallery_2.png"
                alt="Normandie liner"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              className="w-full h-64 relative overflow-hidden rounded"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <OptimizedImage
                src="/images/gallery_3.png"
                alt="Elegant passengers"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </SectionGroup>

        {/* Deco Ball section */}
        <SectionGroup id="decoball" title={NAV_LABELS[lang].decoball}>
          <div className="mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7">
            {renderParagraphs(DECO_BALL_CONTENT[lang])}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-4 lg:gap-5 xl:gap-6">
            <motion.div
              className="w-full h-64 relative overflow-hidden rounded"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <OptimizedImage
                src="/images/gallery_7.png"
                alt="Dancers at the ball"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              className="w-full h-64 relative overflow-hidden rounded"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <OptimizedImage
                src="/images/gallery_8.png"
                alt="Roaring Twenties portraits"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </SectionGroup>

        {/* Contact section - Centered design (no menu in this section) */}
        <section id="contact" className="relative min-h-screen flex flex-col justify-center px-8 xs:px-12 sm:px-16 lg:px-20 xl:px-24 2xl:px-32 py-12 xs:py-14 sm:py-16 lg:py-20 xl:py-24">
          {/* Section Title - Centered (no menu in this section) */}
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-3xl lg:text-4xl xl:text-5xl text-accent mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].contact}
          </motion.h2>
          {/* Contact Content - Centered design (no menu in this section) */}
          <div className="max-w-3xl mx-auto">
            <motion.h3
              className="font-title text-lg xs:text-xl sm:text-xl lg:text-2xl xl:text-3xl text-primary mb-1 xs:mb-2 sm:mb-2 lg:mb-3 xl:mb-4 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {CONTACT_CONTENT[lang].heading}
            </motion.h3>
            <motion.p
              className="font-body text-xs xs:text-sm sm:text-sm lg:text-base xl:text-lg text-accent mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {CONTACT_CONTENT[lang].intro}
            </motion.p>
            
            {/* Layout responsive pour les contacts - Style Art Déco unifié */}
            <motion.div
              className="flex flex-col lg:grid lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 lg:gap-4 xl:gap-5 mb-4 xs:mb-5 sm:mb-6 lg:mb-6 xl:mb-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.a
                href={`https://wa.me/${CONTACT_CONTENT[lang].phone.replace(/\s+/g, '')}`}
                className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="font-title text-xs xs:text-xs sm:text-xs lg:text-sm block mb-1">
                  {CONTACT_CONTENT[lang].whatsapp}
                </span>
                <span className="font-body text-xs xs:text-xs sm:text-xs lg:text-sm text-accent">
                  {CONTACT_CONTENT[lang].phone}
                </span>
              </motion.a>
              
              <motion.a
                href={`mailto:${CONTACT_CONTENT[lang].email}`}
                className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="font-title text-xs xs:text-xs sm:text-xs lg:text-sm block mb-1">
                  Email
                </span>
                <span className="font-body text-xs xs:text-xs sm:text-xs lg:text-sm break-all text-accent leading-tight">
                  {CONTACT_CONTENT[lang].email}
                </span>
              </motion.a>
              
              <motion.a
                href={CONTACT_CONTENT[lang].website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span className="font-title text-xs xs:text-xs sm:text-xs lg:text-sm block mb-1">
                  Site Web
                </span>
                <span className="font-body text-xs xs:text-xs sm:text-xs lg:text-sm text-accent">
                  grandbattementdailes.com
                </span>
              </motion.a>
            </motion.div>

            {/* Boutons d'action */}
            <motion.div
              className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Bouton Billeterie - Style unifié */}
              <motion.a
                href="#hero"
                className="w-full xs:w-auto xs:min-w-[100px] sm:min-w-[110px] lg:min-w-[130px] inline-block px-2 xs:px-3 sm:px-3 py-3 xs:py-3 sm:py-4 font-title text-xs xs:text-xs sm:text-xs lg:text-sm uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {HERO_CONTENT[lang].cta}
              </motion.a>

              {/* Bouton Retour en haut - Version rouge */}
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full xs:w-auto xs:min-w-[100px] sm:min-w-[110px] lg:min-w-[130px] inline-block px-2 xs:px-3 sm:px-3 py-3 xs:py-3 sm:py-4 font-title text-xs xs:text-xs sm:text-xs lg:text-sm uppercase tracking-wider transition-all duration-300 border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-background text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {lang === 'fr' ? 'Retour en haut' : 'Back to top'}
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>


    </ErrorBoundary>
  );
}
