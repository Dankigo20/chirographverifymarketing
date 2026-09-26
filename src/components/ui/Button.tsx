import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'dark';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  as?: 'button';
  children: ReactNode;
}

interface AnchorProps {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500/60 disabled:opacity-55 disabled:pointer-events-none whitespace-nowrap';

// On developer.x.com the primary action is a solid white pill carrying a
// black label and a soft white glow; the secondary is a hairline outline.
const variants: Record<Variant, string> = {
  primary:
    'bg-primary-100 text-ink-950 hover:bg-white hover:shadow-glow active:bg-white',
  secondary:
    'bg-transparent text-ink-900 border border-ink-300 hover:border-ink-500 hover:bg-white/[0.06]',
  outline:
    'bg-transparent text-ink-900 border border-ink-300 hover:bg-white/[0.06] hover:border-ink-500',
  ghost: 'bg-transparent text-ink-600 hover:bg-white/[0.08] hover:text-ink-900',
  dark: 'bg-ink-800 text-ink-900 hover:bg-ink-700',
};

const sizes: Record<Size, string> = {
  sm: 'text-[13px] px-4 h-9',
  md: 'text-[15px] px-5 h-11',
  lg: 'text-[15px] px-6 h-12',
};

function classes(variant: Variant, size: Size, className?: string) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className ?? ''}`.trim();
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, ...props },
  ref
) {
  return (
    <button ref={ref} className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  );
});

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className,
  external,
  onClick,
}: AnchorProps) {
  const isExternal = external ?? (href.startsWith('http') || href.startsWith('//'));
  const internalHref = isExternal ? href : `#${href}`;
  return (
    <a
      href={internalHref}
      className={classes(variant, size, className)}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
