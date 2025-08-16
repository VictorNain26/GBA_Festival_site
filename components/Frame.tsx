import Image from 'next/image';
import type { FrameProps } from '@/types';

/**
 * Frame is a simple wrapper that draws an Art Deco border around
 * arbitrary content using a semi‑transparent PNG extracted from
 * the supplied presentation. The component accepts a className
 * prop which can be used to control its sizing and layout.
 */
export default function Frame({ children, className = '' }: FrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Frame graphic */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/partners_frame.png"
          alt="Decorative frame"
          fill
          className="object-contain"
        />
      </div>
      <div className="relative z-10 p-6 sm:p-8 md:p-12">
        {children}
      </div>
    </div>
  );
}