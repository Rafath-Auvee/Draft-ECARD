/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", ...fontFamily.sans],
        mono: ["var(--font-fraunces)", ...fontFamily.mono],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#23272A", // Foundation /Blue/blue-500
          secondary: "#4F5255",
          accent: "#E4DE4B", // main button -> Check out the Designs here
          neutral: "#333c4d",
          "base-100": "#ffffff",
          info: "#D5B048", // menu under line color
          success: "#36d399",
          warning: "#fbbd23",
          "Download-Button-100": "#D5B048",
          error: "#EF4444", // error
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
