/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — X uses no brand hue; its accent is near-white.
        primary: {
          50: '#F7F7F7',
          100: '#E9E6E6',
          200: '#D4D4D4',
          300: '#B0B0B0',
          400: '#A3A3A3',
          500: '#8C8C8C',
          600: '#737980',
          700: '#525252',
          800: '#404040',
          900: '#262626',
          950: '#171717',
        },
        // Accent — verification/trust green, status only
        accent: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
        },
        // Neutral — black-based surface scale
        ink: {
          50: '#F7F7F7',
          100: '#E9E6E6',
          200: '#D4D4D4',
          300: '#B0B0B0',
          400: '#A3A3A3',
          500: '#8C8C8C',
          600: '#737980',
          700: '#525252',
          800: '#404040',
          850: '#262626',
          900: '#141414',
          950: '#0E0E0E',
        },
        // Semantic aliases — the shared token contract between both frontends
        canvas: '#000000',
        surface: '#0E0E0E',
        'surface-2': '#141414',
        'surface-3': '#1C1C1C',
        line: '#262626',
        'line-strong': '#404040',
        success: {
          50: '#EAF7F1',
          100: '#D3EFE2',
          200: '#A7DFC8',
          300: '#6FC9A8',
          400: '#3FAE87',
          500: '#0E8A5F',
          600: '#0B7450',
          700: '#095E42',
        },
        warning: {
          400: '#E0A85C',
          500: '#B45309',
          600: '#96410A',
        },
        error: {
          50: '#FCEEEE',
          100: '#F9D9D6',
          200: '#F2B4AE',
          300: '#E88B82',
          400: '#DC6C60',
          500: '#C4362F',
          600: '#A62B25',
          700: '#85211C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        'hero': ['3.25rem', { lineHeight: '1.04', letterSpacing: '-0.022em' }],
        'display': ['2.5rem', { lineHeight: '1.08', letterSpacing: '-0.022em' }],
      },
      letterSpacing: {
        micro: '.08em',
      },
      borderRadius: {
        // Near-zero radius: a console, not a card deck. (Shared with the app.)
        none: '0px',
        xs: '2px',
        control: '2px',
        panel: '3px',
        '4xl': '3px',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        // Elevation is expressed through hairlines, not shadows.
        none: 'none',
        control: 'none',
        'soft': 'none',
        'card': 'none',
        'card-hover': 'none',
        'elevated': '0 1px 0 rgb(15 17 21 / 0.04)',
        'glow': 'none',
        'glow-accent': 'none',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'flow-dash': {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.7s ease both',
        'scale-in': 'scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'flow-dash': 'flow-dash 1.2s linear infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
