/**
 * Composant pour les images du Hero (Tour Eiffel et Statues)
 * DRY : Évite la duplication du code d'images répétées
 * SRP : Responsabilité unique d'affichage des images hero
 */

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  delay?: number;
}

interface HeroImageSetProps {
  variant: 'mobile' | 'desktop';
  getAnimationVariants: (delay?: number) => any;
}

/**
 * Configuration des images Hero (DRY)
 */
const IMAGE_CONFIGS = {
  mobile: {
    statue: {
      src: "/images/statue.jpg",
      alt: "",
      width: 200,
      height: 300,
      className: "object-contain transition-all duration-500 ease-in-out w-14 h-21 xs:w-16 xs:h-24 sm:w-18 sm:h-27 md:w-20 md:h-30"
    },
    eiffel: {
      src: "/images/eiffel.jpg", 
      alt: "",
      width: 240,
      height: 360,
      className: "object-contain transition-all duration-500 ease-in-out w-16 h-24 xs:w-18 xs:h-27 sm:w-20 sm:h-30 md:w-22 md:h-33"
    }
  },
  desktop: {
    statue: {
      src: "/images/statue.jpg",
      alt: "",
      width: 200,
      height: 300,
      className: "object-contain opacity-85 transition-all duration-500 ease-in-out w-38 h-57 lg:w-42 lg:h-63 xl:w-46 xl:h-69 2xl:w-50 2xl:h-75"
    },
    eiffel: {
      src: "/images/eiffel.jpg",
      alt: "",
      width: 240,
      height: 360, 
      className: "object-contain opacity-70 transition-all duration-500 ease-in-out w-38 h-57 lg:w-42 lg:h-63 xl:w-46 xl:h-69 2xl:w-50 2xl:h-75"
    }
  }
} as const;

/**
 * Composant d'image animée réutilisable (DRY)
 */
function AnimatedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  delay = 0.2,
  getAnimationVariants,
  flipped = false 
}: ImageProps & { 
  getAnimationVariants: (delay?: number) => any;
  flipped?: boolean;
}) {
  return (
    <motion.div
      className="block"
      {...getAnimationVariants(delay)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${flipped ? 'scale-x-[-1]' : ''}`}
      />
    </motion.div>
  );
}

/**
 * Set d'images Hero avec variantes responsive
 * Architecture SOLID et DRY
 */
export default function HeroImageSet({ variant, getAnimationVariants }: HeroImageSetProps) {
  const config = IMAGE_CONFIGS[variant];
  
  if (variant === 'mobile') {
    return (
      <motion.div 
        className="flex items-center justify-center gap-3 xs:gap-4 sm:gap-5 md:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <AnimatedImage 
          {...config.statue}
          getAnimationVariants={getAnimationVariants}
          delay={0.3}
          flipped
        />
        
        <motion.div className="relative" {...getAnimationVariants(0.2)}>
          <Image 
            src={config.eiffel.src}
            alt={config.eiffel.alt}
            width={config.eiffel.width}
            height={config.eiffel.height}
            className={config.eiffel.className}
          />
        </motion.div>
        
        <AnimatedImage 
          {...config.statue}
          getAnimationVariants={getAnimationVariants}
          delay={0.3}
        />
      </motion.div>
    );
  }

  // Desktop variant
  return (
    <motion.div 
      className="flex items-end justify-center gap-16 lg:gap-20 xl:gap-24 2xl:gap-28"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <AnimatedImage 
        {...config.statue}
        getAnimationVariants={getAnimationVariants}
        delay={0.2}
        flipped
      />
      
      <motion.div className="relative" {...getAnimationVariants(0.1)}>
        <Image 
          src={config.eiffel.src}
          alt={config.eiffel.alt}
          width={config.eiffel.width}
          height={config.eiffel.height}
          className={config.eiffel.className}
        />
      </motion.div>
      
      <AnimatedImage 
        {...config.statue}
        getAnimationVariants={getAnimationVariants}
        delay={0.2}
      />
    </motion.div>
  );
}