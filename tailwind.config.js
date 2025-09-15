/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: "#4880EE",
        red: "#E84118",
        grey: "#DADADA",
        lightGrey: "#F2F4F6",
        black: "#222222",
        textPrimary: "#353C49",
        textSecondary: "#6D7582",
        textSubtitle: "#8D94A0",
      },
      fontSize: {
        title1: ["24px", { lineHeight: "24px", fontWeight: "700" }],
        title2: ["22px", { lineHeight: "24px", fontWeight: "700" }],
        title3: ["18px", { lineHeight: "18px", fontWeight: "700" }],
        body1: ["20px", { lineHeight: "20px", fontWeight: "500" }],
        body2: ["14px", { lineHeight: "14px", fontWeight: "500" }],
        body2bold: ["14px", { lineHeight: "14px", fontWeight: "700" }],
        caption: ["16px", { lineHeight: "16px", fontWeight: "500" }],
        small: ["10px", { lineHeight: "10px", fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};
