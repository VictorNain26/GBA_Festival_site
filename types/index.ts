// Global types for the festival site

/* Language and Content Types */
export type Language = 'fr' | 'en';

/* Animation Types */
export interface AnimationVariants {
  initial: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  animate: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  transition: {
    duration: number;
    delay?: number;
    ease?: string;
  };
}

export interface GetAnimationVariants {
  (delay?: number): {
    initial: { opacity: number; y?: number };
    whileInView: { opacity: number; y?: number };
    transition: { duration: number; delay?: number };
  };
}

/* Content Structure Types */
export interface LocalizedContent {
  fr: string;
  en: string;
}

export interface NavigationLabels {
  hero: string;
  about: string;
  partners: string;
  ontheway: string;
  decoball: string;
  contact: string;
  tickets: string;
}

export interface HeroContent {
  title: React.ReactNode;
  subtitle: string;
  date: string;
  location: string;
  cta: string;
}

export interface PartnerCategory {
  key: string;
  title: LocalizedContent;
  desc: LocalizedContent;
}

export interface ContactContent {
  heading: string;
  intro: string;
  phone: string;
  email: string;
  website: string;
  whatsapp: string;
}

/* Component Props Types */
export interface ResponsiveNavigationProps {
  labels: NavigationLabels;
  lang: Language;
  setLang: (lang: Language) => void;
  isCompactMode: boolean;
}

export interface HeaderProps {
  labels: NavigationLabels;
  lang: Language;
  setLang: (lang: Language) => void;
}

export interface HeroTitleProps {
  getAnimationVariants: GetAnimationVariants;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface FrameProps {
  children: React.ReactNode;
  className?: string;
}

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  [key: string]: unknown; // Pour les props spread
}

/* Hook Return Types */
export interface UseBackgroundTransitionReturn {
  showFirstBackground: boolean;
  showOrnaments: boolean;
  showNavigation: boolean;
  scrollY: number;
  windowHeight: number;
  isCompactMode: boolean;
}

export interface UseActiveSectionReturn {
  activeSection: string;
}

export interface UseReducedMotionReturn {
  prefersReducedMotion: boolean;
}

export interface UseBrowserLanguageReturn {
  detectedLanguage: Language;
}

/* Framer Motion Types */
export interface MotionProps {
  initial?: { opacity?: number; y?: number; x?: number; scale?: number };
  animate?: { opacity?: number; y?: number; x?: number; scale?: number };
  whileInView?: { opacity?: number; y?: number; x?: number; scale?: number };
  whileHover?: { opacity?: number; y?: number; x?: number; scale?: number };
  transition?: { duration?: number; delay?: number; ease?: string };
  viewport?: { once?: boolean; margin?: string };
}

/* Next.js specific types */
export interface NextImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
}

/* No need for global Window declarations - they already exist in DOM types */