/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3eefb',
          100: '#e6ddf7',
          200: '#cdbcee',
          300: '#b49ae6',
          400: '#9b79dd',
          500: '#8A2BE2', // Main primary color
          600: '#7c28cc',
          700: '#6922aa',
          800: '#561c88',
          900: '#421666'
        },
        secondary: {
          50: '#fff0f7',
          100: '#ffe0ee',
          200: '#ffc2dd',
          300: '#ffa3cc',
          400: '#ff85bb',
          500: '#FF69B4', // Main secondary color
          600: '#e65ea3',
          700: '#cc5391',
          800: '#b34880',
          900: '#993c6e'
        },
        accent: {
          50: '#fffadf',
          100: '#fff5bf',
          200: '#ffef9f',
          300: '#ffe97f',
          400: '#ffe45f',
          500: '#FFD700', // Main accent color
          600: '#e6c200',
          700: '#ccac00',
          800: '#b39600',
          900: '#998000'
        },
        success: {
          500: '#10B981' // Success color
        },
        warning: {
          500: '#F59E0B' // Warning color
        },
        error: {
          500: '#EF4444' // Error color
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};