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
        primary: "#15172b",
        secondary: "#303245",
        whiteText: "#EEEEEE",
        buttonBgDark: "#2D64AC",
        buttonBg: "#0088dd",
        buttonBgHover: "#03e9f4",
        textRed: "#dc2f55",
        textGrey: "#65657b",
        textRedLight: "tomato",
        textOrange: "orange",
        textPurple: "#6e58a5",
        bgOpacity: "rgba(255, 255, 255, 0.40)",
        borderOpacity: "rgba(255,255,255,.25)",
      },
      boxShadow: {
        cardShadow: "0 0 10px 1px rgba(0, 0, 0, 0.25)",
        buttonShadow:
          "0 0 5px #47aeee,0 0 6px #47aeee,0 0 26px #47aeee,0 0 28px #47aeee",
      },
    },
  },
  plugins: [],
};
