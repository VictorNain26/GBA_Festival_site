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
  const { showFirstBackground, showOrnaments, isCompactMode } = useBackgroundTransition();

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

      {/* Art Deco Ornaments Background - Preserved aspect ratio */}
      <div 
        className={`fixed inset-0 transition-opacity duration-500 ${
          showOrnaments ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          zIndex: 45,
          pointerEvents: 'none'
        }}
      >
        {/* Utilisation de Next.js Image pour préserver le ratio et éviter la pixellisation */}
        <Image
          src={`/images/${isCompactMode ? '1er_quart_transparent.png' : '1er_quart_transparent_horizontal.png'}`}
          alt=""
          fill
          className="object-contain opacity-80"
          quality={100}
          priority={false}
          sizes="100vw"
        />
      </div>
    </>
  );
}