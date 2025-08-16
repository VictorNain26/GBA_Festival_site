import Image from 'next/image';
import { useState } from 'react';
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
  ...props 
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`bg-black/20 flex items-center justify-center ${className}`}>
        <span className="text-primary/60 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 animate-pulse rounded" />
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
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
}