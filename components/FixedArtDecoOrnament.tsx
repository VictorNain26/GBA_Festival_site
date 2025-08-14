import Image from 'next/image';

/**
 * Fixed Art Deco ornaments positioned at all four corners.
 * These decorative elements remain fixed and don't scroll with content.
 */
export default function FixedArtDecoOrnament() {
  return (
    <>
      {/* Top-left corner */}
      <div className="fixed top-0 left-0 z-30 pointer-events-none">
        <Image
          src="/images/corner_clean.png"
          alt="Art Deco corner ornament"
          width={128}
          height={128}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 opacity-50 md:opacity-60"
          priority
        />
      </div>

      {/* Top-right corner */}
      <div className="fixed top-0 right-0 z-20 pointer-events-none">
        <Image
          src="/images/corner_clean.png"
          alt="Art Deco corner ornament"
          width={128}
          height={128}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 opacity-50 md:opacity-60 transform rotate-90"
        />
      </div>

      {/* Bottom-right corner */}
      <div className="fixed bottom-0 right-0 z-20 pointer-events-none">
        <Image
          src="/images/corner_clean.png"
          alt="Art Deco corner ornament"
          width={128}
          height={128}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 opacity-50 md:opacity-60 transform rotate-180"
        />
      </div>

      {/* Bottom-left corner */}
      <div className="fixed bottom-0 left-0 z-30 pointer-events-none">
        <Image
          src="/images/corner_clean.png"
          alt="Art Deco corner ornament"
          width={128}
          height={128}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 opacity-50 md:opacity-60 transform -rotate-90"
        />
      </div>
    </>
  );
}