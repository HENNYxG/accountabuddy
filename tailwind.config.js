/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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

