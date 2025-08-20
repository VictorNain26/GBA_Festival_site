import '@/styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { storyblokInit, apiPlugin } from '@storyblok/react';
import { performanceLogger } from '@/utils/logger';
import GoogleAnalytics from '@/components/GoogleAnalytics';

// Initialize Storyblok only once with modern approach
storyblokInit({
  accessToken: process.env['NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN'] || '',
  use: [apiPlugin],
});

/**
 * Custom application wrapper. Next.js will wrap every page
 * with this component allowing us to keep global state or
 * providers if needed.
 */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Check if we're on a Storyblok page or in preview mode
  // Le bridge ne doit se charger QUE dans l'éditeur Storyblok ou en preview
  const isStoryblokPage = router.pathname.includes('storyblok');
  const isPreview = router.isPreview || pageProps.preview;
  const isInStoryblokEditor = router.query._storyblok !== undefined;
  const shouldLoadStoryblokBridge = isStoryblokPage || isPreview || isInStoryblokEditor;
  
  // Add hydrated class to prevent scroll jumps
  useEffect(() => {
    document.documentElement.classList.add('hydrated');
    
    // Generate session ID for logging
    if (typeof window !== 'undefined' && !window.sessionStorage.getItem('sessionId')) {
      window.sessionStorage.setItem('sessionId', crypto.randomUUID());
    }
  }, []);
  
  // Enhanced Storyblok Bridge initialization for 2025
  useEffect(() => {
    if (shouldLoadStoryblokBridge && typeof window !== 'undefined' && (window as any).storyblok) {
      const token = process.env['NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN'];
      if (token) {
        // Initialize bridge with modern approach
        (window as any).storyblok.init({
          accessToken: token,
        });

        // Enhanced event handling for better performance
        (window as any).storyblok.on(['input'], (payload: any) => {
          // Real-time updates for input events
          if (payload.action === 'input') {
            // Trigger a soft refresh instead of full reload for better UX
            const event = new Event('storyblok:input');
            window.dispatchEvent(event);
          }
        });

        (window as any).storyblok.on(['published', 'change'], () => {
          // Full reload only for published changes
          router.reload();
        });
      }
    }
  }, [shouldLoadStoryblokBridge, router]);
  
  return (
    <>
      <Head>
        <title>Festival Art Déco</title>
        <meta name="description" content="Festival Art Déco et Neo Art Déco" />
      </Head>
      
      {/* Modern Storyblok Bridge Script - Best Practice 2025 */}
      {shouldLoadStoryblokBridge && (
        <script 
          src="https://app.storyblok.com/f/storyblok-v2-latest.js"
          async
        />
      )}
      
      <GoogleAnalytics />
      <div className="font-body text-primary relative min-h-screen">
        <Component {...pageProps} />
      </div>
    </>
  );
}

/**
 * Web Vitals reporting function
 * Tracks Core Web Vitals and sends data to analytics
 */
export function reportWebVitals(metric: any) {
  const { id, name, label, value } = metric;
  
  // Log performance metrics
  performanceLogger.measure(name, 0, {
    metric_id: id,
    metric_label: label,
    metric_value: value,
    url: window.location.pathname
  });

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, {
      event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_label: id,
      non_interaction: true,
      custom_map: {
        metric_name: name,
        page_path: window.location.pathname
      }
    });
  }

  // Check for slow performance and log warnings
  const thresholds = {
    FCP: 1800, // First Contentful Paint
    LCP: 2500, // Largest Contentful Paint  
    FID: 100,  // First Input Delay
    CLS: 0.1,  // Cumulative Layout Shift
    TTFB: 800, // Time to First Byte
    INP: 200   // Interaction to Next Paint
  };

  const threshold = thresholds[name as keyof typeof thresholds];
  if (threshold && value > threshold) {
    performanceLogger.slowOperation(
      `Web Vital: ${name}`,
      value,
      threshold
    );
  }
}