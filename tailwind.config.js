/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        "on-primary": "#ffffff",
        secondary: "#64748b",
        "on-secondary": "#1e293b",
        background: "#f8f9fa",
        surface: "#ffffff",
        "surface-glass": "rgba(255, 255, 255, 0.7)",
        "pane-glass": "rgba(255, 255, 255, 0.8)",
        outline: "#e2e8f0",
        "on-surface": "#1e293b",
        "on-surface-variant": "#64748b",
        "success-green": "#10b981",
        "warning-orange": "#f59e0b",
        "error-red": "#ef4444",
      },
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