/**
 * Chirograph Verify brand mark (DESIGN.md §9), Option 3.
 *
 * A concentric-arc "C" — the fingerprint/chirograph motif — in brand blue,
 * closed by a green verification check.
 *
 * BRAND-COLOR EXCEPTION (deliberate, do not "fix"):
 * The product UI is a black / white / gray system where green is the only
 * chromatic accent. Blue exists HERE AND ONLY HERE. It is a fixed brand
 * constant, never a Tailwind token, so it can never leak into buttons, cards,
 * borders, backgrounds or any other UI surface. Do not map this to
 * `primary-*` / `accent-*`; those ramps are greys and green respectively.
 *
 * Both stops are chosen to stay legible on the black canvas and on white.
 */
const BRAND_BLUE = '#3B5BFF';
const BRAND_GREEN = '#10B981'; // identical to accent-500 / success

interface BrandMarkProps {
  className?: string;
  title?: string;
}

export function BrandMark({ className, title }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {/* Concentric "C" arcs, open to the right */}
      <g stroke={BRAND_BLUE} strokeLinecap="round" fill="none">
        <path d="M17.16 8.63A9 9 0 1 0 17.16 23.37" strokeWidth="2.6" />
        <path d="M14.91 11.34A5.5 5.5 0 1 0 14.91 20.66" strokeWidth="2.4" />
        <path d="M13.03 14.06A2.2 2.2 0 1 0 13.03 17.94" strokeWidth="2.2" />
      </g>
      {/* Verification check */}
      <path
        d="M17.8 18.2L21 21.4l5.8-7.2"
        stroke={BRAND_GREEN}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default BrandMark;