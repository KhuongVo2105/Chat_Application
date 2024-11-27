/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}","./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        InstagramBold: ['Instagram-Sans-Bold'],
        InstagramHeadline:['Instagram-Sans-Headline'],
        InstagramLight:['Instagram-Sans-Light'],
        Instagram:['Instagram-Sans']
=======
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", "./constants/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        InstagramBold: ['Instagram-Sans-Bold'],
        InstagramHeadline: ['Instagram-Sans-Headline'],
        InstagramLight: ['Instagram-Sans-Light'],
        Instagram: ['Instagram-Sans']
>>>>>>> d8acec4626ac1a67da46ba8f53d5880fa674d8b1
      }
    },
  },
}

