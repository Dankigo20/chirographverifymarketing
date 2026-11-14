import { useEffect } from 'react';

const GLASS_SELECTOR = '.glass-panel, .glass-panel-soft, .glass-panel-featured';

/**
 * Tracks pointer movement with rAF throttling and updates CSS custom properties
 * (--mouse-x, --mouse-y, --reflection-opacity) on hovered glass panels for a
 * hardware-polished radial reflection and specular edge highlight.
 */
export function useGlassReflection() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const activePanels = new Set<HTMLElement>();
    let rafId = 0;
    let latestX = 0;
    let latestY = 0;
    let latestTarget: EventTarget | null = null;
    let scheduled = false;

    const clearAll = () => {
      activePanels.forEach((panel) => {
        panel.style.setProperty('--reflection-opacity', '0');
      });
      activePanels.clear();
    };

    const flush = () => {
      scheduled = false;
      const nextPanels = new Set<HTMLElement>();

      let cursor = latestTarget instanceof Element ? latestTarget : null;
      while (cursor) {
        if (cursor instanceof HTMLElement && cursor.matches(GLASS_SELECTOR)) {
          nextPanels.add(cursor);
        }
        cursor = cursor.parentElement;
      }

      activePanels.forEach((panel) => {
        if (!nextPanels.has(panel)) {
          panel.style.setProperty('--reflection-opacity', '0');
          activePanels.delete(panel);
        }
      });

      nextPanels.forEach((panel) => {
        const rect = panel.getBoundingClientRect();
        const x = latestX - rect.left;
        const y = latestY - rect.top;
        panel.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
        panel.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);
        panel.style.setProperty('--reflection-opacity', '1');
        activePanels.add(panel);
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      latestX = e.clientX;
      latestY = e.clientY;
      latestTarget = e.target;

      if (!scheduled) {
        scheduled = true;
        rafId = window.requestAnimationFrame(flush);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', clearAll);
    window.addEventListener('blur', clearAll);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', clearAll);
      window.removeEventListener('blur', clearAll);
      clearAll();
    };
  }, []);
}
