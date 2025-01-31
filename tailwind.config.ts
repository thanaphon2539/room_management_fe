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
          'pannel': "#FAFAFA",
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
          'medium': "#FFECB3",
          'light': "#FFF9E9",
        },
        error: {
          'base': "#EE2C4B",
          'medium': "#FDD5DC",
          'light': "#FDF4F5",
        },
        success: {
          'base': "#44CC77",
          'medium': "#C8F1D8",
          'light': "#EEFAF4",
        },
        jeans: {
          'base': "#648BA7",
          'medium': "#D0DCE6",
          'light': "#F1F5F9",
        },
        highlight: {
          'bk': "#FE8B5E",
          'bc': "#FAE033",
          'sk': "#FE74D9",
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
