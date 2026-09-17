export const MOTION = {
  duration: '220ms',
  durationMs: 220,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

export const PRESENCE_MS = MOTION.durationMs + 20;

export type TOverlayEdge = 'left' | 'right' | 'top' | 'bottom';
