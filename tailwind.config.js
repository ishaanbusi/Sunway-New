/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        gold: {
          light: '#CFAF7B',
          DEFAULT: '#D4AF37',
          dark: '#B8860B',
        },
        black: {
          DEFAULT: '#000000',
          light: '#1a1a1a',
          lighter: '#2a2a2a',
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #B8860B, #D4AF37, #CFAF7B)',
        'gold-gradient-vertical': 'linear-gradient(to bottom, #B8860B, #D4AF37, #CFAF7B)',
      }
    },
  },
  plugins: [],
};