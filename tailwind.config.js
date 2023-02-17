/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', 'src/ts/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
      },
    },
  },
  plugins: [require('autoprefixer')],
};
