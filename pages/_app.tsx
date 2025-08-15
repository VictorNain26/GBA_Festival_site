import '@/styles/globals.css';
import { useLiveMode } from '@sanity/react-loader'
import { client } from '@/src/sanity/lib/client'
import VisualEditing from '@/components/VisualEditing'
import type { AppProps } from 'next/app'

/**
 * Custom application wrapper. Next.js will wrap every page
 * with this component allowing us to keep global state or
 * providers if needed. Enhanced with Sanity visual editing support.
 */
export default function App({ Component, pageProps }: AppProps) {
  // Enable live mode for Sanity visual editing
  useLiveMode({ client })
  
  return (
    <>
      <Component {...pageProps} />
      {/* Visual Editing overlay in draft mode */}
      {pageProps.draftMode && <VisualEditing />}
    </>
  );
}