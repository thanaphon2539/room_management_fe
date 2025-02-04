import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        base: {
          'main': "#F1F2F6",
          'border': "#E8E8E8",
        },
        dark: {
          'base': "#212121",
          'medium': "#666666",
          'light': "#9E9E9E",
        },
        primary: {
          'base': "#2573DD",
          'medium': "#D4E3F7",
          'light': "#F5F8FE",
        },
        warning: {
          'base': "#FFBB00",
        },
        error: {
          'base': "#EE2C4B",
        },
        success: {
          'base': "#44CC77",
        }
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
} satisfies Config;
