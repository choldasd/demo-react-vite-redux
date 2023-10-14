/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'body-bg': '#F4F4F8',
        'pestal-yellow': '#FFFFCB',
        'pestal-green': '#C0F8C0',
        'pestal-red': '#FFC2BF',
        'green-theme': '#34A853',
        'red-theme': '#EA4335',
        'off-gray-text': '#838B9D',
        'border-color': '#CACACD'
      }
    },
  },
  plugins: [],
}