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
        className="mb-7 xs:mb-8 sm:mb-9 lg:mb-6 xl:mb-7 leading-relaxed text-base xs:text-lg sm:text-lg lg:text-xl text-primary"
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
          className="relative flex flex-col items-center justify-center min-h-screen px-2 xs:px-3 sm:px-3 lg:px-4 text-center py-3 xs:py-4 sm:py-4 lg:py-6 xl:py-8"
        >

          {/* Festival subtitle - responsive */}
          <motion.div
            className="text-center mb-3 xs:mb-4 sm:mb-4 lg:mb-3 xl:mb-4 relative z-10 px-2"
            {...getAnimationVariants(0.0)}
          >
            {/* Version compact : 2 lignes */}
            <div className="lg:hidden">
              <p 
                className="font-title text-base xs:text-lg sm:text-lg uppercase tracking-wide xs:tracking-wider text-accent"
              >
                {HERO_CONTENT[lang].subtitle}
              </p>
              <p 
                className="font-title text-sm xs:text-base sm:text-lg uppercase tracking-wide xs:tracking-wider text-accent mt-1"
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
            className="font-title text-lg xs:text-xl sm:text-xl lg:text-xl xl:text-2xl text-primary mb-4 xs:mb-5 sm:mb-5 lg:mb-4 xl:mb-5 relative z-10 px-2"
            {...getAnimationVariants(0.1)}
          >
            {HERO_CONTENT[lang].date}
          </motion.p>

          {/* Titre principal */}
          <HeroTitle getAnimationVariants={getAnimationVariants} />


          {/* Call to action - Sous la Tour Eiffel, centré */}
          <div className="w-full flex flex-col items-center mt-6 xs:mt-7 sm:mt-7 lg:mt-8 xl:mt-10">
            {/* Version mobile/tablette : CTA puis Hotel + Paris en dessous */}
            <div className="flex lg:hidden flex-col items-center gap-3 xs:gap-4 sm:gap-4">
              {/* Bouton billeterie EN HAUT */}
              <motion.a
                href="#contact"
                className="inline-block px-6 xs:px-7 sm:px-7 py-3 xs:py-4 sm:py-3 font-title text-base xs:text-lg sm:text-lg lg:text-xl uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background"
                {...getAnimationVariants(0.2)}
              >
                {HERO_CONTENT[lang].cta}
              </motion.a>
              
              {/* Hotel et Paris en colonne EN DESSOUS avec plus d'espace */}
              <div className="flex flex-col items-center gap-2 xs:gap-3 sm:gap-2">
                <motion.p
                  className="font-title text-base xs:text-lg sm:text-lg lg:text-xl text-accent"
                  {...getAnimationVariants(0.5)}
                >
                  {lang === 'fr' ? 'Hotel du Collectionneur' : 'Hotel Collectionneur'}
                </motion.p>
                
                <motion.p
                  className="font-title text-base xs:text-lg sm:text-lg lg:text-xl text-accent"
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
        <section id="about" className="relative min-h-screen flex flex-col justify-center px-3 xs:px-4 sm:px-4 lg:px-6 xl:px-8 py-5 xs:py-7 sm:py-6 lg:py-6 xl:py-8">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-3xl lg:text-4xl xl:text-5xl text-accent mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7 text-center"
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
              className="mt-6 xs:mt-7 sm:mt-7 lg:mt-8 xl:mt-9 grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-4 lg:gap-5 xl:gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {FESTIVAL_OBJECTIVE[lang].map((objective, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-primary rounded-lg bg-black/30 backdrop-blur-sm"
                >
                  <p className="font-body text-primary leading-relaxed text-base lg:text-lg">
                    {objective}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Partners section */}
        <section id="partners" className="relative min-h-screen flex flex-col justify-center px-3 xs:px-4 sm:px-4 lg:px-6 xl:px-8 py-5 xs:py-7 sm:py-6 lg:py-6 xl:py-8">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-3xl lg:text-4xl xl:text-5xl text-accent mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].partners}
          </motion.h2>
          <Frame className="max-w-5xl mx-auto">
            <div className="mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7">
              {renderParagraphs(PARTNERS_INTRO[lang])}
            </div>
            <div className="grid gap-3 xs:gap-4 sm:gap-4 lg:gap-5 xl:gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <section id="ontheway" className="relative min-h-screen flex flex-col justify-center px-3 xs:px-4 sm:px-4 lg:px-6 xl:px-8 py-5 xs:py-7 sm:py-6 lg:py-6 xl:py-8">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-3xl lg:text-4xl xl:text-5xl text-accent mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].ontheway}
          </motion.h2>
          <Frame className="max-w-5xl mx-auto">
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
          </Frame>
        </section>

        {/* Deco Ball section */}
        <section id="decoball" className="relative min-h-screen flex flex-col justify-center px-3 xs:px-4 sm:px-4 lg:px-6 xl:px-8 py-5 xs:py-7 sm:py-6 lg:py-6 xl:py-8">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-3xl lg:text-4xl xl:text-5xl text-accent mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].decoball}
          </motion.h2>
          <Frame className="max-w-5xl mx-auto">
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
          </Frame>
        </section>

        {/* Personalities section */}
        <section id="personalities" className="relative min-h-screen flex flex-col justify-center px-3 xs:px-4 sm:px-4 lg:px-6 xl:px-8 py-5 xs:py-7 sm:py-6 lg:py-6 xl:py-8">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-3xl lg:text-4xl xl:text-5xl text-accent mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].personalities}
          </motion.h2>
          <Frame className="max-w-5xl mx-auto">
            <div className="mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7">
              {renderParagraphs(PERSONALITIES_CONTENT[lang])}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-4 lg:gap-5 xl:gap-6">
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
        <section id="gallery" className="relative min-h-screen flex flex-col justify-center px-3 xs:px-4 sm:px-4 lg:px-6 xl:px-8 py-5 xs:py-7 sm:py-6 lg:py-6 xl:py-8">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-3xl lg:text-4xl xl:text-5xl text-accent mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].gallery}
          </motion.h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-4 lg:gap-5 xl:gap-6">
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
        <section id="contact" className="relative min-h-screen flex flex-col justify-center px-4 xs:px-5 sm:px-5 lg:px-6 xl:px-8 py-6 xs:py-7 sm:py-6 lg:py-6 xl:py-7">
          <motion.h2
            className="font-title text-2xl xs:text-3xl sm:text-3xl lg:text-4xl xl:text-5xl text-accent mb-2 xs:mb-3 sm:mb-3 lg:mb-4 xl:mb-5 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {NAV_LABELS[lang].contact}
          </motion.h2>
          <div className="max-w-2xl mx-auto px-4">
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
