import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Custom document for the festival site. This allows us to customize
 * the initial HTML document structure that wraps every page. We use
 * this to add font preloading for better performance and meta tags
 * for the Art Deco festival.
 */
export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Font preloading for critical Art Deco fonts */}
        <link
          rel="preload"
          href="/fonts/Reprizac bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/tw-cen-mt-condensed.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        
        {/* Meta tags for the festival */}
        <meta name="description" content="Florilège de l'Art Déco - Festival celebrating Art Deco and Neo Art Deco culture" />
        <meta name="keywords" content="Art Deco, Neo Art Deco, festival, culture, arts, design" />
        <meta name="author" content="Florilège de l'Art Déco" />
        
        {/* Open Graph meta tags for social sharing */}
        <meta property="og:title" content="Florilège de l'Art Déco" />
        <meta property="og:description" content="Festival celebrating Art Deco and Neo Art Deco culture" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:locale:alternate" content="en_US" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Florilège de l'Art Déco" />
        <meta name="twitter:description" content="Festival celebrating Art Deco and Neo Art Deco culture" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#D3AA41" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}