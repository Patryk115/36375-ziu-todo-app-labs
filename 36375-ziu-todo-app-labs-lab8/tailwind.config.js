/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false, // KLUCZOWE: Zapobiega konfliktom z MUI
  },
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          500: '#1565C0',
          700: '#0D47A1',
        },
      },
    },
  },
  plugins: [],
};