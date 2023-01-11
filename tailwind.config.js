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
        'black-text': '#161825',
        'gray-background-2': '#242A3E',
        'orange-text': '#FE4E12',
        'purple-text': '#4B18BD',
        'mint-text': '#7EDD89',
        'violet-gradient-to': '#4A00E0',
        'purple-linear': 'linear-gradient(92.61deg, #8E2DE2 0%, #4A00E0 100%)',
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
