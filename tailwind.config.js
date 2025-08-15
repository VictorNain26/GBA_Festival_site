/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      // Breakpoints professionnels 2024 - Mobile First
      'xs': '480px',    // Mobile large / Phablet (iPhone 12/13/14 paysage)
      'sm': '640px',    // Tablette portrait (iPad mini, petites tablettes)
      'md': '768px',    // Tablette paysage (iPad standard, Samsung Tab)
      'lg': '1024px',   // Laptop / Desktop small (MacBook Air, laptops 13")
      'xl': '1280px',   // Desktop standard (la plupart des écrans de bureau)
      '2xl': '1440px',  // Desktop large (écrans 27", iMac)
      '3xl': '1920px',  // Desktop ultra-wide (écrans 32"+, multi-moniteurs)
    },
    extend: {
      colors: {
        background: '#000000',
        primary: '#D3AA41', // golden hue sampled from the slides
        accent: '#E55B45',  // warm red accent taken from the slide palette
      },
      fontFamily: {
        title: ['ReprizacBold', 'sans-serif'],
        body: ['TwCenMTCondensed', 'sans-serif'],
      },
      // Spacing personnalisé pour les breakpoints
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '128': '32rem',   // 512px
      },
    },
  },
  plugins: [],
};