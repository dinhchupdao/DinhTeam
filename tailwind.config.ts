import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: {
            50: "#faf5ff",
            100: "#f3e8ff",
            200: "#e9d5ff",
            300: "#d8b4fe",
            400: "#c084fc",
            500: "#9d4edd",
            600: "#7b2cbf",
            700: "#5a189a",
            800: "#3c096c",
            900: "#240046",
          },
          pink: {
            50: "#fff1f2",
            100: "#ffe4e6",
            200: "#fecdd3",
            300: "#fda4af",
            400: "#fb7185",
            500: "#e91e63",
            600: "#d81159",
            700: "#be123c",
            800: "#9f1239",
            900: "#881337",
          },
          lavender: {
            50: "#faf8ff",
            100: "#f5f0ff",
            200: "#ede4ff",
            300: "#ddd0ff",
          }
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #7B2CBF 0%, #C026D3 50%, #E91E63 100%)",
        "gradient-brand-subtle": "linear-gradient(135deg, rgba(123, 44, 191, 0.08) 0%, rgba(233, 30, 99, 0.08) 100%)",
        "gradient-card": "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 245, 255, 0.85) 100%)",
        "gradient-dark": "linear-gradient(135deg, #181126 0%, #291238 50%, #1f0b24 100%)",
      },
      boxShadow: {
        "soft": "0 10px 30px -5px rgba(123, 44, 191, 0.08)",
        "soft-pink": "0 10px 30px -5px rgba(233, 30, 99, 0.12)",
        "brand-glow": "0 15px 35px -5px rgba(123, 44, 191, 0.25)",
        "card": "0 4px 20px -2px rgba(33, 10, 56, 0.05), 0 2px 6px -1px rgba(33, 10, 56, 0.03)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
