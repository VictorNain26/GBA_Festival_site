import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import type { Language } from '@/types';

// Components principaux du design original
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import ProgressiveBackground from '@/components/ProgressiveBackground';
import HeroTitle from '@/components/HeroTitle';
import SectionGroup from '@/components/SectionGroup';
import HeroSubtitle from '@/components/HeroSubtitle';
import OptimizedImage from '@/components/OptimizedImage';
import ErrorBoundary from '@/components/ErrorBoundary';

// Hooks
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { detectBrowserLanguage } from '@/hooks/useBrowserLanguage';
import { useBackgroundTransition } from '@/hooks/useBackgroundTransition';

// API Storyblok pour le contenu éditable
import { getStoryblokStory, getStoryblokVersion } from '@/lib/storyblok-api';
import type { StoryblokStory } from '@/lib/storyblok-api';

// Rich Text renderer pour le formatage avancé
import { renderRichText, renderRichTextTitle } from '@/lib/richTextRenderer';

// Contenu statique de fallback (design préservé)
import { 
  NAV_LABELS, 
  SECTION_TITLES,
  HERO_CONTENT, 
  ABOUT_CONTENT, 
  PARTNERS_INTRO,
  PARTNERS_COLLABORATION,
  DECO_BALL_INTRO,
  CONTACT_CONTENT 
} from '@/constants/content';

interface HomeProps {
  story: StoryblokStory | null;
  hasStoryblokData: boolean;
  buildTime: string;
}

/**
 * The main landing page for the festival site with a fixed background
 * and vertical navigation. Content scrolls over the background image
 * while the navigation remains fixed on the right side.
 */
export default function Home({ story, hasStoryblokData, buildTime }: HomeProps) {
  // Start with English to avoid hydration mismatch
  const [lang, setLang] = useState<Language>('en');
  const prefersReducedMotion = useReducedMotion();
  const { isCompactMode } = useBackgroundTransition();
  
  // Detect browser language on client side after mount
  useEffect(() => {
    const detectedLang = detectBrowserLanguage();
    setLang(detectedLang);
  }, []);

  // Helper pour obtenir le contenu Storyblok ou utiliser le fallback
  const getContent = (field: string, fallback: any) => {
    if (!hasStoryblokData || !story?.content) {
      return fallback;
    }
    
    // Pour les champs Rich Text dans Storyblok
    const storyblokContent = story.content[field];
    return storyblokContent || fallback;
  };

  // Helper pour le contenu Rich Text avec rendu automatique
  const getRichTextContent = (field: string, fallback: any) => {
    const content = getContent(field, fallback);
    
    // Si c'est du contenu Storyblok (Rich Text), utiliser le renderer
    if (hasStoryblokData && story?.content && story.content[field]) {
      return renderRichText(content);
    }
    
    // Sinon, rendre le fallback React directement
    return fallback;
  };

  // Helper pour les titres Rich Text
  const getRichTextTitle = (field: string, fallback: any) => {
    const content = getContent(field, fallback);
    
    if (hasStoryblokData && story?.content && story.content[field]) {
      return renderRichTextTitle(content);
    }
    
    return typeof fallback === 'string' ? fallback : fallback?.toString() || '';
  };

  /**
   * Helper to render a paragraph with highlighted words. Because
   * internationalisation often requires emphasis on certain phrases
   * the paragraphs are defined as arrays of React fragments rather
   * than plain strings. Each paragraph is represented as a JSX
   * element which may contain nested spans with accent colouring.
   */
  const renderParagraphs = (paragraphs: React.ReactNode[]) => {
    return paragraphs.map((p, idx) => (
      <div key={idx} className="mb-7 xs:mb-8 sm:mb-9 lg:mb-6 xl:mb-7">
        {getRichTextContent(`about_paragraph_${idx + 1}_${lang}`, 
          <p className="leading-relaxed text-base sm:text-lg lg:text-xl text-primary text-justify">
            {p}
          </p>
        )}
      </div>
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
    <>
      <Head>
        <title>
          {lang === 'fr' 
            ? 'Florilège de l\'Art Déco - Festival Art Déco et Neo Art Déco' 
            : 'Florilège de l\'Art Déco - Art Deco & Neo Art Deco Festival'
          }
        </title>
        <meta 
          name="description" 
          content={
            lang === 'fr'
              ? 'Festival Art Déco et Neo Art Déco - 18 octobre 2025 - Hôtel du Collectionneur, Paris'
              : 'Art Deco & Neo Art Deco Festival - October 18, 2025 - Hôtel du Collectionneur, Paris'
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ErrorBoundary>
        {/* Progressive Background System */}
        <ProgressiveBackground />
        
        {/* Responsive Navigation */}
        <ResponsiveNavigation labels={NAV_LABELS[lang]} lang={lang} setLang={setLang} isCompactMode={isCompactMode} />
        
        {/* Status Storyblok */}
        <div className="fixed top-4 right-4 z-50 text-xs">
          <div className={`px-3 py-2 rounded border ${ 
            hasStoryblokData 
              ? 'bg-green-900/20 border-green-500/30 text-green-400' 
              : 'bg-amber-900/20 border-amber-500/30 text-amber-400'
          }`}>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                hasStoryblokData ? 'bg-green-400' : 'bg-amber-400'
              }`} />
              <span className="font-mono">
                {hasStoryblokData ? 'Storyblok ✓' : 'Static Mode'}
              </span>
            </div>
            <div className="text-xs opacity-60 mt-1">
              {buildTime}
            </div>
          </div>
        </div>

        {/* Main content */}
        <main aria-label="Festival content" className="relative z-10 overflow-x-hidden">
          {/* Hero section */}
          <section 
            id="hero" 
            className="relative flex flex-col items-center justify-center min-h-screen px-6 xs:px-8 sm:px-12 lg:px-20 xl:px-24 text-center py-4 xs:py-5 sm:py-6 md:py-7 lg:py-8 xl:py-10"
          >
            {/* Festival subtitle */}
            <HeroSubtitle 
              subtitle={getRichTextTitle(`hero_subtitle_${lang}`, HERO_CONTENT[lang].subtitle)} 
              getAnimationVariants={getAnimationVariants} 
            />

            {/* Date */}
            <motion.div
              className="font-title text-base sm:text-lg lg:text-xl text-primary mb-2 xs:mb-3 sm:mb-3 lg:mb-2 xl:mb-3 relative z-10"
              {...getAnimationVariants(0.1)}
            >
              {getRichTextContent(`hero_date_${lang}`, 
                <p>{HERO_CONTENT[lang].date}</p>
              )}
            </motion.div>

            {/* Titre principal */}
            <HeroTitle getAnimationVariants={getAnimationVariants} />

            {/* Call to action */}
            <div className="w-full flex flex-col items-center mt-4 xs:mt-5 sm:mt-6 md:mt-7 lg:mt-6 xl:mt-8">
              {/* Mobile/Tablet: Vertical stack */}
              <div className="flex lg:hidden flex-col items-center gap-3 xs:gap-4 sm:gap-4">
                <motion.a
                  href="#contact"
                  className="inline-block px-6 xs:px-7 sm:px-7 py-3 xs:py-4 sm:py-3 font-title text-sm lg:text-base uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background"
                  {...getAnimationVariants(0.2)}
                >
                  {getRichTextTitle(`hero_cta_${lang}`, HERO_CONTENT[lang].cta)}
                </motion.a>
                
                <div className="flex flex-col items-center gap-2 xs:gap-3 sm:gap-2">
                  <motion.div
                    className="font-title text-sm lg:text-base text-accent"
                    {...getAnimationVariants(0.5)}
                  >
                    {getRichTextContent(`hero_location_1_${lang}`, 
                      <p>{lang === 'fr' ? 'Hotel du Collectionneur' : 'Hotel Collectionneur'}</p>
                    )}
                  </motion.div>
                  
                  <motion.div
                    className="font-title text-sm lg:text-base text-accent"
                    {...getAnimationVariants(0.6)}
                  >
                    {getRichTextContent(`hero_location_2_${lang}`, 
                      <p>Paris 75008</p>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Desktop: Horizontal grid */}
              <div className="hidden lg:grid grid-cols-3 items-center w-full max-w-none">
                <motion.div
                  className="font-title text-base lg:text-lg xl:text-xl text-accent text-right"
                  {...getAnimationVariants(0.2)}
                >
                  {getRichTextContent(`hero_location_1_${lang}`, 
                    <p>{lang === 'fr' ? 'Hotel du Collectionneur' : 'Hotel Collectionneur'}</p>
                  )}
                </motion.div>
                
                <motion.a
                  href="#contact"
                  className="inline-block px-8 lg:px-10 py-3 lg:py-4 font-title text-sm lg:text-base uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background text-center mx-auto"
                  {...getAnimationVariants(0.2)}
                >
                  {getRichTextTitle(`hero_cta_${lang}`, HERO_CONTENT[lang].cta)}
                </motion.a>
                
                <motion.div
                  className="font-title text-base lg:text-lg xl:text-xl text-accent text-left"
                  {...getAnimationVariants(0.2)}
                >
                  {getRichTextContent(`hero_location_2_${lang}`, 
                    <p>Paris 75008</p>
                  )}
                </motion.div>
              </div>
            </div>
          </section>

          {/* About section */}
          <SectionGroup id="about" title={SECTION_TITLES[lang]['about']} isCompactMode={isCompactMode}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* First three paragraphs */}
              <div className="mb-3 xs:mb-4 sm:mb-4 lg:mb-4">
                {renderParagraphs(ABOUT_CONTENT[lang].slice(0, 3))}
              </div>
              
              {/* Erté Angel Image */}
              <div className="flex justify-center mb-3 xs:mb-4 sm:mb-4 lg:mb-4">
                <OptimizedImage
                  src="/images/ange_erte.jpg"
                  alt="Ange d'Erté - Illustration Art Déco"
                  width={450}
                  height={570}
                  className="w-full max-w-sm xs:max-w-md sm:max-w-lg lg:max-w-xl object-cover"
                />
              </div>
              
              {/* Last two paragraphs */}
              <div>
                {renderParagraphs(ABOUT_CONTENT[lang].slice(3))}
              </div>
              
              {/* Danseuse image and objectives - Two columns with equal heights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 mt-4 xs:mt-5 sm:mt-6 lg:mt-8">
                {/* Left column - Danseuse image */}
                <OptimizedImage
                  src="/images/danseuse.png"
                  alt="Danseuse Art Déco"
                  width={320}
                  height={410}
                  className="w-full max-w-44 xs:max-w-48 sm:max-w-52 lg:max-w-56 object-cover mx-auto"
                />
                
                {/* Right column - Simple objectives */}
                <div className="flex flex-col justify-center space-y-3 xs:space-y-4">
                  <div className="p-3 xs:p-4 sm:p-4 border border-primary">
                    <h4 className="font-title text-lg sm:text-xl lg:text-2xl text-accent mb-2 xs:mb-3">
                      {lang === 'fr' ? 'PUBLIC CIBLE' : 'TARGET AUDIENCE'}
                    </h4>
                    {getRichTextContent(`about_target_${lang}`, 
                      <p className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed">
                        {lang === 'fr' 
                          ? 'Collectionneurs d\'art et amateurs éclairés de tous les âges.' 
                          : 'Art collectors and enlightened enthusiasts of all ages.'
                        }
                      </p>
                    )}
                  </div>
                  
                  <div className="p-3 xs:p-4 sm:p-4 border border-primary">
                    <h4 className="font-title text-lg sm:text-xl lg:text-2xl text-accent mb-2 xs:mb-3">
                      {lang === 'fr' ? 'NOTRE OBJECTIF' : 'OUR OBJECTIVE'}
                    </h4>
                    {getRichTextContent(`about_objective_${lang}`, 
                      <p className="font-body text-base sm:text-lg lg:text-xl text-primary leading-relaxed">
                        {lang === 'fr' 
                          ? 'Promouvoir la culture, l\'art et le divertissement, créer des opportunités pour des artistes, des galeries, des artisanats et d\'autres professionnels.' 
                          : 'Promote culture, art and entertainment, create opportunities for artists, galleries, craftsmen and other professionals.'
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </SectionGroup>

          {/* Partners section */}
          <SectionGroup id="partners" title={NAV_LABELS[lang].partners} isCompactMode={isCompactMode}>
            {/* Introduction paragraph */}
            <div className="mb-6 xs:mb-7 sm:mb-8 lg:mb-10">
              {PARTNERS_INTRO[lang].map((paragraph, idx) => (
                <div key={idx} className="mb-7 xs:mb-8 sm:mb-9 lg:mb-6 xl:mb-7">
                  {getRichTextContent(`partners_intro_${idx + 1}_${lang}`, 
                    <p className="leading-relaxed text-base sm:text-lg lg:text-xl text-primary text-justify">
                      {paragraph}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            {/* Two columns: collaboration text and danseuse2 image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
              {/* Left column - Collaboration text */}
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {getRichTextContent(`partners_collaboration_${lang}`, 
                  <p className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                    {PARTNERS_COLLABORATION[lang]}
                  </p>
                )}
              </motion.div>
              
              {/* Right column - Danseuse2 image */}
              <OptimizedImage
                src="/images/danseuse2.jpg"
                alt="Danseuse Art Déco - Partenaires"
                width={320}
                height={410}
                className="w-full max-w-44 xs:max-w-48 sm:max-w-52 lg:max-w-56 object-cover mx-auto"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </SectionGroup>

          {/* On the Way section */}
          <SectionGroup id="ontheway" isCompactMode={isCompactMode} title={
            <div className="text-center space-y-1">
              <div className="font-bold leading-tight">{NAV_LABELS[lang].ontheway}</div>
              <div className="h-px w-12 bg-accent mx-auto opacity-60"></div>
              <div className="font-body text-accent text-[0.5em] font-normal uppercase tracking-[0.3em] leading-none opacity-90">
                SPECTACLE IMMERSIF
              </div>
            </div>
          }>
            {/* Two columns: contenu existant et image bateau */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
              {/* Left column - Nouveau contenu spécifique */}
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {getRichTextContent(`ontheway_section_1_${lang}`, 
                  <p className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                    <span className="text-accent">ON THE WAY</span>, flashmob, un élément clé de notre soirée, transporte le public au cœur de l&apos;effervescence de l&apos;entre-deux-guerres.
                    <br /><br />
                    Nous sommes en <span className="text-accent">1925</span>. Le Port du Havre et la Gare de Paris. Les départs et les arrivées, les émotions, les sentiments.
                  </p>
                )}
              </motion.div>
              
              {/* Right column - Image bateau */}
              <OptimizedImage
                src="/images/bateau.png"
                alt="Bateau - Port du Havre 1925"
                width={400}
                height={500}
                className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              />
            </div>
            
            {/* Deuxième section en colonnes: image woman_or et texte esthétique transatlantique */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10 mt-6 xs:mt-7 sm:mt-8 lg:mt-10">
              {/* Left column - Image woman_or */}
              <OptimizedImage
                src="/images/woman_or.jpg"
                alt="Femme Art Déco - Esthétique transatlantique"
                width={400}
                height={500}
                className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Right column - Texte esthétique transatlantique */}
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {getRichTextContent(`ontheway_section_2_${lang}`, 
                  <p className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                    Une esthétique transatlantique… Au bord de fameux paquebot <span className="text-accent">Normandie</span> les spectateurs sont invités à faire un extraordinaire voyage dirigé par le <span className="text-accent">Vieux Loup de Mer</span>, en compagnie célébrités et personnages historiques qui les accompagnent le long toute la soirée.
                  </p>
                )}
              </motion.div>
            </div>
            
            {/* Troisième section en colonnes: texte voyageurs et image restaurant */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10 mt-6 xs:mt-7 sm:mt-8 lg:mt-10">
              {/* Left column - Texte voyageurs */}
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {getRichTextContent(`ontheway_section_3_${lang}`, 
                  <p className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                    Parmi des voyageurs on reconnaît des artistes, écrivains et intellectuels de ce temps, personnes les plus illustres venus de tous les continents.
                    <br /><br />
                    <span className="text-accent">Coco Chanel</span>, <span className="text-accent">Tamara de Lempicka</span>, <span className="text-accent">Anna Pavlova</span>, <span className="text-accent">Salvador Dali</span>, <span className="text-accent">Colette</span>, <span className="text-accent">F. Scott et Zelda Fitzgerald</span>, ainsi que <span className="text-accent">Nadja</span>, <span className="text-accent">Rosemary Hoyt</span>, <span className="text-accent">Julia Lambert</span> et <span className="text-accent">Clerfayt</span>, personnages imaginés par les écrivains d&apos;époque.
                  </p>
                )}
              </motion.div>
              
              {/* Right column - Image restaurant */}
              <OptimizedImage
                src="/images/restaurant.jpg"
                alt="Restaurant Art Déco - Ambiance des Années Folles"
                width={400}
                height={500}
                className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              />
            </div>
            
            {/* Quatrième section en colonnes: image men et texte ambiance parisienne */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10 mt-6 xs:mt-7 sm:mt-8 lg:mt-10">
              {/* Left column - Image men */}
              <OptimizedImage
                src="/images/men.jpg"
                alt="Hommes élégants - Époque Art Déco"
                width={400}
                height={500}
                className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Right column - Texte ambiance parisienne */}
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {getRichTextContent(`ontheway_section_4_${lang}`, 
                  <p className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                    Plongez dans l&apos;atmosphère de la vie parisienne de l&apos;année <span className="text-accent">1925</span>, vivez un moment unique qui célèbre les figures emblématiques de l&apos;époque de l&apos;<span className="text-accent">Art déco</span>.
                    <br /><br />
                    Le salon <span className="text-accent">Normandie</span> de l&apos;<span className="text-accent">Hôtel du Collectionneur</span> est métamorphosé pour donner une place à l&apos;atmosphère féerique qui évoque les plus grandes soirées de l&apos;ère <span className="text-accent">Art déco</span>.
                  </p>
                )}
              </motion.div>
            </div>
            
            {/* Cinquième section en colonnes: texte mise en scène et image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10 mt-6 xs:mt-7 sm:mt-8 lg:mt-10">
              {/* Left column - Texte mise en scène */}
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {getRichTextContent(`ontheway_section_5_${lang}`, 
                  <p className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                    La mise en scène soignée mêlant éléments visuels, sonores et théâtraux, créé par <span className="text-accent">Julie Durieux</span>, metteur en scène et autrice de concept, de scénario, des esquisses pour les costumes et la scénographie, qui a été assisté par des professionnels de scène française.
                  </p>
                )}
              </motion.div>
              
              {/* Right column - Image */}
              <OptimizedImage
                src="/images/tete_air.jpg"
                alt="Portrait Art Déco - Mise en scène Julie Durieux"
                width={400}
                height={500}
                className="w-full max-w-48 xs:max-w-52 sm:max-w-56 lg:max-w-60 xl:max-w-64 object-cover mx-auto"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </SectionGroup>

          {/* Deco Ball section */}
          <SectionGroup id="decoball" title={NAV_LABELS[lang].decoball} isCompactMode={isCompactMode}>
            {/* Two columns: content text and stacked dance images */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 lg:gap-10">
              {/* Left column - Content text */}
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {getRichTextContent(`decoball_intro_${lang}`, 
                  <p className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed text-justify">
                    {DECO_BALL_INTRO[lang]}
                  </p>
                )}
              </motion.div>
              
              {/* Right column - Stacked dance images with offset - SANS LIMITATION */}
              <div className="relative w-full flex justify-center">
                <div className="relative">
                  {/* Image de fond - danse2 - TRÈS GRANDE SANS LIMITATION */}
                  <div className="relative z-10">
                    <OptimizedImage
                      src="/images/danse2.jpg"
                      alt="Danse Art Déco - Bal des Années Folles"
                      width={900}
                      height={1080}
                      className="w-full max-w-[320px] xs:max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] object-cover"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    />
                  </div>
                  
                  {/* Image superposée - danse1 - BAS GAUCHE avec danse2 qui dépasse un peu */}
                  <div className="absolute z-20 bottom-8 -left-6 xs:bottom-10 xs:-left-8 sm:bottom-12 sm:-left-10 lg:bottom-14 lg:-left-12 xl:bottom-16 xl:-left-16 transform translate-y-2 xs:translate-y-3 sm:translate-y-4 lg:translate-y-5 xl:translate-y-6">
                    <OptimizedImage
                      src="/images/danse1.jpg"
                      alt="Élégance Art Déco - Soirée Dansante"
                      width={240}
                      height={300}
                      className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover shadow-2xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Florilège gallery - Images artistiquement disposées */}
            <div className="mt-12 xs:mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
              {/* Première ligne - 5 images décalées */}
              <div className="relative flex flex-wrap justify-center items-center gap-4 xs:gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-8 xs:mb-10 sm:mb-12 lg:mb-16 xl:mb-20">
                <OptimizedImage
                  src="/images/gallery_1.jpg"
                  alt="Art Déco Gallery 1"
                  width={160}
                  height={200}
                  className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer will-change-transform"
                  initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotate: -12, scale: 1 }}
                  whileHover={{ rotate: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                
                <OptimizedImage
                  src="/images/gallery_2.jpg"
                  alt="Art Déco Gallery 2"
                  width={160}
                  height={200}
                  className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer -mt-2 will-change-transform"
                  initial={{ opacity: 0, rotate: 6, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotate: 6, scale: 1 }}
                  whileHover={{ rotate: 3, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                
                <OptimizedImage
                  src="/images/gallery_3.jpg"
                  alt="Art Déco Gallery 3"
                  width={160}
                  height={200}
                  className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer mt-1 will-change-transform"
                  initial={{ opacity: 0, rotate: -8, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotate: -8, scale: 1 }}
                  whileHover={{ rotate: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                
                <OptimizedImage
                  src="/images/gallery_4.jpg"
                  alt="Art Déco Gallery 4"
                  width={160}
                  height={200}
                  className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer -mt-3 will-change-transform"
                  initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotate: 10, scale: 1 }}
                  whileHover={{ rotate: 5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                
                <OptimizedImage
                  src="/images/gallery_5.jpg"
                  alt="Art Déco Gallery 5"
                  width={160}
                  height={200}
                  className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer mt-2 will-change-transform"
                  initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotate: -15, scale: 1 }}
                  whileHover={{ rotate: -7, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </div>
              
              {/* Deuxième ligne - 4 images décalées */}
              <div className="relative flex flex-wrap justify-center items-center gap-6 xs:gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
                <OptimizedImage
                  src="/images/gallery_6.jpg"
                  alt="Art Déco Gallery 6"
                  width={160}
                  height={200}
                  className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer mt-1 will-change-transform"
                  initial={{ opacity: 0, rotate: 8, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotate: 8, scale: 1 }}
                  whileHover={{ rotate: 4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                
                <OptimizedImage
                  src="/images/gallery_7.jpg"
                  alt="Art Déco Gallery 7"
                  width={160}
                  height={200}
                  className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer -mt-1 will-change-transform"
                  initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotate: -12, scale: 1 }}
                  whileHover={{ rotate: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                
                <OptimizedImage
                  src="/images/gallery_8.jpg"
                  alt="Art Déco Gallery 8"
                  width={160}
                  height={200}
                  className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer mt-3 will-change-transform"
                  initial={{ opacity: 0, rotate: 14, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotate: 14, scale: 1 }}
                  whileHover={{ rotate: 7, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                
                <OptimizedImage
                  src="/images/gallery_9.jpg"
                  alt="Art Déco Gallery 9"
                  width={160}
                  height={200}
                  className="w-full max-w-20 xs:max-w-24 sm:max-w-28 lg:max-w-32 xl:max-w-36 object-cover cursor-pointer -mt-2 will-change-transform"
                  initial={{ opacity: 0, rotate: -6, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
                  whileHover={{ rotate: -3, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </div>
            </div>
          </SectionGroup>

          {/* Contact section - Centered design (no menu in this section) */}
          <section id="contact" className="relative min-h-screen flex flex-col justify-center px-8 xs:px-12 sm:px-16 lg:px-20 xl:px-24 2xl:px-32 py-12 xs:py-14 sm:py-16 lg:py-20 xl:py-24">
            {/* Section Title - Centered (no menu in this section) */}
            <motion.h2
              className="font-title text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-accent mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {NAV_LABELS[lang].contact}
            </motion.h2>
            
            {/* Contact Content - Centered design (no menu in this section) */}
            <div className="max-w-3xl mx-auto">
              <motion.h3
                className="font-title text-xl sm:text-2xl lg:text-3xl text-primary mb-1 xs:mb-2 sm:mb-2 lg:mb-3 xl:mb-4 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {getRichTextTitle(`contact_heading_${lang}`, CONTACT_CONTENT[lang].heading)}
              </motion.h3>
              
              <motion.div
                className="font-body text-base sm:text-lg lg:text-xl text-accent mb-4 xs:mb-5 sm:mb-5 lg:mb-6 xl:mb-7 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {getRichTextContent(`contact_intro_${lang}`, 
                  <p>{CONTACT_CONTENT[lang].intro}</p>
                )}
              </motion.div>
              
              {/* Layout responsive pour les contacts - Style Art Déco unifié */}
              <motion.div
                className="flex flex-col lg:grid lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 lg:gap-4 xl:gap-5 mb-4 xs:mb-5 sm:mb-6 lg:mb-6 xl:mb-7"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.a
                  href={`https://wa.me/${getRichTextTitle(`contact_phone_${lang}`, CONTACT_CONTENT[lang].phone).replace(/\s+/g, '')}`}
                  className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <span className="font-title text-sm lg:text-base block mb-1">
                    {getRichTextTitle(`contact_whatsapp_${lang}`, CONTACT_CONTENT[lang].whatsapp)}
                  </span>
                  <span className="font-body text-sm lg:text-base text-accent">
                    {getRichTextTitle(`contact_phone_${lang}`, CONTACT_CONTENT[lang].phone)}
                  </span>
                </motion.a>
                
                <motion.a
                  href={`mailto:${getRichTextTitle(`contact_email_${lang}`, CONTACT_CONTENT[lang].email)}`}
                  className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="font-title text-sm lg:text-base block mb-1">
                    Email
                  </span>
                  <span className="font-body text-sm lg:text-base break-all text-accent leading-tight">
                    {getRichTextTitle(`contact_email_${lang}`, CONTACT_CONTENT[lang].email)}
                  </span>
                </motion.a>
                
                <motion.a
                  href={getRichTextTitle(`contact_website_${lang}`, CONTACT_CONTENT[lang].website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center px-1 xs:px-2 sm:px-2 py-3 xs:py-4 sm:py-4 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 text-center min-h-[65px] xs:min-h-[70px] sm:min-h-[75px]"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <span className="font-title text-sm lg:text-base block mb-1">
                    Site Web
                  </span>
                  <span className="font-body text-sm lg:text-base text-accent">
                    grandbattementdailes.com
                  </span>
                </motion.a>
              </motion.div>

              {/* Boutons d'action */}
              <motion.div
                className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Bouton Billeterie - Style unifié */}
                <motion.a
                  href="#hero"
                  className="w-full xs:w-auto xs:min-w-[100px] sm:min-w-[110px] lg:min-w-[130px] inline-block px-2 xs:px-3 sm:px-3 py-3 xs:py-3 sm:py-4 font-title text-sm lg:text-base uppercase tracking-wider transition-all duration-300 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background text-center"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  {getRichTextTitle(`hero_cta_${lang}`, HERO_CONTENT[lang].cta)}
                </motion.a>

                {/* Bouton Retour en haut - Version rouge */}
                <motion.button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-full xs:w-auto xs:min-w-[100px] sm:min-w-[110px] lg:min-w-[130px] inline-block px-2 xs:px-3 sm:px-3 py-3 xs:py-3 sm:py-4 font-title text-sm lg:text-base uppercase tracking-wider transition-all duration-300 border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-background text-center"
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
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const buildTime = new Date().toISOString();
  
  try {
    // Récupération de la story principale depuis Storyblok
    console.warn('🔍 Tentative de récupération de la story "festival-homepage"...');
    const story = await getStoryblokStory('festival-homepage', getStoryblokVersion());
    
    if (story) {
      console.warn('✅ Story Storyblok récupérée avec succès:', {
        name: story.name,
        content_body_length: story.content?.body?.length || 0,
      });
    } else {
      console.warn('❌ Story Storyblok non trouvée');
    }
    
    const hasStoryblokData = Boolean(
      story && 
      story.content && 
      Array.isArray(story.content.body) && 
      story.content.body.length > 0
    );
    
    // Sérialisation sécurisée pour éviter les problèmes de sérialisation Next.js
    const serializedStory = story ? JSON.parse(JSON.stringify(story)) : null;
    
    return {
      props: {
        story: serializedStory,
        hasStoryblokData,
        buildTime,
      },
      // Revalidation toutes les 60 secondes en production
      revalidate: 60,
    };
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des données Storyblok:', error);
    
    // Retourner des props vides en cas d'erreur
    return {
      props: {
        story: null,
        hasStoryblokData: false,
        buildTime,
      },
      revalidate: 60,
    };
  }
};