/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      screens: {
        "4xl": "2020px",
        "3xl": "1800px",
        "2xl": "1500px",
        "desktop-sm": "1251px",
        "desktop-md": "1351px",
      },
      colors: {
        blue: {
          primary: "#133457",
          secondary: "#c7e7f3",
          fable: "#04203D",
        },
        green: {
          primary: "#00A675",
          secondary: "#104f55",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
