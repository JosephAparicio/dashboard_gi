/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "*.{js,jsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Colores específicos para emisiones ambientales
        environmental: {
          ghg: {
            100: "#E8F5E9",
            200: "#C8E6C9",
            300: "#A5D6A7",
            400: "#81C784",
            500: "#66BB6A",
            600: "#4CAF50",
            700: "#43A047",
            800: "#388E3C",
            900: "#2E7D32",
          },
          water: {
            100: "#E3F2FD",
            200: "#BBDEFB",
            300: "#90CAF9",
            400: "#64B5F6",
            500: "#42A5F5",
            600: "#1976D2",
            700: "#1565C0",
            800: "#0D47A1",
            900: "#0D47A1",
          },
          energy: {
            100: "#FFF8E1",
            200: "#FFECB3",
            300: "#FFE082",
            400: "#FFD54F",
            500: "#FFCA28",
            600: "#FBC02D",
            700: "#F9A825",
            800: "#F57F17",
            900: "#F57F17",
          },
          transport: {
            100: "#FAFAFA",
            200: "#F5F5F5",
            300: "#EEEEEE",
            400: "#E0E0E0",
            500: "#BDBDBD",
            600: "#9E9E9E",
            700: "#757575",
            800: "#616161",
            900: "#424242",
          },
          waste: {
            100: "#EFEBE9",
            200: "#D7CCC8",
            300: "#BCAAA4",
            400: "#A1887F",
            500: "#8D6E63",
            600: "#795548",
            700: "#6D4C41",
            800: "#5D4037",
            900: "#4E342E",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}