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
        '21': '5.25rem',  // 84px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '27': '6.75rem',  // 108px
        '30': '7.5rem',   // 120px
        '33': '8.25rem',  // 132px
        '38': '9.5rem',   // 152px
        '39': '9.75rem',  // 156px
        '42': '10.5rem',  // 168px
        '46': '11.5rem',  // 184px
        '50': '12.5rem',  // 200px
        '57': '14.25rem', // 228px
        '63': '15.75rem', // 252px
        '69': '17.25rem', // 276px
        '75': '18.75rem', // 300px
        '66': '16.5rem',  // 264px
        '68': '17rem',    // 272px
        '72': '18rem',    // 288px
        '78': '19.5rem',  // 312px
        '84': '21rem',    // 336px
        '88': '22rem',    // 352px
        '90': '22.5rem',  // 360px
        '96': '24rem',    // 384px
        '102': '25.5rem', // 408px
        '108': '27rem',   // 432px
        '120': '30rem',   // 480px
        '128': '32rem',   // 512px
        '132': '33rem',   // 528px
        '56': '14rem',    // 224px
      },
    },
  },
  plugins: [
    function({ addBase, addComponents }) {
      // Base styles pour HTML et body
      addBase({
        'html': {
          'scroll-behavior': 'smooth',
          'overflow-x': 'hidden',
        },
        'html:not(.hydrated)': {
          'scroll-behavior': 'auto',
        },
        'body': {
          'overflow-x': 'hidden',
        },
        // Respect user's motion preferences
        '@media (prefers-reduced-motion: reduce)': {
          '*': {
            'animation-duration': '0.01ms !important',
            'animation-iteration-count': '1 !important',
            'transition-duration': '0.01ms !important',
          },
          '*::before': {
            'animation-duration': '0.01ms !important',
            'animation-iteration-count': '1 !important',
            'transition-duration': '0.01ms !important',
          },
          '*::after': {
            'animation-duration': '0.01ms !important',
            'animation-iteration-count': '1 !important',
            'transition-duration': '0.01ms !important',
          },
          'html': {
            'scroll-behavior': 'auto',
          },
        },
      })
      
      // Composants réutilisables
      addComponents({
        '.background-container': {
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      })
    }
  ],
};