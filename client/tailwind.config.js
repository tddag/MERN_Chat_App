/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "95%": "95%",
        "85%": "85%",
        "screen-minus-header": 'calc(100vh - 250px)'
      }
    },
  },
  plugins: [],
}

