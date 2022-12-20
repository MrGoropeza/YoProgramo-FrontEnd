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
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
