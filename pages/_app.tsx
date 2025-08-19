import '@/styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import GoogleAnalytics from '@/components/GoogleAnalytics';

/**
 * Custom application wrapper. Next.js will wrap every page
 * with this component allowing us to keep global state or
 * providers if needed.
 */
export default function App({ Component, pageProps }: AppProps) {
  // Add hydrated class to prevent scroll jumps
  useEffect(() => {
    document.documentElement.classList.add('hydrated');
  }, []);
  
  return (
    <>
      <GoogleAnalytics />
      <div className="font-body text-primary relative min-h-screen">
        <Component {...pageProps} />
      </div>
    </>
  );
}