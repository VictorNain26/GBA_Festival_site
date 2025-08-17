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
      {/* Content with padding only - no frame image */}
      <div className="relative z-10 px-6 xs:px-8 sm:px-10 lg:px-12 xl:px-16 py-6 xs:py-8 sm:py-10 lg:py-12 xl:py-16">
        {children}
      </div>
    </div>
  );
}