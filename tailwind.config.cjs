/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');
const defaultConfig = require('tailwindcss/defaultConfig');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      ...defaultConfig.theme.screens,
    },
    extend: {
      colors: {
        danger: colors.red[700],
        primary: colors.green[600],
        'primary-hover': colors.green[700],
        dark: colors.gray[800],
      },
    },
  },
  plugins: [],
};
