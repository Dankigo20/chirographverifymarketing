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
  'inline-flex items-center justify-center gap-2 font-medium rounded-control transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary-500/35 disabled:opacity-55 disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary: 'bg-primary-600 text-white shadow-control hover:bg-primary-700 active:bg-primary-800',
  secondary:
    'bg-ink-950 text-ink-900 border border-ink-800 shadow-control hover:border-ink-700 hover:\bg-ink-950/[0.06]',
  outline: 'bg-transparent text-primary-700 border border-primary-200 hover:bg-primary-50 hover:border-primary-300',
  ghost: 'bg-transparent text-ink-600 hover:\bg-ink-950/[0.06] hover:text-ink-900',
  dark: 'bg-ink-900 text-white shadow-control hover:bg-ink-800',
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 h-8',
  md: 'text-sm px-3.5 py-2 h-9',
  lg: 'text-[15px] px-4 py-2.5 h-10',
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
