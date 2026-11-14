import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

interface NetworkNode {
  id: number;
  x: number;
  y: number;
  r: number;
  layer: 0 | 1 | 2;
  accent: 'emerald' | 'indigo';
  pulseDelay: number;
}

const NETWORK_NODES: NetworkNode[] = [
  // Layer 0 (far, subtle parallax)
  { id: 0, x: 110, y: 120, r: 2.2, layer: 0, accent: 'indigo', pulseDelay: 0.0 },
  { id: 1, x: 340, y: 85, r: 2.0, layer: 0, accent: 'emerald', pulseDelay: 0.8 },
  { id: 2, x: 640, y: 110, r: 2.4, layer: 0, accent: 'indigo', pulseDelay: 1.4 },
  { id: 3, x: 960, y: 95, r: 2.1, layer: 0, accent: 'emerald', pulseDelay: 0.4 },
  { id: 4, x: 1110, y: 270, r: 2.2, layer: 0, accent: 'indigo', pulseDelay: 1.9 },
  { id: 5, x: 160, y: 580, r: 2.0, layer: 0, accent: 'emerald', pulseDelay: 1.1 },

  // Layer 1 (mid parallax)
  { id: 6, x: 230, y: 240, r: 2.8, layer: 1, accent: 'emerald', pulseDelay: 0.3 },
  { id: 7, x: 520, y: 200, r: 2.5, layer: 1, accent: 'indigo', pulseDelay: 1.2 },
  { id: 8, x: 820, y: 225, r: 2.8, layer: 1, accent: 'emerald', pulseDelay: 0.6 },
  { id: 9, x: 1055, y: 455, r: 2.6, layer: 1, accent: 'indigo', pulseDelay: 1.7 },
  { id: 10, x: 590, y: 590, r: 2.7, layer: 1, accent: 'emerald', pulseDelay: 0.9 },
  { id: 11, x: 95, y: 410, r: 2.6, layer: 1, accent: 'indigo', pulseDelay: 2.1 },

  // Layer 2 (foreground subtle parallax)
  { id: 12, x: 420, y: 520, r: 3.1, layer: 2, accent: 'indigo', pulseDelay: 0.5 },
  { id: 13, x: 740, y: 495, r: 3.0, layer: 2, accent: 'emerald', pulseDelay: 1.3 },
  { id: 14, x: 930, y: 615, r: 2.8, layer: 2, accent: 'indigo', pulseDelay: 0.2 },
  { id: 15, x: 1125, y: 140, r: 2.9, layer: 2, accent: 'emerald', pulseDelay: 1.6 },
];

const LAYER_EDGES: [number, number][] = [
  // Layer 0
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  // Layer 1
  [6, 7],
  [7, 8],
  [8, 9],
  [6, 11],
  [10, 9],
  [11, 10],
  // Layer 2
  [12, 13],
  [13, 14],
];

const TETHER_RADIUS = 270;

function InteractiveTether({
  node,
  cursorX,
  cursorY,
  cursorActive,
  layerShiftX,
  layerShiftY,
}: {
  node: NetworkNode;
  cursorX: ReturnType<typeof useSpring>;
  cursorY: ReturnType<typeof useSpring>;
  cursorActive: ReturnType<typeof useSpring>;
  layerShiftX: ReturnType<typeof useTransform<number, number>>;
  layerShiftY: ReturnType<typeof useTransform<number, number>>;
}) {
  const nodeX = useTransform(layerShiftX, (dx) => node.x + dx);
  const nodeY = useTransform(layerShiftY, (dy) => node.y + dy);

  const opacity = useTransform(
    [cursorX, cursorY, cursorActive, nodeX, nodeY],
    ([cx, cy, active, nx, ny]: number[]) => {
      if (active <= 0.01) return 0;
      const dist = Math.hypot(cx - nx, cy - ny);
      if (dist >= TETHER_RADIUS) return 0;
      return (1 - dist / TETHER_RADIUS) * 0.48 * active;
    },
  );

  return (
    <motion.line
      x1={nodeX}
      y1={nodeY}
      x2={cursorX}
      y2={cursorY}
      stroke={node.accent === 'emerald' ? '#10B981' : '#7e95ff'}
      strokeWidth={1}
      strokeDasharray="3 3"
      style={{ opacity }}
    />
  );
}

/**
 * Lightweight, mouse-reactive Framer Motion particle network overlay
 * creating a subtle cryptographic connectivity mesh in the hero section.
 */
export function HeroNetworkParticles() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  // Normalized cursor [-1, 1] for depth parallax
  const rawNormX = useMotionValue(0);
  const rawNormY = useMotionValue(0);
  const smoothNormX = useSpring(rawNormX, { stiffness: 90, damping: 24, mass: 0.7 });
  const smoothNormY = useSpring(rawNormY, { stiffness: 90, damping: 24, mass: 0.7 });

  // Cursor position in SVG viewBox space (1200 x 720)
  const rawSvgX = useMotionValue(600);
  const rawSvgY = useMotionValue(360);
  const rawActive = useMotionValue(0);

  const smoothSvgX = useSpring(rawSvgX, { stiffness: 150, damping: 26, mass: 0.5 });
  const smoothSvgY = useSpring(rawSvgY, { stiffness: 150, damping: 26, mass: 0.5 });
  const smoothActive = useSpring(rawActive, { stiffness: 140, damping: 24 });

  // Depth-layer offsets driven smoothly via MotionValues
  const shiftX0 = useTransform(smoothNormX, [-1, 1], [-8, 8]);
  const shiftY0 = useTransform(smoothNormY, [-1, 1], [-6, 6]);
  const shiftX1 = useTransform(smoothNormX, [-1, 1], [-18, 18]);
  const shiftY1 = useTransform(smoothNormY, [-1, 1], [-13, 13]);
  const shiftX2 = useTransform(smoothNormX, [-1, 1], [-28, 28]);
  const shiftY2 = useTransform(smoothNormY, [-1, 1], [-20, 20]);

  const layerShifts = [
    { x: shiftX0, y: shiftY0 },
    { x: shiftX1, y: shiftY1 },
    { x: shiftX2, y: shiftY2 },
  ];

  useEffect(() => {
    const parent = hostRef.current?.parentElement;
    if (!parent) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;

      rawNormX.set((relX - 0.5) * 2);
      rawNormY.set((relY - 0.5) * 2);
      rawSvgX.set(relX * 1200);
      rawSvgY.set(relY * 720);
      rawActive.set(1);
    };

    const handlePointerLeave = () => {
      rawNormX.set(0);
      rawNormY.set(0);
      rawActive.set(0);
    };

    parent.addEventListener('pointermove', handlePointerMove, { passive: true });
    parent.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      parent.removeEventListener('pointermove', handlePointerMove);
      parent.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [rawActive, rawNormX, rawNormY, rawSvgX, rawSvgY]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        {/* Parallax Depth Layers (0, 1, 2) */}
        {([0, 1, 2] as const).map((layerIdx) => {
          const nodes = NETWORK_NODES.filter((n) => n.layer === layerIdx);
          const edges = LAYER_EDGES.filter(([a]) => NETWORK_NODES[a].layer === layerIdx);
          const { x: lx, y: ly } = layerShifts[layerIdx];

          return (
            <motion.g key={layerIdx} style={{ x: lx, y: ly }}>
              {edges.map(([aIdx, bIdx]) => {
                const a = NETWORK_NODES[aIdx];
                const b = NETWORK_NODES[bIdx];
                return (
                  <line
                    key={`${aIdx}-${bIdx}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={a.accent === 'emerald' ? 'rgba(16,185,129,0.16)' : 'rgba(126,149,255,0.16)'}
                    strokeWidth={1}
                  />
                );
              })}

              {nodes.map((node) => {
                const fill = node.accent === 'emerald' ? '#10B981' : '#7e95ff';
                const halo =
                  node.accent === 'emerald' ? 'rgba(16,185,129,0.22)' : 'rgba(59,91,255,0.22)';
                return (
                  <g key={node.id}>
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r * 2.8}
                      fill={halo}
                      animate={{ opacity: [0.18, 0.5, 0.18], scale: [0.9, 1.18, 0.9] }}
                      transition={{
                        duration: 4.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: node.pulseDelay,
                      }}
                      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                    />
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r}
                      fill={fill}
                      animate={{ opacity: [0.45, 0.92, 0.45] }}
                      transition={{
                        duration: 3.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: node.pulseDelay,
                      }}
                    />
                  </g>
                );
              })}
            </motion.g>
          );
        })}

        {/* Dynamic Mouse-Reactive Connectivity Tethers */}
        {NETWORK_NODES.map((node) => (
          <InteractiveTether
            key={`tether-${node.id}`}
            node={node}
            cursorX={smoothSvgX}
            cursorY={smoothSvgY}
            cursorActive={smoothActive}
            layerShiftX={layerShifts[node.layer].x}
            layerShiftY={layerShifts[node.layer].y}
          />
        ))}

        {/* Subtle Pointer Node Anchor */}
        <motion.circle
          cx={smoothSvgX}
          cy={smoothSvgY}
          r={14}
          fill="none"
          stroke="rgba(16,185,129,0.32)"
          strokeWidth={1}
          style={{ opacity: smoothActive }}
        />
        <motion.circle
          cx={smoothSvgX}
          cy={smoothSvgY}
          r={2.5}
          fill="#10B981"
          style={{ opacity: smoothActive }}
        />
      </svg>
    </div>
  );
}
