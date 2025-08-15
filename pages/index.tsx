import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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
  const [isHydrated, setIsHydrated] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { showOrnaments, isCompactMode, scrollY } = useBackgroundTransition();
  
  // Detect browser language on client side after mount
  useEffect(() => {
    const detectedLang = detectBrowserLanguage();
    setLang(detectedLang);
    setIsHydrated(true);
  }, []);


  /**
   * Helper to render a paragraph with highlighted words. Because
   * internationalisation often requires emphasis on certain phrases
   * the paragraphs are defined as arrays of React fragments rather
   * than plain strings. Each paragraph is represented as a JSX
   * element which may contain nested spans with accent colouring.
   */
  const renderParagraphs = (paragraphs) => {
    return paragraphs.map((p, idx) => (
      <p
        key={idx}
        className="mb-6 leading-relaxed text-base xs:text-lg md:text-xl text-primary"
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
          className="relative flex flex-col items-center justify-center min-h-screen px-4 xs:px-6 sm:px-8 text-center py-8 xs:py-12 sm:py-16 md:py-20 lg:py-16 xl:py-20 2xl:py-24"
        >

          {/* Festival subtitle - en haut */}
          <motion.p
            className="font-body text-base xs:text-lg md:text-xl lg:text-2xl uppercase tracking-wider text-accent mb-4 md:mb-6 relative z-10"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
            }}
            {...getAnimationVariants(0.0)}
          >
            {HERO_CONTENT[lang].subtitle} - 1ère Edition
          </motion.p>

          {/* Date */}
          <motion.p
            className="font-body text-lg xs:text-xl md:text-2xl lg:text-3xl text-primary mb-6 md:mb-8 relative z-10"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
            }}
            {...getAnimationVariants(0.1)}
          >
            {HERO_CONTENT[lang].date}
          </motion.p>

          {/* Titre principal */}
          <HeroTitle getAnimationVariants={getAnimationVariants} isCompactMode={isCompactMode} />

          {/* Location - Espacé du titre */}
          <div className="flex flex-col items-center mt-3 xs:mt-4 md:mt-6 lg:mt-8 xl:mt-10">
            <motion.p
              className="font-body text-base xs:text-lg md:text-xl lg:text-2xl text-primary px-4 relative z-10"
              style={{
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
              }}
              {...getAnimationVariants(0.4)}
            >
              {HERO_CONTENT[lang].location}
            </motion.p>
          </div>

          {/* Call to action - Position initiale dans le hero */}
          <motion.div 
            className="flex justify-center mt-4 xs:mt-6 md:mt-8"
            {...getAnimationVariants(0.5)}
          >
            <a
              href="#contact"
              className="inline-block px-4 xs:px-6 md:px-8 py-2 xs:py-3 md:py-4 rounded-full font-medium text-sm xs:text-base md:text-lg transition-all duration-300 backdrop-blur-sm border border-primary bg-black/20 text-primary hover:bg-primary hover:text-background"
              style={{
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
              }}
            >
              {HERO_CONTENT[lang].cta}
            </a>
          </motion.div>
        </section>

        {/* About section */}
        <section id="about" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-accent mb-4 xs:mb-6 md:mb-8 text-center"
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
              className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
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
        <section id="partners" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-accent mb-4 xs:mb-6 md:mb-8 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].partners}
          </motion.h2>
          <Frame className="max-w-5xl mx-auto">
            <div className="mb-6 md:mb-8">
              {renderParagraphs(PARTNERS_INTRO[lang])}
            </div>
            <div className="grid gap-4 xs:gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <section id="ontheway" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-accent mb-4 xs:mb-6 md:mb-8 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].ontheway}
          </motion.h2>
          <Frame className="max-w-5xl mx-auto">
            <div className="mb-6 md:mb-8">
              {renderParagraphs(ON_THE_WAY_CONTENT[lang])}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 md:gap-6">
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
        <section id="decoball" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-accent mb-4 xs:mb-6 md:mb-8 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].decoball}
          </motion.h2>
          <Frame className="max-w-5xl mx-auto">
            <div className="mb-6 md:mb-8">
              {renderParagraphs(DECO_BALL_CONTENT[lang])}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 md:gap-6">
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
        <section id="personalities" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-accent mb-4 xs:mb-6 md:mb-8 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].personalities}
          </motion.h2>
          <Frame className="max-w-5xl mx-auto">
            <div className="mb-6 md:mb-8">
              {renderParagraphs(PERSONALITIES_CONTENT[lang])}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 md:gap-6">
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
        <section id="gallery" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-accent mb-4 xs:mb-6 md:mb-8 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].gallery}
          </motion.h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 xs:gap-4 md:gap-6">
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
        <section id="contact" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-accent mb-4 xs:mb-6 md:mb-8 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].contact}
          </motion.h2>
          <Frame className="max-w-5xl mx-auto text-center">
            <motion.h3
              className="font-title text-xl xs:text-2xl sm:text-3xl md:text-4xl text-accent mb-3 xs:mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {CONTACT_CONTENT[lang].heading}
            </motion.h3>
            <motion.p
              className="font-body text-base xs:text-lg md:text-xl text-primary mb-4 xs:mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {CONTACT_CONTENT[lang].intro}
            </motion.p>
            <motion.div
              className="flex flex-col items-center gap-4"
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
          </Frame>
        </section>
      </main>

      {/* Sticky CTA Button - En dehors de tous les conteneurs pour sticky global */}
      {isHydrated && (
        <div 
          className="sticky top-4 z-40 flex justify-center pointer-events-none"
          style={{
            opacity: scrollY > 100 ? 1 : 0,
            transform: `translateY(${scrollY > 100 ? '0' : '-20px'})`,
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          <a
            href="#contact"
            className="pointer-events-auto inline-block px-4 xs:px-6 md:px-8 py-2 xs:py-3 md:py-4 rounded-full font-medium text-sm xs:text-base md:text-lg backdrop-blur-sm border border-primary bg-black/20 text-primary hover:bg-primary hover:text-background transition-colors duration-300"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            {HERO_CONTENT[lang].cta}
          </a>
        </div>
      )}

    </ErrorBoundary>
  );
}
