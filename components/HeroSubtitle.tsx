import { motion } from 'framer-motion';

interface HeroSubtitleProps {
  subtitle: string;
  getAnimationVariants: (delay: number) => any;
}

/**
 * HeroSubtitle component with responsive layout.
 * Displays subtitle in 2 lines on mobile, 1 line on desktop.
 */
export default function HeroSubtitle({ 
  subtitle, 
  getAnimationVariants 
}: HeroSubtitleProps) {
  return (
    <motion.div
      className="mb-3 xs:mb-4 sm:mb-4 lg:mb-3 xl:mb-4 relative z-10"
      {...getAnimationVariants(0.0)}
    >
      {/* Mobile version: 2 lines */}
      <div className="lg:hidden">
        <p className="font-title text-sm lg:text-base uppercase tracking-wide xs:tracking-wider text-accent">
          {subtitle}
        </p>
        <p className="font-title text-sm lg:text-base uppercase tracking-wide xs:tracking-wider text-accent mt-1">
          1ère Edition
        </p>
      </div>
      
      {/* Desktop version: 1 line */}
      <p className="hidden lg:block font-title text-base lg:text-lg uppercase tracking-wide text-accent">
        {subtitle} - 1ère Edition
      </p>
    </motion.div>
  );
}