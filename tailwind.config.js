/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "mi-foto": "url('assets/images/yo.jpg')"
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
