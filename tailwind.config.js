/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "mi-foto": "url('assets/images/yo.jpg')",
        "siltium": "url('assets/images/siltium.jpg')",
        "ucasal": "url('assets/images/ucasal.png')",
        "yo-programo": "url('assets/images/yoprogramo-logo.png')",
      },
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translatey(0px)"
          },
          "50%": {
            transform: "translatey(-20px)"
          },
        },
        "rotative-coin": {
          "0%": {
            transform: "none"
          },
          "25%": {
              transform: "rotateY(90deg)"
          },
          "50%": {
              transform: "rotateY(180deg)"
          },
          "75%": {
              transform: "rotateY(270deg)"
          },
          "100%": {
              transform: "rotateY(360deg)"
          }
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "rotative-coin": "rotative-coin 4s linear infinite"
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
