import { motion } from 'framer-motion';
import TitleFrame from './TitleFrame';
import type { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * SectionTitle is a standardized component that combines TitleFrame with
 * consistent animation and styling for all section titles.
 * Ensures uniform appearance and responsive behavior across all sections.
 */
export default function SectionTitle({ 
  children, 
  className = '', 
  delay = 0 
}: SectionTitleProps) {
  return (
    <TitleFrame className={`mx-8 xs:mx-12 sm:mx-16 lg:ml-20 lg:mr-40 xl:ml-24 xl:mr-48 2xl:ml-32 2xl:mr-56 ${className}`}>
      <motion.h2
        className="font-title text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-accent leading-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay }}
        viewport={{ once: true, margin: '-50px' }}
      >
        {children}
      </motion.h2>
    </TitleFrame>
  );
}