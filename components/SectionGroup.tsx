import { ReactNode } from 'react';
import SectionTitle from './SectionTitle';

interface SectionGroupProps {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  titleDelay?: number;
  isCompactMode?: boolean;
}

/**
 * SectionGroup combines a title and content section with optimized spacing.
 * Reduces visual gap between related title and content while maintaining
 * proper navigation anchoring.
 */
export default function SectionGroup({ 
  id, 
  title, 
  subtitle,
  children, 
  titleDelay = 0,
  isCompactMode = false
}: SectionGroupProps) {
  return (
    <div className="relative">
      {/* Title section with navigation anchor */}
      <section id={id} className="relative flex flex-col justify-center py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28">
        <SectionTitle delay={titleDelay}>
          {title}
        </SectionTitle>
        {subtitle && (
          <div className="text-center mt-3 xs:mt-4 sm:mt-5 lg:mt-6">
            <p className="font-body text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl text-primary uppercase tracking-wider">
              {subtitle}
            </p>
          </div>
        )}
      </section>

      {/* Content section with reduced top spacing */}
      <section className="relative py-0 pb-8 xs:pb-10 sm:pb-12 lg:pb-16 xl:pb-20">
        <div className={`max-w-none mx-8 xs:mx-12 sm:mx-16 lg:ml-20 xl:ml-24 2xl:ml-32 ${
          !isCompactMode 
            ? 'lg:mr-56 xl:mr-64 2xl:mr-72' 
            : 'lg:mr-40 xl:mr-48 2xl:mr-56'
        }`}>
          {children}
        </div>
      </section>
    </div>
  );
}