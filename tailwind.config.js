/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — restrained indigo (shared with the authenticated app)
        primary: {
          50: '#EEF1FB',
          100: '#DFE4F7',
          200: '#C3CBEF',
          300: '#A3ADE8',
          400: '#737FD9',
          500: '#4F58C9',
          600: '#4149AE',
          700: '#333A8C',
          800: '#272D6E',
          900: '#1E2340',
          950: '#141833',
        },
        // Accent — trust/verification green; status only, never a second CTA
        accent: {
          50: '#EAF7F1',
          100: '#D3EFE2',
          200: '#A7DFC8',
          300: '#6FC9A8',
          400: '#3FAE87',
          500: '#0E8A5F',
          600: '#0B7450',
          700: '#095E42',
          800: '#074A34',
          900: '#053A29',
          950: '#022C22',
        },
        // Neutral — shared surface/text scale
        ink: {
          50: '#F7F8FA',
          100: '#F1F3F6',
          200: '#E4E6EB',
          300: '#D2D6DD',
          400: '#A6ADB8',
          500: '#6E7681',
          600: '#4A5159',
          700: '#333A44',
          800: '#1F242C',
          850: '#1A1E25',
          900: '#0F1115',
          950: '#020617',
        },
        // Semantic aliases — the shared token contract between both frontends
        canvas: '#FFFFFF',
        surface: '#FFFFFF',
        'surface-2': '#F7F8FA',
        'surface-3': '#EFF1F4',
        line: '#E4E6EB',
        'line-strong': '#D2D6DD',
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
