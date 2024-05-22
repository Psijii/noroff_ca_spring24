/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1F1307",
          darker: "#161005",
          lighter: "#2f2414",
          text: "#D4B99B",
        },
        secondary: {
          DEFAULT: "#A67C2D",
          hover: "#86411A",
          darker: "#7d6b25",
          lighter: "#c89a46",
        },
        tertiary: {
          DEFAULT: "#D4B99B",
          darker: "#b08a76",
          lighter: "#dac1ae",
        },
        quaternary: {
          DEFAULT: "#86411A",
          darker: "#6a2e0f",
          lighter: "#a65d38",
        },
      },
      fontFamily: {
        heading: ["Inter", "serif"],
        paragraph: ["Roboto, sans-serif"],
      },
    },
  },
  plugins: [],
};
