/** @type {import('tailwindcss').Config} */
module.exports = {
  dark: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
        },
      },
      boxShadow: {
        neu1: "-5px -5px 15px 2px rgb(0 0 0 / 0.1)",
        neu2: "-5px -5px 10px 2px rgb(0.9 0.9 0.9 / 0.1)",
        innerneu1: "inset -5px -5px 10px 2px rgb(0.9 0.9 0.9 / 1)",
        innerneu2: "inset -5px -5px 15px 2px rgb(0 0 0 / 0.1)",
        custom1:
          "-2px -2px 8px rgba(255 255 255 , 1),-2px -2px 12px rgba(255 255 255 , 0.5),inset 2px 2px 4px rgba(255 255 255 , 0.1),2px 2px 8px rgba(0 0 0 . 0.1)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("daisyui")],
};
