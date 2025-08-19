import { motion } from 'framer-motion';
import { getTypography, getVerticalSpacing } from '@/constants/designTokens';

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
      className={`${getVerticalSpacing('text')} relative z-10`}
      {...getAnimationVariants(0.0)}
    >
      {/* Mobile version: 2 lines */}
      <div className="lg:hidden">
        <p className={`${getTypography('heroSubtitle')} text-accent`}>
          {subtitle}
        </p>
        <p className={`${getTypography('heroSubtitle')} text-accent mt-2`}>
          1ère Edition
        </p>
      </div>
      
      {/* Desktop version: 1 line */}
      <p className={`hidden lg:block ${getTypography('heroSubtitle')} text-accent`}>
        {subtitle} - 1ère Edition
      </p>
    </motion.div>
  );
}