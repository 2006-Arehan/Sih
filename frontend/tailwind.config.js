/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF9933', // Government Saffron
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        govgreen: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#138808', // Indian Green
          800: '#0F6906',
          900: '#084803',
        },
        govnavy: {
          50: '#F0F4FA',
          100: '#E0E8F5',
          200: '#C0D2EB',
          300: '#91B0DC',
          400: '#5C88CA',
          500: '#3461B5',
          600: '#1F479C',
          700: '#15367F',
          800: '#000080', // Deep Navy
          900: '#0B2252', // Structure Navy
          950: '#071A3D', // Dark Navy
        },
        govbg: {
          DEFAULT: '#F7F9FC',
          subtle: '#EEF2F7',
          dark: '#0A1222',
        },
        govtext: {
          primary: '#172033',
          secondary: '#4A5568',
          muted: '#667085',
          darkPrimary: '#F1F5F9',
          darkMuted: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gov': '0 1px 3px 0 rgba(11, 34, 82, 0.08), 0 1px 2px 0 rgba(11, 34, 82, 0.04)',
        'gov-md': '0 4px 6px -1px rgba(11, 34, 82, 0.1), 0 2px 4px -1px rgba(11, 34, 82, 0.06)',
        'gov-lg': '0 10px 15px -3px rgba(11, 34, 82, 0.1), 0 4px 6px -2px rgba(11, 34, 82, 0.05)',
        'gov-xl': '0 20px 25px -5px rgba(11, 34, 82, 0.1), 0 10px 10px -5px rgba(11, 34, 82, 0.04)',
        'saffron-glow': '0 4px 14px 0 rgba(255, 153, 51, 0.35)',
        'green-glow': '0 4px 14px 0 rgba(19, 136, 8, 0.30)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
