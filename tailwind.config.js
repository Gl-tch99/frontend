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
    },
  },
  plugins: [],
};
