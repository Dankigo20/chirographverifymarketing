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
  'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 ease-out-expo focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-glow active:scale-[0.98]',
  secondary:
    'bg-white text-ink-900 border border-ink-200 shadow-soft hover:border-ink-300 hover:bg-ink-50 active:scale-[0.98]',
  outline:
    'bg-transparent text-primary-700 border border-primary-200 hover:bg-primary-50 hover:border-primary-300 active:scale-[0.98]',
  ghost: 'bg-transparent text-ink-700 hover:bg-ink-100 hover:text-ink-900 active:scale-[0.98]',
  dark: 'bg-ink-900 text-white shadow-soft hover:bg-ink-850 hover:shadow-glow active:scale-[0.98]',
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-3.5 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-6 py-3',
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
