import { ReactNode } from 'react';
import SectionTitle from './SectionTitle';

interface SectionGroupProps {
  id: string;
  title: ReactNode;
  children: ReactNode;
  titleDelay?: number;
}

/**
 * SectionGroup combines a title and content section with optimized spacing.
 * Reduces visual gap between related title and content while maintaining
 * proper navigation anchoring.
 */
export default function SectionGroup({ 
  id, 
  title, 
  children, 
  titleDelay = 0 
}: SectionGroupProps) {
  return (
    <div className="relative">
      {/* Title section with navigation anchor */}
      <section id={id} className="relative flex flex-col justify-center py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28">
        <SectionTitle delay={titleDelay}>
          {title}
        </SectionTitle>
      </section>

      {/* Content section with reduced top spacing */}
      <section className="relative py-0 pb-8 xs:pb-10 sm:pb-12 lg:pb-16 xl:pb-20">
        <div className="max-w-none mx-8 xs:mx-12 sm:mx-16 lg:ml-20 lg:mr-40 xl:ml-24 xl:mr-48 2xl:ml-32 2xl:mr-56">
          {children}
        </div>
      </section>
    </div>
  );
}