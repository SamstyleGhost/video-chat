/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'text': '#e4edf1',
        'background': '#020303',
        'primary': '#2c4854',
        'secondary': '#19282f',
        'accent': '#6fb4d1',  
      },
      fontFamily: {
        'league-spartan' : ['League Spartan'],
      }     
    },
  },
  plugins: [],
}