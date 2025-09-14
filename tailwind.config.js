/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon': {
          '50': '#f0fff4',
          '100': '#dcfce7',
          '200': '#bbf7d0',
          '300': '#86efac',
          '400': '#4ade80',
          '500': '#22c55e',
          '600': '#16a34a',
          '700': '#15803d',
          '800': '#166534',
          '900': '#14532d',
          'green': '#00ff41',
          'bright': '#39ff14',
          'matrix': '#00ff00',
          'electric': '#00ffff',
        },
        'cyber': {
          'black': '#000000',
          'dark': '#0a0a0a',
          'darker': '#050505',
          'gray': '#1a1a1a',
          'light': '#2a2a2a',
        },
        'cyberpunk': {
          'cyan': '#00ffff',
          'pink': '#ff0080',
          'yellow': '#ffff00',
          'blue': '#0080ff',
          'purple': '#8000ff',
          'red': '#ff0040',
          'dark': {
            'bg': '#0a0014',
            'surface': '#1a1a2e',
            'border': '#16213e',
          }
        }
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'matrix': 'matrix 20s linear infinite',
        'typewriter': 'typewriter 4s steps(40) 1s forwards',
        'blink': 'blink 1s infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'bounce-glow': 'bounce-glow 1s infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { 
            boxShadow: '0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 15px #00ff41',
            opacity: '1'
          },
          '50%': { 
            boxShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41',
            opacity: '0.8'
          },
        },
        'glow': {
          '0%': { 
            boxShadow: '0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 15px #00ff41',
            textShadow: '0 0 5px #00ff41'
          },
          '100%': { 
            boxShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41',
            textShadow: '0 0 10px #00ff41'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'matrix': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'typewriter': {
          '0%': { width: '0ch' },
          '100%': { width: '100%' },
        },
        'blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bounce-glow': {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 10px #00ff41'
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 0 20px #00ff41, 0 0 30px #00ff41'
          },
        }
      },
      boxShadow: {
        'neon': '0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 20px #00ff41',
        'neon-lg': '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41',
        'neon-xl': '0 0 15px #00ff41, 0 0 30px #00ff41, 0 0 60px #00ff41',
        'cyber': '0 0 20px rgba(0, 255, 65, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 255, 65, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'cyber': ['Orbitron', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
