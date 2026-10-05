/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Core palette
        bg:          '#F7F6F2',
        surface:     '#FFFFFF',
        'ink':       '#171717',
        'ink-2':     '#6B6B67',
        'ink-3':     '#A09D96',
        'ink-4':     '#D6D3D1',
        'border':    '#E5E2DA',
        'border-2':  '#F0EDE6',
        // Accent — electric blue used sparingly
        'accent':    '#315CFF',
        'accent-bg': '#EEF2FF',
        // Keep slate for compat
        slate: {
          25:  '#fcfcfd',
          50:  '#f8fafc',
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
        'display':    ['2.25rem',  { lineHeight: '1.08', fontWeight: '750', letterSpacing: '-0.03em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.1',  fontWeight: '700', letterSpacing: '-0.025em' }],
        'headline':   ['1.625rem', { lineHeight: '1.2',  fontWeight: '680', letterSpacing: '-0.02em' }],
        'title':      ['1.0625rem',{ lineHeight: '1.4',  fontWeight: '650', letterSpacing: '-0.01em' }],
        'num-xl':     ['2.5rem',   { lineHeight: '1',    fontWeight: '750', letterSpacing: '-0.03em' }],
        'num-lg':     ['2rem',     { lineHeight: '1',    fontWeight: '700', letterSpacing: '-0.025em' }],
        'num-md':     ['1.5rem',   { lineHeight: '1',    fontWeight: '700', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        'btn':  '14px',
        'card': '20px',
        'sm':   '8px',
        'md':   '12px',
        'lg':   '16px',
        'xl':   '20px',
        '2xl':  '24px',
      },
      boxShadow: {
        'btn':  '0 1px 2px rgba(23,23,23,0.10)',
        'card': '0 1px 3px rgba(23,23,23,0.06), 0 1px 2px rgba(23,23,23,0.04)',
        'md':   '0 4px 12px rgba(23,23,23,0.08)',
      },
      animation: {
        'fade-in':    'fadeIn 0.2s ease-out',
        'fade-in-up': 'fadeInUp 0.28s ease-out',
        'scale-in':   'scaleIn 0.18s ease-out',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' },                         '100%': { opacity: '1' } },
        fadeInUp:  { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:   { '0%': { opacity: '0', transform: 'scale(0.97)' },    '100%': { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
