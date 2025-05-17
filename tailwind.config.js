export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        primarysec: "var(--primarysec-color)",
        secondary: "var(--secondary-color)",
        light: "var(--light-color)",
        text: "var(--text-color)"
      },
    },
  },
  plugins: [],
};
