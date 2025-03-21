import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-geist-sans)'],
      mono: ['var(--font-geist-mono)'],
    },
    extend: {
      colors: {
        primary: 'oklch(var(--primary))',
        'primary-foreground': 'oklch(var(--primary-foreground))',
        secondary: 'oklch(var(--secondary))',
        'secondary-foreground': 'oklch(var(--secondary-foreground))',
        accent: 'oklch(var(--accent))',
        'accent-foreground': 'oklch(var(--accent-foreground))',
        muted: 'oklch(var(--muted))',
        'muted-foreground': 'oklch(var(--muted-foreground))',
        destructive: 'oklch(var(--destructive))',
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring))',
        skeleton: '#e2e8f0',
      },
      // Other extensions can go here, but not fontFamily
      keyframes: {
        "checkbox-check-draw": {
          "0%": { strokeDashoffset: "var(--stroke-length)" },
          "100%": { strokeDashoffset: "0" }
        }
      },
      animation: {
        "checkbox-check-draw": "checkbox-check-draw 0.2s ease-in-out forwards"
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
