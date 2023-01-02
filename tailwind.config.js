/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        // logo: ['"M PLUS Rounded 1c"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'custom-purple': '#6926FF',
        'gray-background': '#F5F5F5',
        'gray-title': '#3A3939',
        'gray-text': '#656565',
        'orange-text': '#FE4E12',
        'purple-text': '#4B18BD',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    require('daisyui'),
  ],
};
