/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        xlri: {
          blue: '#1e3a8a',
          'blue-light': '#3b82f6',
          'blue-dark': '#1e40af',
          gold: '#f59e0b',
          'gold-light': '#fbbf24',
          white: '#ffffff',
          gray: '#f8fafc',
          'gray-dark': '#64748b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
