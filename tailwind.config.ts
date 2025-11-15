import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f8ff",
          100: "#dbeefe",
          200: "#baddfc",
          300: "#91c8fa",
          400: "#5fa6f6",
          500: "#3a86f0",
          600: "#256ae0",
          700: "#1c53bd",
          800: "#1d4697",
          900: "#1b3c7b"
        },
        accent: "#ff6b6b",
        ink: "#121825"
      }
    }
  },
  plugins: []
};

export default config;
