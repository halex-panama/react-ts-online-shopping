/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#EE4D2D",
      white: "#ffffff",
      black: "#000",
      gray: "#929292",
      warning: "#D0011B",
    },
  },
  plugins: [],
};
