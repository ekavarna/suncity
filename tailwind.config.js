/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Roboto': ['Roboto', 'sans-serif'],
        "Armavir": ['Armavir01-Bold', 'sans-serif'],


      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  },};