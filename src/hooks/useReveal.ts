import { useEffect, useRef, useState } from 'react';

/**
 * Reveal-on-scroll hook using IntersectionObserver.
 * Returns a ref to attach and a boolean for visibility.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; once?: boolean }
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const once = options?.once ?? true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: options?.threshold ?? 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.once]);

  return { ref, visible };
}
