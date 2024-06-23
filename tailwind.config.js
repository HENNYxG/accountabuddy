/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
        fontFamily: {
        'clash-extralight': ['ClashDisplay-Extralight', 'sans-serif'],
        'clash-light': ['ClashDisplay-Light', 'sans-serif'],
        'clash-regular': ['ClashDisplay-Regular', 'sans-serif'],
        'clash-medium': ['ClashDisplay-Medium', 'sans-serif'],
        'clash-semibold': ['ClashDisplay-Semibold', 'sans-serif'],
        'clash-bold': ['ClashDisplay-Bold', 'sans-serif'],
        'clash-variable': ['ClashDisplay-Variable', 'sans-serif'],
        'cirka-light': ['Cirka-Light', 'serif'],
        'cirka-regular': ['Cirka-Regular', 'serif'],
        'cirka-medium': ['Cirka-Medium', 'serif'],
        'cirka-bold': ['Cirka-Bold', 'serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customRed: "#FF0000",
        customGreen: "#E9FF20",
        customCharcoal: "#27272A",
        customIvory: "#FFFBEB",
        backgroundIvory: "#E4E1DA",
      },
    },
  },
  plugins: [],
};

