const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        bodyMain: ['Overpass'],
        headingMain: ['Permanent Marker'],
        buttonText: ['Montserrat'],
      },
      spacing: {
        84: '21rem',
        108: '27rem',
        116: '28rem',
        120: '30rem',
        128: '32rem',
        132: '34rem',
        144: '36rem',
      },
      screens: {
        xs: '568px',
        iPad: { raw: '(width: 768px) and (height: 1024px)' },
        iPadWidescreen: { raw: '(width: 1024px) and (height: 768px)' },
        iPadPro: { raw: '(width: 1024px) and (height: 1366px)' },
        iPadProWidescreen: { raw: '(width: 1366px) and (height: 1024px)' },
        ...defaultTheme.screens,
      },
      backgroundImage: (theme) => ({
        watchlist: "url('/img/watchlist-bg.webp')",
        watchlistPortrait: "url('/img/watchlist-bg-portrait.webp')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
