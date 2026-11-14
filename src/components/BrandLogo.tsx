export function BrandLogo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#3B5BFF" strokeLinecap="round" fill="none">
        <path d="M17.16 8.63A9 9 0 1 0 17.16 23.37" strokeWidth="2.6" />
        <path d="M14.91 11.34A5.5 5.5 0 1 0 14.91 20.66" strokeWidth="2.4" />
        <path d="M13.03 14.06A2.2 2.2 0 1 0 13.03 17.94" strokeWidth="2.2" />
      </g>
      <path
        d="M17.8 18.2L21 21.4l5.8-7.2"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
