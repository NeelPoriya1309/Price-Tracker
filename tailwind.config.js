/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/product/[id].js',
    './src/**/**/*.js',
    './src/**/*.jsx',
    './src/**/**/**/*.js',
  ],

  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
  corePlugins: {
    preflight: false,
  },
};
