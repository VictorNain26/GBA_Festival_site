import { motion } from 'framer-motion';
import Image from 'next/image';
import type { HeroTitleProps } from '@/types';
import { getTypography } from '@/constants/designTokens';
import { formatTitleWithLineBreaks } from '@/utils/titleFormatter';

interface ExtendedHeroTitleProps extends HeroTitleProps {
  title: React.ReactNode;
}

/**
 * Hero title component with Eiffel Tower and symmetric statues
 * Desktop: Title overlays the Eiffel Tower, Mobile: Images below title
 */
export default function HeroTitle({ getAnimationVariants, title }: ExtendedHeroTitleProps) {
  // Formater le titre avec des sauts de ligne automatiques
  const formattedTitle = typeof title === 'string' ? formatTitleWithLineBreaks(title) : title;
  return (
    <div className="flex flex-col items-center">
      {/* Mobile/Tablet - Titre puis images */}
      <div className="lg:hidden flex flex-col items-center">
        {/* Titre principal - Mobile/Tablet */}
        <motion.h1
          className={`${getTypography('heroTitle')} text-accent text-center mb-6 xs:mb-8 sm:mb-10 lg:mb-12 whitespace-pre-line`}
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5)'
          }}
          {...getAnimationVariants(0)}
        >
          {formattedTitle}
        </motion.h1>

        {/* Images - Mobile/Tablet */}
        <motion.div 
          className="flex items-center justify-center gap-3 xs:gap-4 sm:gap-5 md:gap-6"
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
              className="object-contain transition-all duration-500 ease-in-out w-14 h-21 xs:w-16 xs:h-24 sm:w-18 sm:h-27 md:w-20 md:h-30 scale-x-[-1]"
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
              className="object-contain transition-all duration-500 ease-in-out w-16 h-24 xs:w-18 xs:h-27 sm:w-20 sm:h-30 md:w-22 md:h-33"
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
              className="object-contain transition-all duration-500 ease-in-out w-14 h-21 xs:w-16 xs:h-24 sm:w-18 sm:h-27 md:w-20 md:h-30"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop - Images avec titre superposé */}
      <div className="hidden lg:block relative">
        {/* Images Desktop avec titre superposé */}
        <motion.div 
          className="flex items-end justify-center gap-16 lg:gap-20 xl:gap-24 2xl:gap-28"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Statue Gauche - Desktop */}
          <motion.div
            className="block"
            {...getAnimationVariants(0.2)}
          >
            <Image
              src="/images/statue.jpg"
              alt=""
              width={200}
              height={300}
              className="object-contain opacity-85 transition-all duration-500 ease-in-out w-38 h-57 lg:w-42 lg:h-63 xl:w-46 xl:h-69 2xl:w-50 2xl:h-75 scale-x-[-1]"
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
              className="object-contain opacity-70 transition-all duration-500 ease-in-out w-38 h-57 lg:w-42 lg:h-63 xl:w-46 xl:h-69 2xl:w-50 2xl:h-75"
            />
          </motion.div>

          {/* Statue Droite - Desktop */}
          <motion.div
            className="block"
            {...getAnimationVariants(0.2)}
          >
            <Image
              src="/images/statue.jpg"
              alt=""
              width={200}
              height={300}
              className="object-contain opacity-85 transition-all duration-500 ease-in-out w-38 h-57 lg:w-42 lg:h-63 xl:w-46 xl:h-69 2xl:w-50 2xl:h-75"
            />
          </motion.div>
        </motion.div>

        {/* Titre principal superposé - Desktop uniquement */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.h1
            className={`${getTypography('heroTitle')} text-accent text-center whitespace-pre-line`}
            style={{
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9), 0 0 15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 0, 0, 0.5)'
            }}
            {...getAnimationVariants(0)}
          >
            {formattedTitle}
          </motion.h1>
        </div>
      </div>
    </div>
  );
}