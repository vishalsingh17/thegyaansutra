/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        museo: ['MuseoModerno', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      screens: {
        'scxl': '1440px', // Define a custom screen size for 1440px
        'small': '480px',
        'lglaptop': '1100px',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          "0%, 100%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(10px)" },
        },
        move: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(20px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
        float: "float 6s ease-in-out infinite",
        move: "move 10s linear infinite",
      },
    },
  },
  plugins: [],
}