/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'instagram-bold': ['Instagram Sans Bold', 'sans-serif'],
        'instagram-medium': ['Instagram Sans Medium', 'sans-serif'],
        'instagram-headline': ['Instagram Sans Headline', 'sans-serif'],
        instagram: ['Instagram Sans', 'sans-serif'],
        'instagram-light': ['Instagram Sans Light', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
