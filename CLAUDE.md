# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a festival site for "Florilège de l'Art Déco" - an Art Deco and Neo Art Deco festival website built with Next.js. The site features a bilingual (French/English) single-page application with smooth scroll navigation, animated sections, and Art Deco themed design.

## Technology Stack

- **Framework**: Next.js 15.4.6 with React 19.1.1
- **Package Manager**: pnpm 9.0.0 (configured in packageManager field)
- **Styling**: Tailwind CSS 3.4.17 with custom Art Deco theme
- **Animation**: Framer Motion 11.18.2 for scroll animations and transitions
- **Images**: Next.js Image component with optimization disabled (all assets are local)
- **Typography**: Custom fonts (ReprizacBold and TwCenMTCondensed) served from `/public/fonts/`

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Linting and quality checks
pnpm lint
pnpm lint:strict
pnpm lint:fix

# Testing
pnpm test
pnpm test:watch
pnpm test:coverage

# Clean rebuild (useful for deployment issues)
pnpm clean
pnpm fresh-install
```

**Package Manager**: This project uses pnpm as the package manager, configured via the `packageManager` field in package.json.

## Architecture Overview

### Project Structure
- `pages/` - Next.js pages (App Router not used)
  - `_app.tsx` - Global app wrapper and CSS imports
  - `index.tsx` - Main landing page component
- `components/` - Reusable React components
  - `ResponsiveNavigation.tsx` - Mobile/desktop navigation
  - `ProgressiveBackground.tsx` - Dynamic background system
  - `HeroTitle.tsx` - Animated main title
  - `Frame.tsx` - Art Deco border wrapper
  - `OptimizedImage.tsx` - Image component
  - `ErrorBoundary.tsx` - Error handling
- `hooks/` - Custom React hooks
  - `useActiveSection.ts` - Navigation active section tracking
  - `useBackgroundTransition.ts` - Background state management
  - `useBrowserLanguage.ts` - Language detection
  - `useReducedMotion.ts` - Accessibility motion preferences
- `constants/` - Static content and configuration
- `types/` - TypeScript type definitions
- `styles/` - Global CSS and Tailwind configuration
- `public/` - Static assets (fonts, images)

### Key Components
- **ResponsiveNavigation**: Mobile hamburger and desktop sidebar navigation
- **ProgressiveBackground**: Dynamic background switching with Art Deco ornaments
- **Frame**: Art Deco border wrapper using decorative PNG overlay

### Content Architecture
The main page (`pages/index.tsx`) uses a data-driven approach with content objects for bilingual support:

- Content is structured in objects with `fr` and `en` keys
- Navigation labels, hero content, section content all follow this pattern
- Highlighted text uses `<span className="text-accent">` for accent coloring
- Content supports JSX for inline formatting and emphasis

### Design System
Tailwind configuration in `tailwind.config.js` defines:
- **Colors**: 
  - `background`: #000000 (black)
  - `primary`: #D3AA41 (golden hue)
  - `accent`: #E55B45 (warm red accent)
- **Typography**:
  - `font-title`: ReprizacBold for headings
  - `font-body`: TwCenMTCondensed for body text

## ⚠️ IMPORTANT STYLING RULE

**NEVER CREATE CUSTOM CSS CLASSES** - This project uses **EXCLUSIVELY TAILWIND CSS**. 

- ❌ **NO custom CSS classes** in `globals.css` 
- ❌ **NO !important declarations**
- ❌ **NO CSS-in-JS solutions**
- ✅ **ONLY Tailwind utility classes**
- ✅ Use Tailwind's responsive prefixes: `xs:`, `sm:`, `lg:`, `xl:`
- ✅ Use Tailwind's spacing, colors, and layout utilities
- ✅ Combine Tailwind classes for complex layouts

If Tailwind classes don't work as expected, investigate:
1. Class name conflicts or typos
2. Specificity issues (use more specific Tailwind combinations)
3. Purge/content configuration in `tailwind.config.js`
4. Missing responsive prefixes

## Key Development Patterns

### Bilingual Content Management
```javascript
const content = {
  fr: { title: "Titre français", /* ... */ },
  en: { title: "English title", /* ... */ }
};

// Usage
{content[lang].title}
```

### Animation Patterns
The site uses consistent Framer Motion patterns:
- `initial={{ opacity: 0, y: 40 }}` for fade-in from below
- `whileInView` triggers for scroll-based animations
- Staggered delays for sequential element animations
- `whileHover={{ scale: 1.05 }}` for hover effects

### Image Handling
- All images are stored in `/public/images/`
- Next.js Image component used with `fill` and `object-cover` for responsive layouts
- Image optimization is disabled in `next.config.js` for simplicity

### Responsive Design
- Mobile-first approach using Tailwind custom breakpoints:
  - `xs`: 480px (mobile large/phablet)
  - `sm`: 640px (tablet portrait)
  - `md`: 768px (tablet landscape) 
  - `lg`: 1024px (laptop/desktop)
  - `xl`: 1280px (desktop standard)
- Progressive enhancement pattern: `xs: → sm: → lg:` (md: removed to fix conflicts)
- Navigation adapts: hamburger menu (mobile) → sidebar (desktop)
- Grid layouts: single column → multi-column with gap optimization
- Art Deco ornaments positioned responsively in corners

## Content Editing Guidelines

### Adding New Sections
1. Add navigation label to `NAV_LABELS` object in both languages (`constants/content.tsx`)
2. Create content object following the bilingual pattern
3. Add section with `id` attribute matching navigation key
4. Use `<Frame>` component for Art Deco border styling
5. Wrap elements with Framer Motion for scroll animations

### Text Highlighting
Use `<span className="text-accent">` to highlight important phrases in the warm red accent color.

### Images
Place new images in `/public/images/` and reference with `/images/filename.png`.

## Configuration Notes

- **Image Optimization**: Disabled in `next.config.js` since all assets are local
- **React Strict Mode**: Enabled for development debugging
- **Font Loading**: Custom fonts use `font-display: swap` for performance
- **Scroll Behavior**: Smooth scrolling enabled globally via CSS

## Asset Management

### Fonts
- ReprizacBold: Used for titles and headings
- TwCenMTCondensed: Used for body text and subtitles
- Font files must be placed in `/public/fonts/` and declared in `globals.css`

### Images
- Gallery images: `/images/gallery_1.png` through `/images/gallery_8.png`
- Decorative elements: `/images/corner_clean.png`, `/images/partners_frame.png`
- Images should maintain Art Deco aesthetic and period-appropriate styling