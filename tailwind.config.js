/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — X Minimal Light ink
        primary: {
          50: '#F7F8FA',
          100: '#EEF1F4',
          200: '#D1D5DB',
          300: '#AEB6C1',
          400: '#8892A0',
          500: '#5B6572',
          600: '#46505C',
          700: '#333C46',
          800: '#1F252C',
          900: '#0F141A',
          950: '#080B0E',
        },
        // Accent — platform blue, reserved for focus and links
        accent: {
          50: '#E8F5FD',
          100: '#C8E6FB',
          200: '#9BD4F7',
          300: '#6BBEF2',
          400: '#3FAAEE',
          500: '#1D9BF0',
          600: '#1687D6',
          700: '#1273B5',
          800: '#0F5F94',
          900: '#0C4A73',
          950: '#08304B',
        },
        // Neutral — the spec's ink ramp
        ink: {
          50: '#F7F8FA',
          100: '#F0F2F4',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#B0B7C3',
          500: '#8892A0',
          600: '#5B6572',
          700: '#46505C',
          800: '#333C46',
          850: '#1F252C',
          900: '#0F141A',
          950: '#080B0E',
        },
        // Semantic aliases — the shared token contract between both frontends
        canvas: '#FFFFFF',
        surface: '#FFFFFF',
        'surface-2': '#F7F9FA',
        'surface-3': '#F0F3F4',
        line: '#E5E7EB',
        'line-strong': '#D1D5DB',
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
        // TwitterChirp is proprietary; Inter is the closest free substitute.
        sans: ['Inter', 'Chirp', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        'display-lg': ['64px', { lineHeight: '77px', letterSpacing: '-1px' }],
        'headline-lg': ['24px', { lineHeight: '29px', letterSpacing: '0px' }],
        'headline-md': ['20px', { lineHeight: '24px', letterSpacing: '0px' }],
        'headline-sm': ['18px', { lineHeight: '22px', letterSpacing: '0px' }],
        'body-lg': ['16px', { lineHeight: '24px', letterSpacing: '0px' }],
        'body-md': ['15px', { lineHeight: '23px', letterSpacing: '0px' }],
        'body-sm': ['14px', { lineHeight: '20px', letterSpacing: '0px' }],
        'label-lg': ['15px', { lineHeight: '23px', letterSpacing: '0px' }],
        'label-md': ['12px', { lineHeight: '16px', letterSpacing: '0px' }],
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
