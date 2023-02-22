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
        // default theme
        'calc-50': 'hsl(var(--clr-calc-50) / <alpha-value>)',
        'calc-100': 'hsl(var(--clr-calc-100) / <alpha-value>)',
        'calc-300': 'hsl(var(--clr-calc-300) / <alpha-value>)',
        'calc-500': 'hsl(var(--clr-calc-500) / <alpha-value>)',
        'calc-600': 'hsl(var(--clr-calc-600) / <alpha-value>)',
        'calc-700': 'hsl(var(--clr-calc-700) / <alpha-value>)',
        'calc-equals-100': 'hsl(var(--clr-calc-equals-100) / <alpha-value>)',
        'calc-equals-400': 'hsl(var(--clr-calc-equals-400) / <alpha-value>)',
        'calc-equals-500': 'hsl(var(--clr-calc-equals-500) / <alpha-value>)',
      },
    },
  },
  plugins: [require('autoprefixer')],
};
