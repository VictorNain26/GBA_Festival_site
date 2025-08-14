import '@/styles/globals.css';

/**
 * Custom application wrapper. Next.js will wrap every page
 * with this component allowing us to keep global state or
 * providers if needed. For this project we only import the
 * global CSS definitions here.
 */
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}