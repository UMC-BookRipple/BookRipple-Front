/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Freesentation", "sans-serif"],
        gmarket: ["GmarketSansBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};