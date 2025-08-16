import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import ProgressiveBackground from '@/components/ProgressiveBackground';
import HeroTitle from '@/components/HeroTitle';
import Frame from '@/components/Frame';
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
  PERSONALITIES_CONTENT,
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
        className="mb-7 xs:mb-8 sm:mb-9 md:mb-10 lg:mb-6 xl:mb-7 leading-relaxed text-base xs:text-lg md:text-xl text-primary"
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
      <main aria-label="Festival content" className="relative z-10">
        {/* Hero section */}
        <section 
          id="hero" 
          className="relative flex flex-col items-center justify-center min-h-screen px-1 xs:px-2 sm:px-4 md:px-8 text-center py-2 xs:py-4 sm:py-8 md:py-12 lg:py-8 xl:py-12 2xl:py-16"
        >

          {/* Festival subtitle - responsive */}
          <motion.div
            className="text-center mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-4 xl:mb-5 relative z-10 px-1"
            {...getAnimationVariants(0.0)}
          >
            {/* Version compact : 2 lignes */}
            <div className="lg:hidden">
              <p 
                className="font-title text-xs xs:text-xs sm:text-sm md:text-base uppercase tracking-wide xs:tracking-wider text-accent"
              >
                {HERO_CONTENT[lang].subtitle}
              </p>
              <p 
                className="font-title text-xs xs:text-xs sm:text-sm md:text-base uppercase tracking-wide xs:tracking-wider text-accent"
              >
                1ère Edition
              </p>
            </div>
            
            {/* Version desktop : 1 ligne */}
            <p 
              className="hidden lg:block font-title text-xl uppercase tracking-wide text-accent"
            >
              {HERO_CONTENT[lang].subtitle} - 1ère Edition
            </p>
          </motion.div>

          {/* Date */}
          <motion.p
            className="font-title text-xs xs:text-sm sm:text-base md:text-lg lg:text-2xl text-primary mb-3 xs:mb-4 sm:mb-6 md:mb-7 lg:mb-5 xl:mb-6 relative z-10 px-1"
            {...getAnimationVariants(0.1)}
          >
            {HERO_CONTENT[lang].date}
          </motion.p>

          {/* Titre principal */}
          <HeroTitle getAnimationVariants={getAnimationVariants} />


          {/* Call to action - Sous la Tour Eiffel, centré */}
          <div className="w-full flex flex-col items-center mt-8 xs:mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24">
            {/* Version mobile/tablette : CTA puis Hotel + Paris en dessous */}
            <div className="flex lg:hidden flex-col items-center gap-3 xs:gap-4 sm:gap-5">
              {/* Bouton billeterie EN HAUT */}
              <motion.a
                href="#contact"
                className="inline-block px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-3 sm:py-3 md:py-4 font-title text-xs xs:text-sm sm:text-base md:text-lg uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background"
                {...getAnimationVariants(0.2)}
              >
                {HERO_CONTENT[lang].cta}
              </motion.a>
              
              {/* Hotel et Paris en colonne EN DESSOUS avec moins d'espace */}
              <div className="flex flex-col items-center gap-0.5">
                <motion.p
                  className="font-title text-xs xs:text-sm sm:text-base md:text-lg text-accent"
                  {...getAnimationVariants(0.5)}
                >
                  {lang === 'fr' ? 'Hotel du Collectionneur' : 'Hotel Collectionneur'}
                </motion.p>
                
                <motion.p
                  className="font-title text-xs xs:text-sm sm:text-base md:text-lg text-accent"
                  {...getAnimationVariants(0.6)}
                >
                  Paris 75008
                </motion.p>
              </div>
            </div>

            {/* Version desktop : Hotel à gauche, bouton au centre, Paris à droite - MÊME LIGNE */}
            <div className="hidden lg:grid grid-cols-3 items-center w-full max-w-none">
              <motion.p
                className="font-title text-lg lg:text-xl xl:text-2xl text-accent text-right"
                {...getAnimationVariants(0.2)}
              >
                {lang === 'fr' ? 'Hotel du Collectionneur' : 'Hotel Collectionneur'}
              </motion.p>
              
              <motion.a
                href="#contact"
                className="inline-block px-8 lg:px-10 py-3 lg:py-4 font-title text-base lg:text-lg uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background text-center mx-auto"
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
        <section id="about" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 xs:py-12 sm:py-16 md:py-18 lg:py-12 xl:py-16">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-accent mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-8 xl:mb-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].about}
          </motion.h2>
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {renderParagraphs(ABOUT_CONTENT[lang])}
            
            {/* Festival objectives section */}
            <motion.div
              className="mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-10 xl:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 md:gap-9 lg:gap-6 xl:gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {FESTIVAL_OBJECTIVE[lang].map((objective, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-primary rounded-lg bg-black/30 backdrop-blur-sm"
                >
                  <p className="font-body text-primary leading-relaxed text-base md:text-lg">
                    {objective}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Partners section */}
        <section id="partners" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 xs:py-12 sm:py-16 md:py-18 lg:py-12 xl:py-16">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-accent mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-8 xl:mb-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].partners}
          </motion.h2>
          <Frame className="max-w-5xl mx-auto">
            <div className="mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-8 xl:mb-10">
              {renderParagraphs(PARTNERS_INTRO[lang])}
            </div>
            <div className="grid gap-6 xs:gap-7 sm:gap-8 md:gap-9 lg:gap-6 xl:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {PARTNER_CATEGORIES.map((cat) => (
                <motion.div
                  key={cat.key}
                  className="p-6 border border-primary rounded-lg bg-black/40 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <h3 className="font-title text-2xl text-accent mb-2">
                    {cat.title[lang]}
                  </h3>
                  <p className="font-body text-primary leading-relaxed">
                    {cat.desc[lang]}
                  </p>
                </motion.div>
              ))}
            </div>
          </Frame>
        </section>

        {/* On the Way section */}
        <section id="ontheway" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 xs:py-12 sm:py-16 md:py-18 lg:py-12 xl:py-16">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-accent mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-8 xl:mb-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].ontheway}
          </motion.h2>
          <Frame className="max-w-5xl mx-auto">
            <div className="mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-8 xl:mb-10">
              {renderParagraphs(ON_THE_WAY_CONTENT[lang])}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 xs:gap-6 sm:gap-7 md:gap-8 lg:gap-6 xl:gap-7">
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
          </Frame>
        </section>

        {/* Deco Ball section */}
        <section id="decoball" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 xs:py-12 sm:py-16 md:py-18 lg:py-12 xl:py-16">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-accent mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-8 xl:mb-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].decoball}
          </motion.h2>
          <Frame className="max-w-5xl mx-auto">
            <div className="mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-8 xl:mb-10">
              {renderParagraphs(DECO_BALL_CONTENT[lang])}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 xs:gap-6 sm:gap-7 md:gap-8 lg:gap-6 xl:gap-7">
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
          </Frame>
        </section>

        {/* Personalities section */}
        <section id="personalities" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 xs:py-12 sm:py-16 md:py-18 lg:py-12 xl:py-16">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-accent mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-8 xl:mb-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].personalities}
          </motion.h2>
          <Frame className="max-w-5xl mx-auto">
            <div className="mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-8 xl:mb-10">
              {renderParagraphs(PERSONALITIES_CONTENT[lang])}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 xs:gap-6 sm:gap-7 md:gap-8 lg:gap-6 xl:gap-7">
              <motion.div
                className="w-full h-64 relative overflow-hidden rounded"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <OptimizedImage
                  src="/images/gallery_4.png"
                  alt="Art Deco personalities"
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
                  src="/images/gallery_5.png"
                  alt="Historical figures"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </Frame>
        </section>

        {/* Gallery section */}
        <section id="gallery" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 xs:py-12 sm:py-16 md:py-18 lg:py-12 xl:py-16">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-accent mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-8 xl:mb-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].gallery}
          </motion.h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5 xs:gap-6 sm:gap-7 md:gap-8 lg:gap-6 xl:gap-7">
            {[1,2,3,4,5,6].map((idx, i) => (
              <motion.div
                key={idx}
                className="relative overflow-hidden rounded h-48 xs:h-56 sm:h-64"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                whileHover={{ scale: 1.05 }}
              >
                <OptimizedImage
                  src={`/images/gallery_${idx}.png`}
                  alt={`Gallery image ${idx}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 xs:py-12 sm:py-16 md:py-18 lg:py-12 xl:py-16">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-accent mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-8 xl:mb-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].contact}
          </motion.h2>
          <div className="max-w-5xl mx-auto text-center">
            <motion.h3
              className="font-title text-xl xs:text-2xl sm:text-3xl md:text-4xl text-accent mb-5 xs:mb-6 sm:mb-7 md:mb-8 lg:mb-6 xl:mb-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {CONTACT_CONTENT[lang].heading}
            </motion.h3>
            <motion.p
              className="font-body text-base xs:text-lg md:text-xl text-primary mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-6 xl:mb-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {CONTACT_CONTENT[lang].intro}
            </motion.p>
            <motion.div
              className="flex flex-col items-center gap-5 xs:gap-6 sm:gap-7 md:gap-8 lg:gap-6 xl:gap-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <a
                href={`https://wa.me/${CONTACT_CONTENT[lang].phone.replace(/\s+/g, '')}`}
                className="px-6 py-3 border border-primary rounded-full text-primary hover:bg-primary hover:text-background transition-colors"
              >
                {CONTACT_CONTENT[lang].whatsapp}: {CONTACT_CONTENT[lang].phone}
              </a>
              <a
                href={`mailto:${CONTACT_CONTENT[lang].email}`}
                className="px-6 py-3 border border-primary rounded-full text-primary hover:bg-primary hover:text-background transition-colors"
              >
                {CONTACT_CONTENT[lang].email}
              </a>
              <a
                href={CONTACT_CONTENT[lang].website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-primary rounded-full text-primary hover:bg-primary hover:text-background transition-colors"
              >
                {CONTACT_CONTENT[lang].website}
              </a>
            </motion.div>
          </div>
        </section>
      </main>


    </ErrorBoundary>
  );
}
