/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'blue-600': '#69d2e7',
        'blue-500': '#a7dbd8',
        'gray-300': '#e0e4cc',
        'orange-600': '#f38630',
        'red-600': '#fa6900',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
