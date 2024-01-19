/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgs: {
          100: '#0a192f',
          200: '#378f87'
        },
        ascent: {
          // grey
          100: '#1D2B2E',
          // green
          200: '#54d5bb',
          // white
          300: '#ccc',
        },
      },
    },
  },
  plugins: [],
}