/**
 * Tokens de design pour un système cohérent et esthétique
 * Espacements verticaux, typographie et hiérarchie visuelle
 */

export type BreakpointSize = 'xs' | 'sm' | 'lg' | 'xl';

/**
 * Système d'espacement vertical cohérent
 * Basé sur une échelle harmonique avec ratio doré (1.618) et multiples de 8px
 */
export const VERTICAL_SPACING = {
  // Espacements entre sections (grandes distances)
  section: {
    xs: 'py-16',     // 64px - Mobile 
    sm: 'py-20',     // 80px - Tablette portrait
    lg: 'py-24',     // 96px - Laptop
    xl: 'py-28',     // 112px - Desktop
  },
  
  // Espacements internes aux sections (moyennes distances)
  content: {
    xs: 'py-8',      // 32px - Mobile
    sm: 'py-10',     // 40px - Tablette
    lg: 'py-12',     // 48px - Laptop
    xl: 'py-16',     // 64px - Desktop
  },
  
  // Espacements entre éléments (petites distances)
  element: {
    xs: 'mb-6',      // 24px - Mobile
    sm: 'mb-7',      // 28px - Tablette
    lg: 'mb-8',      // 32px - Laptop
    xl: 'mb-10',     // 40px - Desktop
  },
  
  // Espacements entre paragraphes
  paragraph: {
    xs: 'mb-4',      // 16px - Mobile
    sm: 'mb-5',      // 20px - Tablette
    lg: 'mb-6',      // 24px - Laptop
    xl: 'mb-7',      // 28px - Desktop
  },
  
  // Espacements fins (titres, légendes)
  text: {
    xs: 'mb-2',      // 8px - Mobile
    sm: 'mb-3',      // 12px - Tablette
    lg: 'mb-3',      // 12px - Laptop
    xl: 'mb-4',      // 16px - Desktop
  }
} as const;

/**
 * Système typographique harmonieux
 * Hiérarchie claire avec échelle modulaire
 */
export const TYPOGRAPHY = {
  // Titre principal H1 (Hero)
  heroTitle: {
    xs: 'text-2xl',           // 24px - Mobile
    sm: 'text-3xl',           // 30px - Tablette
    lg: 'text-5xl',           // 48px - Laptop
    xl: 'text-6xl',           // 60px - Desktop
    weight: 'font-title',
    line: 'leading-tight',
    tracking: 'tracking-tight',
  },
  
  // Sous-titre Hero (Festival Art Déco...)
  heroSubtitle: {
    xs: 'text-sm',            // 14px - Mobile
    sm: 'text-base',          // 16px - Tablette
    lg: 'text-lg',            // 18px - Laptop
    xl: 'text-xl',            // 20px - Desktop
    weight: 'font-title',
    line: 'leading-relaxed',
    tracking: 'tracking-wide',
    transform: 'uppercase',
  },
  
  // Titres de section H2
  sectionTitle: {
    xs: 'text-xl',            // 20px - Mobile
    sm: 'text-2xl',           // 24px - Tablette  
    lg: 'text-3xl',           // 30px - Laptop
    xl: 'text-4xl',           // 36px - Desktop
    weight: 'font-title',
    line: 'leading-tight',
    tracking: 'tracking-normal',
  },
  
  // Sous-titres H3
  subsectionTitle: {
    xs: 'text-lg',            // 18px - Mobile
    sm: 'text-xl',            // 20px - Tablette
    lg: 'text-2xl',           // 24px - Laptop
    xl: 'text-3xl',           // 30px - Desktop
    weight: 'font-title',
    line: 'leading-snug',
    tracking: 'tracking-normal',
  },
  
  // Texte de corps principal
  bodyText: {
    xs: 'text-base',          // 16px - Mobile
    sm: 'text-lg',            // 18px - Tablette
    lg: 'text-xl',            // 20px - Laptop
    xl: 'text-2xl',           // 24px - Desktop
    weight: 'font-body',
    line: 'leading-relaxed',
    tracking: 'tracking-normal',
  },
  
  // Texte secondaire (légendes, dates)
  secondaryText: {
    xs: 'text-sm',            // 14px - Mobile
    sm: 'text-base',          // 16px - Tablette
    lg: 'text-lg',            // 18px - Laptop
    xl: 'text-xl',            // 20px - Desktop
    weight: 'font-body',
    line: 'leading-normal',
    tracking: 'tracking-normal',
  },
  
  // Navigation et boutons
  navigationText: {
    xs: 'text-sm',            // 14px - Mobile
    sm: 'text-base',          // 16px - Tablette
    lg: 'text-lg',            // 18px - Laptop
    xl: 'text-xl',            // 20px - Desktop
    weight: 'font-title',
    line: 'leading-normal',
    tracking: 'tracking-normal',
  }
} as const;

/**
 * Génère les classes CSS pour l'espacement vertical
 */
export function getVerticalSpacing(
  type: keyof typeof VERTICAL_SPACING,
  responsive: boolean = true
): string {
  const spacing = VERTICAL_SPACING[type];
  
  if (!responsive) {
    return spacing.lg; // Défaut laptop
  }
  
  return `${spacing.xs} ${spacing.sm} ${spacing.lg} ${spacing.xl}`;
}

/**
 * Génère les classes CSS pour la typographie
 */
export function getTypography(
  type: keyof typeof TYPOGRAPHY,
  responsive: boolean = true
): string {
  const typo = TYPOGRAPHY[type];
  
  const baseClasses = [
    typo.weight,
    typo.line,
    typo.tracking,
    'transform' in typo ? typo.transform : ''
  ].filter(Boolean);
  
  if (!responsive) {
    return [...baseClasses, typo.lg].join(' ');
  }
  
  const responsiveClasses = [
    typo.xs,
    `sm:${typo.sm}`,
    `lg:${typo.lg}`,
    `xl:${typo.xl}`
  ];
  
  return [...baseClasses, ...responsiveClasses].join(' ');
}

/**
 * Classes prêtes à l'emploi pour les cas d'usage fréquents
 */
export const PRESET_CLASSES = {
  // Section complète avec espacement
  section: `${getVerticalSpacing('section')} relative`,
  
  // Container de contenu avec padding horizontal
  container: 'px-6 xs:px-8 sm:px-12 lg:px-20 xl:px-24 max-w-7xl mx-auto',
  
  // Titre de section avec espacement
  sectionTitleWithSpacing: `${getTypography('sectionTitle')} text-accent text-center ${getVerticalSpacing('element')}`,
  
  // Paragraphe de texte avec espacement
  bodyParagraph: `${getTypography('bodyText')} text-primary ${getVerticalSpacing('paragraph')} text-justify`,
  
  // Navigation responsive
  navigationLink: `${getTypography('navigationText')} transition-colors hover:text-accent cursor-pointer`,
  
  // Animation d'entrée standard
  animationEnter: 'initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}'
} as const;