import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  featured?: boolean;
  onClick?: () => void;
}

/**
 * Interactive dark glassmorphic card powered by CSS custom-property
 * pointer-tracking radial reflections and subtle morphism elevation.
 */
export function GlassCard({
  children,
  className = '',
  featured = false,
  onClick,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl transition-transform duration-200 hover:-translate-y-0.5 ${
        featured ? 'glass-panel-featured' : 'glass-panel'
      } ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
