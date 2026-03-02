/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  animation: {
    scanLine: "scanLine 2s linear infinite",
  },
  keyframes: {
    scanLine: {
      "0%": { transform: "translateY(-100%)" },
      "100%": { transform: "translateY(400px)" },
    },
  },
}

  },
  plugins: [],
}