/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ninjagarden: ["Ninja Garden"]
      },
      colors: {
        "omnys-blue": "#5433e4",
        "omnys-blue-light": "#6544ff",
        "omnys-green": "#bbf950",
        "omnys-green-light":"#a1ff00",
        "omnys-green-light-transparent":"rgba(161, 255, 0,0.5)",
        "omnys-blue-light-transparent":"rgba(101, 68, 255,0.5)",
      }
    },
  },
  plugins: [],
}
