/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Configuration spécifique pour IONOS Deploy Now (hébergement statique)
  output: process.env['IONOS_STATIC'] === 'true' ? 'export' : undefined,
  trailingSlash: process.env['IONOS_STATIC'] === 'true',
  
  // Optimisation des images pour IONOS
  images: {
    unoptimized: process.env['IONOS_STATIC'] === 'true', // Requis pour l'export statique
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for local images
  },
  
  // Comprehensive security headers (disabled for static export)
  async headers() {
    // Les headers personnalisés ne fonctionnent pas avec output: export
    // Ils seront gérés par .ionos.yml ou la configuration du serveur
    if (process.env['IONOS_STATIC'] === 'true') {
      return [];
    }
    
    const isProduction = process.env.NODE_ENV === 'production';
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src 'self' ${isDevelopment ? "'unsafe-eval'" : ""} 'unsafe-inline' https://app.storyblok.com https://js.storyblok.com https://www.googletagmanager.com https://www.google-analytics.com`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: https://a.storyblok.com https://img2.storyblok.com https://www.google-analytics.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://api.storyblok.com https://mapi.storyblok.com https://www.google-analytics.com https://analytics.google.com",
              "frame-src 'self' https://www.google.com",
              "frame-ancestors 'self' https://app.storyblok.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "manifest-src 'self'",
              "worker-src 'self'",
              "child-src 'self'",
              isProduction ? "upgrade-insecure-requests" : "",
              "block-all-mixed-content"
            ].filter(Boolean).join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), fullscreen=(self), payment=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: isProduction ? 'max-age=31536000; includeSubDomains; preload' : 'max-age=0'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none'
          }
        ]
      },
      {
        // Additional security for API routes
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
