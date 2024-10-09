/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}","./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        InstagramBold: ['Instagram-Sans-Bold'],
        InstagramHeadline:['Instagram-Sans-Headline'],
        InstagramLight:['Instagram-Sans-Light'],
        Instagram:['Instagram-Sans']
      }
    },
  },
}

