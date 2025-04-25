/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        background: {
          dark: '#0a0a0a',
          darker: '#050505',
          card: '#131313',
        },
        neon: {
          btc: '#FFA500',
          eth: '#9B5DE5',
          sol: '#00F5D4',
          matic: '#845EC2',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        gray: {
          750: '#2A2A2A',
          850: '#1A1A1A',
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.3)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-up': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'neon': '0 0 5px var(--tw-shadow-color), 0 0 10px var(--tw-shadow-color)',
        'neon-lg': '0 0 10px var(--tw-shadow-color), 0 0 20px var(--tw-shadow-color), 0 0 30px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [],
};