/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand"],
      },
      dropShadow: {
        glow: ["0px 0px 5px #FFFFFFFF", "0px 0px 3px #FFFFFFFF"],
        placeGlow: ["0px 0px 2px #FFFFFFFF", "0px 0px 1px #FFFFFFFF"],
      },
    },
  },
  plugins: [],
};
