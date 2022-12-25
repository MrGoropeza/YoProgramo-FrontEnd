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
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite"
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
