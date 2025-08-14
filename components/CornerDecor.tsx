import Image from 'next/image';

/**
 * CornerDecor renders four copies of a decorative corner motif at
 * each corner of the parent container. The images are rotated
 * appropriately so that the orientation of the motif matches the
 * corner. By using pointer-events-none the decorations do not
 * interfere with user interaction. The sizes scale on larger
 * breakpoints for improved proportionality.
 */
export default function CornerDecor() {
  return (
    <>
      <Image
        src="/images/corner_clean.png"
        alt="Art Deco corner ornament"
        width={128}
        height={128}
        className="hidden sm:block absolute top-0 left-0 w-20 h-20 md:w-24 md:h-24 rotate-0 pointer-events-none"
      />
      <Image
        src="/images/corner_clean.png"
        alt="Art Deco corner ornament"
        width={128}
        height={128}
        className="hidden sm:block absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 transform rotate-90 pointer-events-none"
      />
      <Image
        src="/images/corner_clean.png"
        alt="Art Deco corner ornament"
        width={128}
        height={128}
        className="hidden sm:block absolute bottom-0 right-0 w-20 h-20 md:w-24 md:h-24 transform rotate-180 pointer-events-none"
      />
      <Image
        src="/images/corner_clean.png"
        alt="Art Deco corner ornament"
        width={128}
        height={128}
        className="hidden sm:block absolute bottom-0 left-0 w-20 h-20 md:w-24 md:h-24 transform -rotate-90 pointer-events-none"
      />
    </>
  );
}