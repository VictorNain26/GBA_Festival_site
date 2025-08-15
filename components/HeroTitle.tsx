import { motion } from 'framer-motion';
import Image from 'next/image';
import type { HeroTitleProps } from '@/types';

/**
 * Hero title component with Eiffel Tower and symmetric statues
 * Features symmetric design with mirrored statues and integrated Eiffel Tower
 */
export default function HeroTitle({ getAnimationVariants, isCompactMode }: HeroTitleProps) {
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
              className="object-contain rounded opacity-70 transition-all duration-500 ease-in-out w-56 h-84 md:w-64 md:h-96 lg:w-72 lg:h-108 xl:w-80 xl:h-120"
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
      <div className="relative text-center z-10 py-4 md:py-6 lg:py-8 xl:py-12 2xl:py-16">
        <motion.h1
          className="font-title text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-accent px-4 relative z-10"
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
        className="relative z-10 flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-2 sm:mt-4 md:mt-6 lg:hidden"
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
            className="object-contain rounded transition-all duration-500 ease-in-out w-20 h-30 sm:w-24 sm:h-36 md:w-26 md:h-39 scale-x-[-1]"
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
            className="object-contain rounded transition-all duration-500 ease-in-out w-24 h-36 sm:w-28 sm:h-42 md:w-32 md:h-48"
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
            className="object-contain rounded transition-all duration-500 ease-in-out w-20 h-30 sm:w-24 sm:h-36 md:w-26 md:h-39"
          />
        </motion.div>
        
      </motion.div>
    </div>
  );
}
