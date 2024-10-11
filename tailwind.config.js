/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFA62F",
        secondary: "#FFC96F",
        onPrimary: "#FFE8C8",
        green: "#ACD793",
        gray: "#616161",
      },
      screens: {
        tall: { raw: "(min-height: 800px)" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
