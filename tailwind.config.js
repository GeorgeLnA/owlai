module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wezomcomabbey: "var(--wezomcomabbey)",
        "wezomcomalizarin-crimson": "var(--wezomcomalizarin-crimson)",
        "wezomcombig-stone": "var(--wezomcombig-stone)",
        wezomcomblack: "var(--wezomcomblack)",
        "wezomcomblack-20": "var(--wezomcomblack-20)",
        "wezomcomblack-40": "var(--wezomcomblack-40)",
        "wezomcomblue-ribbon": "var(--wezomcomblue-ribbon)",
        "wezomcomcod-gray": "var(--wezomcomcod-gray)",
        "wezomcomcod-gray-40": "var(--wezomcomcod-gray-40)",
        wezomcomconcrete: "var(--wezomcomconcrete)",
        "wezomcomcornflower-blue": "var(--wezomcomcornflower-blue)",
        wezomcomcrusta: "var(--wezomcomcrusta)",
        "wezomcomdove-gray": "var(--wezomcomdove-gray)",
        "wezomcomdove-gray-50": "var(--wezomcomdove-gray-50)",
        wezomcomflamingo: "var(--wezomcomflamingo)",
        "wezomcomgolden-tainoi": "var(--wezomcomgolden-tainoi)",
        "wezomcomlucky-point": "var(--wezomcomlucky-point)",
        wezomcommercury: "var(--wezomcommercury)",
        "wezomcommine-shaft": "var(--wezomcommine-shaft)",
        "wezomcommona-lisa": "var(--wezomcommona-lisa)",
        "wezomcomneon-carrot": "var(--wezomcomneon-carrot)",
        "wezomcomneon-carrot-0": "var(--wezomcomneon-carrot-0)",
        wezomcomorange: "var(--wezomcomorange)",
        "wezomcomoslo-gray": "var(--wezomcomoslo-gray)",
        "wezomcomoslo-gray-50": "var(--wezomcomoslo-gray-50)",
        "wezomcomred-orange": "var(--wezomcomred-orange)",
        "wezomcomrolling-stone": "var(--wezomcomrolling-stone)",
        "wezomcomrolling-stone-50": "var(--wezomcomrolling-stone-50)",
        wezomcomsalmon: "var(--wezomcomsalmon)",
        "wezomcomsilver-chalice-50": "var(--wezomcomsilver-chalice-50)",
        "wezomcomsunset-orange": "var(--wezomcomsunset-orange)",
        wezomcomthunderbird: "var(--wezomcomthunderbird)",
        wezomcomwhite: "var(--wezomcomwhite)",
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
      },
      fontFamily: {
        "wezom-com-IBM-plex-mono-semibold":
          "var(--wezom-com-IBM-plex-mono-semibold-font-family)",
        "wezom-com-IBM-plex-mono-semibold-underline-upper":
          "var(--wezom-com-IBM-plex-mono-semibold-underline-upper-font-family)",
        "wezom-com-IBM-plex-mono-semibold-upper":
          "var(--wezom-com-IBM-plex-mono-semibold-upper-font-family)",
        "wezom-com-manrope-bold": "var(--wezom-com-manrope-bold-font-family)",
        "wezom-com-manrope-medium":
          "var(--wezom-com-manrope-medium-font-family)",
        "wezom-com-manrope-medium-underline":
          "var(--wezom-com-manrope-medium-underline-font-family)",
        "wezom-com-manrope-semibold":
          "var(--wezom-com-manrope-semibold-font-family)",
        "wezom-com-manrope-semibold-underline":
          "var(--wezom-com-manrope-semibold-underline-font-family)",
        "wezom-com-manrope-semibold-upper":
          "var(--wezom-com-manrope-semibold-upper-font-family)",
        "wezom-com-roboto-regular-upper":
          "var(--wezom-com-roboto-regular-upper-font-family)",
        "wezom-com-semantic-heading-2":
          "var(--wezom-com-semantic-heading-2-font-family)",
        "wezom-com-semantic-heading-3":
          "var(--wezom-com-semantic-heading-3-font-family)",
        "wezom-com-semantic-link-upper":
          "var(--wezom-com-semantic-link-upper-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "marquee-rtl": {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee-rtl": "marquee-rtl 30s linear infinite",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
