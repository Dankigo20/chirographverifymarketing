import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article';
}

export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={`animate-on-scroll ${visible ? 'is-visible' : ''} ${className ?? ''}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
