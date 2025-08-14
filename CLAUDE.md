# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a festival site for "Florilège de l'Art Déco" - an Art Deco and Neo Art Deco festival website built with Next.js. The site features a bilingual (French/English) single-page application with smooth scroll navigation, animated sections, and Art Deco themed design.

## Technology Stack

- **Framework**: Next.js 14.1.0 with React 18.2.0
- **Styling**: Tailwind CSS 3.4.3 with custom Art Deco theme
- **Animation**: Framer Motion 10.12.17 for scroll animations and transitions
- **Images**: Next.js Image component with optimization disabled (all assets are local)
- **Typography**: Custom fonts (ReprizacBold and TwCenMTCondensed) served from `/public/fonts/`

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Note: This project uses npm as the package manager (not pnpm or yarn).

## Architecture Overview

### Project Structure
- `pages/` - Next.js pages (App Router not used)
  - `_app.js` - Global app wrapper and CSS imports
  - `index.js` - Main landing page component
- `components/` - Reusable React components
- `styles/` - Global CSS and Tailwind configuration
- `public/` - Static assets (fonts, images)

### Key Components
- **Header**: Responsive navigation with bilingual toggle and smooth scroll
- **Frame**: Art Deco border wrapper using decorative PNG overlay
- **CornerDecor**: Four-corner Art Deco ornamental decorations

### Content Architecture
The main page (`pages/index.js`) uses a data-driven approach with content objects for bilingual support:

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
- Mobile-first approach using Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- Header collapses to hamburger menu on mobile
- Grid layouts adapt from single column to multi-column
- Corner decorations hidden on small screens (`hidden sm:block`)

## Content Editing Guidelines

### Adding New Sections
1. Add navigation label to `navLabels` object in both languages
2. Create content object following the bilingual pattern
3. Add section with `id` attribute matching navigation key
4. Include `<CornerDecor />` for consistent decoration
5. Use motion wrappers for animations

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