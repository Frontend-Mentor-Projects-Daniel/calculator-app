/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['index.html', 'src/ts/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
      },
      colors: {
        // format
        // primary: 'hsl(var(--color-primary) / <alpha-value>)',
      },
    },
  },
  plugins: [require('autoprefixer')],
};
