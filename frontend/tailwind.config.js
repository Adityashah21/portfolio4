/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        ink: "var(--ink)",
        xp: "var(--xp)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "system-ui", "sans-serif"],
        comic: ["Bangers", "system-ui", "sans-serif"],
        pixel: ["'Press Start 2P'", "monospace"],
      },
      boxShadow: {
        comic: "var(--shadow-comic)",
        "comic-lg": "var(--shadow-comic-lg)",
      },
      keyframes: {
        "xp-fill": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
        glitch: {
          "0%, 92%, 100%": {
            textShadow: "4px 4px 0 var(--ink)",
            transform: "none",
          },
          "93%": {
            textShadow: "-4px 0 0 var(--secondary), 4px 0 0 var(--primary)",
            transform: "translate(2px)",
          },
          "96%": {
            textShadow: "4px 0 0 var(--secondary), -4px 0 0 var(--primary)",
            transform: "translate(-2px)",
          },
        },
      },
      animation: {
        "xp-fill": "xp-fill 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        blink: "blink 1s step-end infinite",
        glitch: "glitch 3s step-end infinite",
      },
    },
  },
  plugins: [],
};
