import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Frame from '@/components/Frame';
import OptimizedImage from '@/components/OptimizedImage';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page non trouvée - Florilège de l&apos;Art Déco</title>
        <meta name="description" content="Page non trouvée - Festival Art Déco et Neo Art Déco" />
      </Head>

      {/* Background fixe avec ornements Art Déco */}
      <div className="fixed inset-0 bg-background">
        {/* Ornements dans les coins */}
        <div className="absolute top-4 left-4 xs:top-6 xs:left-6 lg:top-8 lg:left-8">
          <OptimizedImage
            src="/images/corner_clean.png"
            alt="Art Déco ornament"
            width={80}
            height={80}
            className="w-12 h-12 xs:w-16 xs:h-16 lg:w-20 lg:h-20 object-contain opacity-30"
            priority
          />
        </div>
        
        <div className="absolute top-4 right-4 xs:top-6 xs:right-6 lg:top-8 lg:right-8">
          <OptimizedImage
            src="/images/corner_clean.png"
            alt="Art Déco ornament"
            width={80}
            height={80}
            className="w-12 h-12 xs:w-16 xs:h-16 lg:w-20 lg:h-20 object-contain opacity-30 transform rotate-90"
            priority
          />
        </div>
        
        <div className="absolute bottom-4 left-4 xs:bottom-6 xs:left-6 lg:bottom-8 lg:left-8">
          <OptimizedImage
            src="/images/corner_clean.png"
            alt="Art Déco ornament"
            width={80}
            height={80}
            className="w-12 h-12 xs:w-16 xs:h-16 lg:w-20 lg:h-20 object-contain opacity-30 transform -rotate-90"
            priority
          />
        </div>
        
        <div className="absolute bottom-4 right-4 xs:bottom-6 xs:right-6 lg:bottom-8 lg:right-8">
          <OptimizedImage
            src="/images/corner_clean.png"
            alt="Art Déco ornament"
            width={80}
            height={80}
            className="w-12 h-12 xs:w-16 xs:h-16 lg:w-20 lg:h-20 object-contain opacity-30 transform rotate-180"
            priority
          />
        </div>
      </div>

      {/* Contenu principal */}
      <main className="relative min-h-screen flex items-center justify-center px-4 xs:px-6 sm:px-8">
        <Frame className="w-full max-w-2xl mx-auto">
          <div className="text-center py-12 xs:py-16 sm:py-20 lg:py-24">
            
            {/* Numéro 404 en grand */}
            <motion.div
              className="mb-8 xs:mb-10 sm:mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-title text-6xl xs:text-7xl sm:text-8xl lg:text-9xl text-primary leading-none">
                404
              </h1>
            </motion.div>

            {/* Titre avec style Art Déco */}
            <motion.div
              className="mb-6 xs:mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-title text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-primary mb-4">
                Page Introuvable
              </h2>
              <div className="w-24 xs:w-32 sm:w-40 h-0.5 bg-accent mx-auto"></div>
            </motion.div>

            {/* Message d'erreur élégant */}
            <motion.div
              className="mb-8 xs:mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="font-body text-lg xs:text-xl sm:text-2xl text-primary leading-relaxed mb-4">
                Cette page s&apos;est échappée de notre époque...
              </p>
              <p className="font-body text-base xs:text-lg sm:text-xl text-primary/80 leading-relaxed">
                Comme les splendeurs des <span className="text-accent">Années Folles</span>, 
                certains trésors restent introuvables.
              </p>
            </motion.div>

            {/* Boutons d'action avec style Art Déco */}
            <motion.div
              className="flex flex-col xs:flex-row items-center justify-center gap-4 xs:gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Bouton retour accueil */}
              <Link href="/">
                <motion.div
                  className="w-full xs:w-auto px-6 xs:px-8 sm:px-10 py-3 xs:py-4 font-title text-sm xs:text-base sm:text-lg uppercase tracking-wider border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-background transition-all duration-300 cursor-pointer text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Retour à l&apos;Accueil
                </motion.div>
              </Link>

              {/* Bouton billeterie */}
              <motion.div
                className="w-full xs:w-auto px-6 xs:px-8 sm:px-10 py-3 xs:py-4 font-title text-sm xs:text-base sm:text-lg uppercase tracking-wider border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-background transition-all duration-300 cursor-pointer text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Découvrir le Festival
              </motion.div>
            </motion.div>


          </div>
        </Frame>
      </main>
    </>
  );
}