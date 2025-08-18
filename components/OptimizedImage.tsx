import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { OptimizedImageProps } from '@/types';

/**
 * Optimized image component with loading states and error handling.
 * Provides better UX with skeleton loading and graceful error fallback.
 */
export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  // Séparer les props motion des props d'image
  initial,
  animate,
  whileInView,
  whileHover,
  transition,
  viewport,
  ...imageProps 
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Construire l'objet des props motion seulement si elles sont définies
  const motionProps = {
    ...(initial && { initial }),
    ...(animate && { animate }),
    ...(whileInView && { whileInView }),
    ...(whileHover && { whileHover }),
    ...(transition && { transition }),
    ...(viewport && { viewport })
  };

  if (hasError) {
    return (
      <motion.div 
        className={`bg-black/20 flex items-center justify-center ${className}`}
        {...motionProps}
      >
        <span className="text-primary/60 text-sm">Image unavailable</span>
      </motion.div>
    );
  }

  return (
    <motion.div className="relative inline-block" {...motionProps}>
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`transition-opacity duration-300 ${className} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...imageProps}
      />
    </motion.div>
  );
}