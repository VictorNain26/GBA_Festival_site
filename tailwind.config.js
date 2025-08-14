/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
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
    },
  },
  plugins: [],
};