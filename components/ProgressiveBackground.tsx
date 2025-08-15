import Image from 'next/image';
import { useBackgroundTransition } from '@/hooks/useBackgroundTransition';

/**
 * Progressive background component with clean transitions:
 * - Hero section: first_background.jpg
 * - Middle sections: Art Deco ornaments (appear when "À propos" title visible)
 * - Contact section: first_background.jpg
 * - No flash, no superposition, smooth CSS transitions
 */
export default function ProgressiveBackground() {
  const { showFirstBackground, showOrnaments } = useBackgroundTransition();

  return (
    <>
      {/* First Background Image - Toujours présent, contrôlé par opacity */}
      <div 
        className={`fixed inset-0 -z-20 transition-opacity duration-500 ease-in-out ${
          showFirstBackground ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src="/images/first_background.jpg"
          alt=""
          fill
          className="object-contain scale-105"
          priority
          quality={90}
        />
      </div>

      {/* Art Deco Ornaments Background - Toujours présent, contrôlé par opacity */}
      <div 
        className={`fixed inset-0 -z-10 bg-black transition-opacity duration-500 ease-in-out ${
          showOrnaments ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Art Deco Ornaments */}
        {/* Top-left corner */}
        <div className="fixed top-3 left-3 xs:top-4 xs:left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-10 pointer-events-none">
          <Image
            src="/images/corner_clean.png"
            alt=""
            width={128}
            height={128}
            className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 opacity-80"
          />
        </div>

        {/* Top-right corner */}
        <div className="fixed top-3 right-3 xs:top-4 xs:right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-10 pointer-events-none">
          <Image
            src="/images/corner_clean.png"
            alt=""
            width={128}
            height={128}
            className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 opacity-80 rotate-90"
          />
        </div>

        {/* Bottom-right corner */}
        <div className="fixed bottom-3 right-3 xs:bottom-4 xs:right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-10 pointer-events-none">
          <Image
            src="/images/corner_clean.png"
            alt=""
            width={128}
            height={128}
            className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 opacity-80 rotate-180"
          />
        </div>

        {/* Bottom-left corner */}
        <div className="fixed bottom-3 left-3 xs:bottom-4 xs:left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-10 pointer-events-none">
          <Image
            src="/images/corner_clean.png"
            alt=""
            width={128}
            height={128}
            className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 opacity-80 -rotate-90"
          />
        </div>
      </div>
    </>
  );
}