const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter var',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['dark'],
      cursor: ['disabled'],
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
