const typographyPlugin = require("@tailwindcss/typography");
const typographyStyles = require("./typography");
const scrollbarHidePlugin = require("tailwind-scrollbar-hide");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      lato: ["Lato", "sans-serif"],
      chalk: ["Chalk Board", "sans-serif"],
    },
    fontSize: {
      xs: ["0.8125rem", { lineHeight: "1.5rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
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
        orange: {
          primary: "#934C0D",
          secondary: "#ed872d",
          tertiary: "#F3B177",
          quaternary: "#FBE5D2",
        },
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
  plugins: [scrollbarHidePlugin, typographyPlugin],
  typography: typographyStyles,
};
