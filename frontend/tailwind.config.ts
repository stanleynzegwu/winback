import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryColor: {
          light: '#d1fae5', // Light shade (optional)
          DEFAULT: '#10b981', // Default shade (e.g., green for 60%)
          dark: '#065f46', // Dark shade (optional)
        },
        secondaryColor: {
          light: '#bfdbfe', // Light shade (optional)
          DEFAULT: '#3b82f6', // Default shade (e.g., blue for 30%)
          dark: '#1e3a8a', // Dark shade (optional)
        },
        accentColor: {
          light: '#fca5a5', // Light shade (optional)
          DEFAULT: '#ef4444', // Default shade (e.g., red for 10%)
          dark: '#b91c1c', // Dark shade (optional)
        },
      },
      blur: {
        "4xl": "70px",
        "5xl": "85px",
        "6xl": "90px",
        "7xl": "100px",
        "8xl": "150px",
        "9xl": "200px",
        "base": "250px",
      },
    },
  },
  plugins: [],
};
export default config;
