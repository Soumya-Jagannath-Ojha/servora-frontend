/** @type {import('tailwindcss').Config} */

// ═══════════════════════════════════════════════════════════════════════════
//  SERVORA DESIGN TOKENS — Single Source of Truth
//  Change any color HERE and it cascades across the ENTIRE application.
//  These values generate Tailwind utility classes: bg-accent, text-primary, etc.
// ═══════════════════════════════════════════════════════════════════════════
const colors = {
  // ── Brand Colors ──────────────────────────────────────────
  primary:          "#ef476f",   // Main blue — buttons, links, active states
  "primary-hover":  "#ee0335",   // Darker blue on hover
  accent:           "#ef476f",   // Accent orange — logo, CTA button
  "accent-hover":   "#ee0335",   // Lighter orange on hover

  // ── Semantic / Status Colors ───────────────────────────────
  "success-green":  "#10b981",   // Green — completed, on-track
  "warning-orange": "#f59e0b",   // Amber — review, caution
  "error-red":      "#ef4444",   // Red — errors, delayed
  secondary:        "#64748b",   // Secondary text / muted

  // ── Surfaces & Backgrounds ─────────────────────────────────
  background:       "#f8f9fa",   // Page background (light mode)
  surface:          "#ffffff",   // Card / panel surface (light mode)
  "surface-dark":   "#0b0a19",   // Card / panel surface (dark mode)
  outline:          "#e2e8f0",   // Borders, dividers

  // ── Typography ─────────────────────────────────────────────
  "text-base":      "#1e293b",   // Primary body text
  "text-muted":     "#64748b",   // Secondary / helper text
};

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: ['Geist', 'Outfit', 'system-ui', 'sans-serif'],
        geist: ['Geist', 'sans-serif'],
      },
      spacing: {
        md: "24px",
        xs: "4px",
        gutter: "24px",
        base: "8px",
        sm: "12px",
        "margin-desktop": "40px",
        "margin-mobile": "16px",
        lg: "48px",
        xl: "80px",
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
      },
    },
  },
  plugins: [],
}