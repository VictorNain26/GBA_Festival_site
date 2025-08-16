import { motion } from 'framer-motion';
import Image from 'next/image';
import type { HeroTitleProps } from '@/types';

/**
 * Hero title component with Eiffel Tower and symmetric statues
 * Features symmetric design with mirrored statues and integrated Eiffel Tower
 */
export default function HeroTitle({ getAnimationVariants }: HeroTitleProps) {
  return (
    <div className="relative w-full">
      {/* Desktop Images - Hidden on mobile/tablet with pure CSS */}
      <div className="absolute inset-0 items-center justify-center -z-10 hidden lg:flex">
        {/* Groupe centré contenant Tour Eiffel + Statues */}
        <div className="relative flex items-center justify-center gap-8 md:gap-12 lg:gap-16 xl:gap-20">
          
          {/* Statue Gauche - Desktop */}
          <motion.div
            className="hidden md:block"
            {...getAnimationVariants(0.2)}
          >
            <Image
              src="/images/statue.jpg"
              alt=""
              width={200}
              height={300}
              className="object-contain rounded opacity-85 transition-all duration-500 ease-in-out w-44 h-66 lg:w-48 lg:h-72 xl:w-52 xl:h-78"
            />
          </motion.div>

          {/* Tour Eiffel - Desktop */}
          <motion.div
            className="relative"
            {...getAnimationVariants(0.1)}
          >
            <Image
              src="/images/eiffel.jpg"
              alt=""
              width={240}
              height={360}
              className="object-contain rounded opacity-70 transition-all duration-500 ease-in-out w-40 h-60 md:w-44 md:h-66 lg:w-48 lg:h-72 xl:w-52 xl:h-78"
            />
          </motion.div>

          {/* Statue Droite - Desktop */}
          <motion.div
            className="hidden md:block"
            {...getAnimationVariants(0.2)}
          >
            <Image
              src="/images/statue.jpg"
              alt=""
              width={200}
              height={300}
              className="object-contain rounded opacity-85 transition-all duration-500 ease-in-out w-44 h-66 lg:w-48 lg:h-72 xl:w-52 xl:h-78 scale-x-[-1]"
            />
          </motion.div>
          
        </div>
      </div>

      {/* Titre principal - Espacement adaptatif avec CSS */}
      <div className="relative text-center z-10 py-2 xs:py-3 sm:py-4 md:py-6 lg:py-8 xl:py-12 2xl:py-16">
        <motion.h1
          className="font-title text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-accent px-1 xs:px-2 sm:px-4 relative z-10"
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5)'
          }}
          {...getAnimationVariants(0)}
        >
          Florilege
          <br />
          <span className="block">de l&apos;Art Deco</span>
        </motion.h1>
      </div>

      {/* Mobile/Tablet Images - Hidden on desktop with pure CSS */}
      <motion.div 
        className="relative z-10 flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 mt-1 xs:mt-2 sm:mt-3 md:mt-4 lg:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        
        {/* Statue Gauche - Mobile/Tablet */}
        <motion.div
          className="block"
          {...getAnimationVariants(0.3)}
        >
          <Image
            src="/images/statue.jpg"
            alt=""
            width={200}
            height={300}
            className="object-contain rounded transition-all duration-500 ease-in-out w-14 h-21 xs:w-16 xs:h-24 sm:w-18 sm:h-27 md:w-22 md:h-33 scale-x-[-1]"
          />
        </motion.div>

        {/* Tour Eiffel - Mobile/Tablet */}
        <motion.div
          className="relative"
          {...getAnimationVariants(0.2)}
        >
          <Image
            src="/images/eiffel.jpg"
            alt=""
            width={240}
            height={360}
            className="object-contain rounded transition-all duration-500 ease-in-out w-16 h-24 xs:w-18 xs:h-27 sm:w-20 sm:h-30 md:w-22 md:h-33"
          />
        </motion.div>

        {/* Statue Droite - Mobile/Tablet */}
        <motion.div
          className="block"
          {...getAnimationVariants(0.3)}
        >
          <Image
            src="/images/statue.jpg"
            alt=""
            width={200}
            height={300}
            className="object-contain rounded transition-all duration-500 ease-in-out w-14 h-21 xs:w-16 xs:h-24 sm:w-18 sm:h-27 md:w-22 md:h-33"
          />
        </motion.div>
        
      </motion.div>
    </div>
  );
}
