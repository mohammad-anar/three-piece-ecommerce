import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
      colors: {
        // ── Brand Colors (zanass.com inspired) ──────────────────────────
        // ✅ Change these values to retheme the entire website at once
        primary: {
          DEFAULT: "#7F3834", // Main brand color — navbar, hero, footer, buttons
          hover: "#6B2F2B",   // Darker shade for hover states
          light: "#F5EDEC",   // Very light tint for subtle backgrounds
          fg: "#FFFFFF",      // Foreground text on primary backgrounds
        },
        secondary: {
          DEFAULT: "#54595F", // Secondary elements — footer bottom bar
          hover: "#3F444B",   // Darker shade for hover states
          light: "#F0F1F2",   // Light tint for backgrounds
          fg: "#FFFFFF",      // Foreground text on secondary backgrounds
        },

        // ── Semantic Backgrounds ─────────────────────────────────────────
        background: {
          DEFAULT: "#F9F3F0",   // Main page background (warm luxury linen tone)
          surface: "#F3EBE7",   // Card / alternate section background
          dark: "#1F2124",      // Dark sections (e.g. footer bottom area)
        },

        // ── Semantic Text Colors ─────────────────────────────────────────
        content: {
          DEFAULT: "#242424",   // Primary heading / title text
          body: "#767676",      // Body / paragraph text
          muted: "#838383",     // Muted / placeholder / caption text
          inverse: "#FFFFFF",   // Text on dark or primary backgrounds
        },

        // ── Border ───────────────────────────────────────────────────────
        border: {
          DEFAULT: "rgba(0,0,0,0.1)",
          strong: "rgba(0,0,0,0.2)",
        },

        // ── State Colors ─────────────────────────────────────────────────
        success: {
          DEFAULT: "#5CB85C",
          dark: "#4CAF50",
          light: "#E8F5E9",
        },
        warning: {
          DEFAULT: "#F0AD4E",
          dark: "#D48806",
          light: "#FFF8E1",
        },
        danger: {
          DEFAULT: "#D9534F",
          dark: "#C0392B",
          light: "#FEECEC",
        },
      },
      screens: {
        xs: "540px",
      },
      container: {
        padding: "20px",
        center: true,
        screens: {
          DEFAULT: "1600px",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
