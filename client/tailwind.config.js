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
        "screen-minus-header": 'calc(100vh - 90px)',
        "screen-minus-header-extra": 'calc(100vh - 220px)'
      }
    },
  },
  plugins: [],
}

