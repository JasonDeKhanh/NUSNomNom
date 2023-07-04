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
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 100,
          },
        },
        "fade-out": {
          "0%": {
            opacity: 100,
          },
          "100%": {
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
