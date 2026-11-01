/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          light: '#EEF4E8',
          DEFAULT: '#DDE9D5',
          dark: '#CADBBF',
        },
        cream: {
          DEFAULT: '#FFFDF6',
          dark: '#F5F2E6',
        },
        forest: {
          light: '#2E6144',
          DEFAULT: '#244C35',
          dark: '#183B29',
        },
        sage: {
          light: '#A7BC9F',
          DEFAULT: '#91A98B',
          dark: '#738C6D',
        },
        gold: {
          light: '#D9BC79',
          DEFAULT: '#C6A45C',
          dark: '#A6843C',
        },
        bgLight: '#F7F8F0',
        brandText: {
          DEFAULT: '#242A24',
          muted: '#5F695E',
          light: '#8E998D',
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        poppins: ['Poppins', '-apple-system', 'sans-serif'],
        dmsans: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 10px rgba(24, 59, 41, 0.05)',
        'soft': '0 8px 30px rgba(24, 59, 41, 0.07)',
        'soft-lg': '0 16px 40px rgba(24, 59, 41, 0.12)',
        'gold-glow': '0 0 25px rgba(198, 164, 92, 0.25)',
        'forest-glow': '0 10px 30px rgba(36, 76, 53, 0.2)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-1deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
