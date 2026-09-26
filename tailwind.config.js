/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Chirograph Verify — X Developer Platform system ────────
        // The canvas is true black (#000). Depth comes from hairline
        // borders and near-black surface steps, never from shadows.
        //
        // NOTE: the `ink` ramp is intentionally INVERTED relative to a
        // conventional light-mode ramp. 900 is the brightest value because
        // it is the primary-text token used across every page; 50 is the
        // darkest because it is the page-background token. Re-point these
        // values rather than renaming classes.
        ink: {
          50: '#000000',   // page canvas
          100: '#0A0A0A',  // raised surface
          200: '#141414',  // hairline border
          300: '#1F1F1F',  // stronger border
          400: '#7A7A7A',  // subtle text / placeholders
          500: '#8C8C8C',  // muted body text
          600: '#A3A3A3',  // secondary body text
          700: '#B8B8B8',
          800: '#E0E0E0',  // strong text
          850: '#ECECEC',
          900: '#FFFFFF',  // primary text / headings
          950: '#0A0A0A',  // card surface; also button label on white
        },
        // Accent = white. On developer.x.com the primary button is a solid
        // white pill with a black label; the focus ring is white too.
        primary: {
          50: '#141414',   // subtle active surface
          100: '#FFFFFF',  // primary button fill
          200: '#E5E5E5',
          300: '#FFFFFF',  // focus ring
          400: '#FFFFFF',
          500: '#FFFFFF',  // focus-visible ring
          600: '#D4D4D4',  // brand wordmark tint
          700: '#B0B0B0',
          800: '#8C8C8C',
          900: '#737980',
          950: '#0A0A0A',
        },
        // Green is the single chromatic accent on the reference page and is
        // reserved for cost figures, positive deltas and success states.
        accent: {
          50: '#04140E',
          100: '#06251A',
          200: '#0B3D2A',
          300: '#10B981',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        success: {
          50: '#04140E',
          100: '#06251A',
          200: '#0B3D2A',
          300: '#10B981',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          50: '#1A0A0A',
          100: '#2A0F0F',
          200: '#4A1A17',
          300: '#EF4444',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        // Semantic aliases — the shared contract between both frontends.
        canvas: '#000000',
        surface: '#000000',
        'surface-2': '#0A0A0A',
        'surface-3': '#141414',
        line: '#1F1F1F',
        'line-strong': '#2E2E2E',
        // `secondary` and `tertiary` are legacy aliases still referenced by
        // a handful of components; they map onto the dark ramp.
        // `secondary` must clear 4.5:1 on the black canvas, so it is held at
        // #8F8F8F rather than the original #737980.
        secondary: '#8F8F8F',
        tertiary: '#262626',
        muted: '#8C8C8C',
      },
      fontFamily: {
        // TwitterChirp is proprietary; Inter is the closest free substitute.
        sans: ['Inter', 'Chirp', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        // The reference headlines are enormous and light-weight (font-weight
        // 400-500), not bold. `display-lg` drives hero and section titles.
        'display-lg': ['64px', { lineHeight: '1.06', letterSpacing: '-0.022em' }],
        'headline-lg': ['24px', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'headline-md': ['20px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'headline-sm': ['18px', { lineHeight: '1.35', letterSpacing: '-0.005em' }],
        'body-lg': ['16px', { lineHeight: '1.5', letterSpacing: '0px' }],
        'body-md': ['15px', { lineHeight: '1.53', letterSpacing: '0px' }],
        'body-sm': ['14px', { lineHeight: '1.43', letterSpacing: '0px' }],
        'label-lg': ['15px', { lineHeight: '1.53', letterSpacing: '0px' }],
        'label-md': ['12px', { lineHeight: '1.33', letterSpacing: '0px' }],
        hero: ['3.25rem', { lineHeight: '1.04', letterSpacing: '-0.022em' }],
        display: ['2.5rem', { lineHeight: '1.08', letterSpacing: '-0.022em' }],
      },
      letterSpacing: {
        // Section eyebrows are mono and widely tracked: `[ INTRODUCING ]`.
        micro: '.08em',
        eyebrow: '0.18em',
      },
      borderRadius: {
        // The reference is pill-driven: buttons, inputs and badges are fully
        // rounded. Larger panels keep a soft 8-16px radius.
        none: '0px',
        xs: '2px',
        sm: '4px',
        panel: '8px',
        card: '12px',
        control: '9999px',
        pill: '9999px',
        '4xl': '16px',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        // The only shadow on the reference is the soft white glow beneath the
        // hero and final-CTA buttons. All other elevation is hairline-only.
        none: 'none',
        control: 'none',
        soft: 'none',
        card: 'none',
        'card-hover': 'none',
        elevated: 'none',
        glow: '0 0 34px 2px rgb(255 255 255 / 0.22)',
        'glow-sm': '0 0 18px 0 rgb(255 255 255 / 0.14)',
        'glow-accent': '0 0 34px 2px rgb(16 185 129 / 0.20)',
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
