import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

/**
 * Smooth scroll-triggered intersection observer reveal ('fade-in-up')
 * animating strictly compositor properties (opacity + transform).
 */
export function ScrollReveal({
  children,
  delay = 0,
  className = '',
  yOffset = 18,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.48,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
