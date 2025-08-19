import Image from 'next/image';
import { useBackgroundTransition } from '@/hooks/useBackgroundTransition';

/**
 * Progressive background component with clean transitions:
 * - Hero section: first_background visible
 * - Middle sections: Art Deco ornaments visible
 * - Contact section: first_background visible
 * - No flash during refresh
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
      
      {/* First Background Images - Hero and Contact sections only */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-500 ease-in-out ${
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

      {/* Art Deco Ornaments Background */}
      <div 
        className={`fixed inset-0 transition-opacity duration-500 ${
          showOrnaments ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          zIndex: 45,
          backgroundImage: `url(/images/${isCompactMode ? '1er_quart_transparent.png' : '1er_quart_transparent_horizontal.png'})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          pointerEvents: 'none'
        }}
      />
    </>
  );
}