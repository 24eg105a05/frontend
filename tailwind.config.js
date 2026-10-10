/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          green: '#15803d',
          lightGreen: '#86efac',
          coldBlue: '#0284c7',
          accent: '#eab308',
        }
      }
    },
  },
  plugins: [],
}