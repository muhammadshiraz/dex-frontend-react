/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#141414',
        },
        light: {
          DEFAULT: '#eeeeee',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
