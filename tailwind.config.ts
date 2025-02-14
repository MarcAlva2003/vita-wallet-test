import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: '#010E11',
        gray: {
          1: '#B9C1C2',
          2: '#DEE0E0',
          3: '#F5F6F6'
        },
        white: "#F9F9FA",
        blue: {
          1: '#167287',
          2: '#05BCB9'
        },
        red: "#CE3434"
      },
      'custom-gradient': 'linear-gradient(90deg, #05BCB9 0%, #167287 100%)',
    },
  },
  plugins: [],
} satisfies Config;
