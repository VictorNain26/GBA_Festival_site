import Image from 'next/image';
import type { FrameProps } from '@/types';

/**
 * TitleFrame is a specialized component for section titles with decorative frame.
 * Features responsive sizing that adapts to content length and screen size.
 * Uses partners_frame.png as background decoration with proper aspect ratio.
 */
export default function TitleFrame({ children, className = '' }: FrameProps) {
  return (
    <div className={`relative flex justify-center ${className}`}>
      {/* Container sized by the frame image */}
      <div className="relative">
        {/* Frame decoration layer that determines the size */}
        <div className="relative w-96 h-36 xs:w-[28rem] xs:h-40 sm:w-[32rem] sm:h-48 lg:w-[36rem] lg:h-64 xl:w-[40rem] xl:h-72">
          <Image
            src="/images/partners_frame.png"
            alt="Decorative frame"
            fill
            className="object-contain opacity-90"
            sizes="(max-width: 640px) 450px, (max-width: 1024px) 550px, 800px"
          />
        </div>
        
        {/* Content layer that adapts to the frame size */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6 xs:px-8 sm:px-12 lg:px-16 xl:px-20 py-3 xs:py-4 sm:py-6 lg:py-8 xl:py-10">
          <div className="text-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}