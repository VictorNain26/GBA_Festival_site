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
      {/* Container absolu pour centrer parfaitement dans la section hero */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        {/* Groupe centré contenant Tour Eiffel + Statues */}
        <div className="relative flex items-center justify-center gap-8 md:gap-12 lg:gap-16 xl:gap-20">
          
          {/* Statue Gauche - Agrandie et plus éloignée */}
          <motion.div
            className="hidden md:block"
            {...getAnimationVariants(0.2)}
          >
            <Image
              src="/images/statue.jpg"
              alt=""
              width={200}
              height={300}
              className="w-44 h-66 lg:w-48 lg:h-72 xl:w-52 xl:h-78 object-contain rounded opacity-85"
            />
          </motion.div>

          {/* Tour Eiffel - Centrée */}
          <motion.div
            className="relative"
            {...getAnimationVariants(0.1)}
          >
            <Image
              src="/images/eiffel.jpg"
              alt=""
              width={240}
              height={360}
              className="w-56 h-84 md:w-64 md:h-96 lg:w-72 lg:h-108 xl:w-80 xl:h-120 object-contain rounded opacity-70"
            />
          </motion.div>

          {/* Statue Droite - Agrandie et plus éloignée (mirroir) */}
          <motion.div
            className="hidden md:block"
            {...getAnimationVariants(0.2)}
          >
            <Image
              src="/images/statue.jpg"
              alt=""
              width={200}
              height={300}
              className="w-44 h-66 lg:w-48 lg:h-72 xl:w-52 xl:h-78 object-contain rounded opacity-85 scale-x-[-1]"
            />
          </motion.div>
          
        </div>
      </div>

      {/* Titre principal au premier plan */}
      <div className="relative text-center z-10 py-12 md:py-16 lg:py-20">
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

      {/* Note: Statues mobiles retirées - design différent prévu pour mobile */}
    </div>
  );
}
