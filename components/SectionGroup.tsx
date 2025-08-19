import { ReactNode } from 'react';
import SectionTitle from './SectionTitle';
import { getVerticalSpacing, getTypography } from '@/constants/designTokens';

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
      <section id={id} className={`relative flex flex-col justify-center ${getVerticalSpacing('section')}`}>
        <SectionTitle delay={titleDelay}>
          {title}
        </SectionTitle>
        {subtitle && (
          <div className={`text-center ${getVerticalSpacing('text')}`}>
            <p className={`${getTypography('secondaryText')} text-primary uppercase tracking-wider`}>
              {subtitle}
            </p>
          </div>
        )}
      </section>

      {/* Content section with reduced top spacing */}
      <section className={`relative py-0 ${getVerticalSpacing('content')}`}>
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