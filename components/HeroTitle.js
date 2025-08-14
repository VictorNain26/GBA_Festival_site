import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Hero title component with Eiffel Tower and symmetric statues
 * Features symmetric design with mirrored statues and integrated Eiffel Tower
 */
export default function HeroTitle({ getAnimationVariants }) {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      {/* Symmetric Statues */}
      <motion.div 
        className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 hidden lg:block"
        {...getAnimationVariants(0.1)}
      >
        <Image
          src="/images/statue.jpg"
          alt=""
          width={120}
          height={180}
          className="w-16 h-24 xl:w-20 xl:h-30 object-cover rounded opacity-80"
        />
      </motion.div>

      <motion.div 
        className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 hidden lg:block"
        {...getAnimationVariants(0.1)}
      >
        <Image
          src="/images/statue.jpg"
          alt=""
          width={120}
          height={180}
          className="w-16 h-24 xl:w-20 xl:h-30 object-cover rounded opacity-80 scale-x-[-1]"
        />
      </motion.div>

      {/* Main Title Container */}
      <div className="relative text-center">
        {/* Eiffel Tower - Positioned behind the title */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
          {...getAnimationVariants(0.3)}
        >
          <Image
            src="/images/eiffel.jpg"
            alt=""
            width={200}
            height={300}
            className="w-32 h-48 md:w-40 md:h-60 lg:w-48 lg:h-72 object-cover opacity-20 rounded"
          />
        </motion.div>

        {/* Title Text */}
        <motion.h1
          className="font-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-accent mb-6 md:mb-8 px-4 relative z-10"
          {...getAnimationVariants(0)}
        >
          Florilège
          <br />
          <span className="block">de l&apos;Art Déco</span>
        </motion.h1>

        {/* Decorative elements around title */}
        <motion.div 
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          {...getAnimationVariants(0.2)}
        />
        <motion.div 
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          {...getAnimationVariants(0.2)}
        />
      </div>

      {/* Mobile Statues - Smaller and positioned differently */}
      <motion.div 
        className="absolute bottom-0 left-4 lg:hidden"
        {...getAnimationVariants(0.4)}
      >
        <Image
          src="/images/statue.jpg"
          alt=""
          width={80}
          height={120}
          className="w-8 h-12 sm:w-10 sm:h-15 object-cover rounded opacity-60"
        />
      </motion.div>

      <motion.div 
        className="absolute bottom-0 right-4 lg:hidden"
        {...getAnimationVariants(0.4)}
      >
        <Image
          src="/images/statue.jpg"
          alt=""
          width={80}
          height={120}
          className="w-8 h-12 sm:w-10 sm:h-15 object-cover rounded opacity-60 scale-x-[-1]"
        />
      </motion.div>
    </div>
  );
}