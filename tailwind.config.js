/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Warm off-white background system
        canvas: {
          DEFAULT: '#f7f6f3',
          subtle: '#f0efe9',
        },
        // Single restrained accent — warm indigo-slate
        accent: {
          DEFAULT: '#4338ca',
          subtle: '#eef2ff',
          muted: '#c7d2fe',
        },
        ink: {
          DEFAULT: '#1a1917',   // near-black charcoal
          secondary: '#57534e', // warm muted
          tertiary: '#a8a29e',  // light muted
          faint: '#d6d3d1',
        },
        border: {
          DEFAULT: '#e7e5e0',
          subtle: '#f0ede8',
        },
        // Keep slate for compatibility
        slate: {
          25: '#fcfcfd',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontSize: {
        'display':    ['2.75rem', { lineHeight: '1.1',  fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-sm': ['2.125rem', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.018em' }],
        'headline':   ['1.625rem', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.014em' }],
        'amount-xl':  ['3rem',     { lineHeight: '1',    fontWeight: '700', letterSpacing: '-0.025em' }],
        'amount-lg':  ['2.25rem',  { lineHeight: '1',    fontWeight: '700', letterSpacing: '-0.02em' }],
        'amount-md':  ['1.75rem',  { lineHeight: '1',    fontWeight: '700', letterSpacing: '-0.018em' }],
      },
      borderRadius: {
        'sm':  '0.375rem',
        'md':  '0.5rem',
        'lg':  '0.75rem',
        'xl':  '1rem',
        '2xl': '1.375rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        'soft':     '0 1px 2px 0 rgba(26,25,23,0.05)',
        'card':     '0 1px 4px -1px rgba(26,25,23,0.08), 0 1px 2px 0 rgba(26,25,23,0.04)',
        'elevated': '0 4px 16px -4px rgba(26,25,23,0.10), 0 1px 4px -1px rgba(26,25,23,0.06)',
        'none':     'none',
      },
      animation: {
        'fade-in':    'fadeIn 0.25s ease-out',
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'scale-in':   'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
