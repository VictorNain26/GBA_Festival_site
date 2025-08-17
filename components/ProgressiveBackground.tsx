import Image from 'next/image';
import { useBackgroundTransition } from '@/hooks/useBackgroundTransition';

/**
 * Progressive background component with clean transitions:
 * - Desktop (≥1024px): first_background.jpg with object-contain
 * - Compact mode (<1024px): first_background_mobile.jpg with uniform 760px-like behavior
 * - Middle sections: Art Deco ornaments (appear when "À propos" title visible)
 * - Contact section: same responsive image logic
 * - No flash, no superposition, smooth CSS transitions
 */
export default function ProgressiveBackground() {
  const { showFirstBackground, showOrnaments } = useBackgroundTransition();

  return (
    <>
      {/* Permanent black background to prevent white flash during transitions */}
      <div 
        className="fixed inset-0 bg-black"
        style={{ zIndex: -30 }}
      />
      
      {/* First Background Images - CSS-first approach to prevent flash */}
      <div 
        className={`background-container bg-black transition-opacity duration-500 ease-in-out ${
          showFirstBackground ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: -10 }}
      >
        {/* Desktop Image - Hidden on mobile/tablet with CSS */}
        <Image
          src="/images/first_background.jpg"
          alt=""
          fill
          className="object-contain hidden lg:block"
          priority
          quality={90}
        />
        
        {/* Compact Mode Image (Mobile + Tablette < 1024px) - Contenu dans le cadre comme desktop */}
        <Image
          src="/images/first_background_mobile.jpg"
          alt=""
          fill
          className="object-contain block lg:hidden"
          priority
          quality={90}
        />
      </div>

      {/* Art Deco Ornaments Background - Toujours présent, contrôlé par opacity */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-500 ease-in-out ${
          showOrnaments ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: -20 }}
      >
        {/* Art Deco Ornaments */}
        {/* Top-left corner */}
        <div className="fixed top-3 left-3 xs:top-4 xs:left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 z-10 pointer-events-none">
          <Image
            src="/images/corner_clean.png"
            alt=""
            width={128}
            height={128}
            className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 opacity-80"
          />
        </div>

        {/* Top-right corner */}
        <div className="fixed top-3 right-3 xs:top-4 xs:right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-10 pointer-events-none">
          <Image
            src="/images/corner_clean.png"
            alt=""
            width={128}
            height={128}
            className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 opacity-80 rotate-90"
          />
        </div>

        {/* Bottom-right corner */}
        <div className="fixed bottom-3 right-3 xs:bottom-4 xs:right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-10 pointer-events-none">
          <Image
            src="/images/corner_clean.png"
            alt=""
            width={128}
            height={128}
            className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 opacity-80 rotate-180"
          />
        </div>

        {/* Bottom-left corner */}
        <div className="fixed bottom-3 left-3 xs:bottom-4 xs:left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 z-10 pointer-events-none">
          <Image
            src="/images/corner_clean.png"
            alt=""
            width={128}
            height={128}
            className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 opacity-80 -rotate-90"
          />
        </div>
      </div>
    </>
  );
}