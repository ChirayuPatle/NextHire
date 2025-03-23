import { theme } from "./src/styles/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: theme.colors,
      borderRadius: theme.borderRadius,
    },
  },
  plugins: [],
};
