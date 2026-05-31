/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#050716",
        royal: "#12173a",
        violetGlow: "#8b5cf6",
        softGold: "#f7d77b",
        warmGold: "#d6a84f",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        aureate: "0 0 80px rgba(247, 215, 123, 0.25)",
        glass: "0 24px 80px rgba(0, 0, 0, 0.32)",
      },
    },
  },
  plugins: [],
};
