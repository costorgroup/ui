import { createContext, useContext, useEffect, useState } from 'react';
import { PRESENCE_MS } from './tokens';

export const OverlayMotionContext = createContext(true);

export const useOverlayOpen = () => useContext(OverlayMotionContext);

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const usePresence = (open: boolean, durationMs = PRESENCE_MS) => {
  const [present, setPresent] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    const duration = reducedMotion() ? 0 : durationMs;

    if (open) {
      setPresent(true);

      let inner = 0;
      const outer = window.requestAnimationFrame(() => {
        inner = window.requestAnimationFrame(() => setVisible(true));
      });

      return () => {
        window.cancelAnimationFrame(outer);
        window.cancelAnimationFrame(inner);
      };
    }

    setVisible(false);

    const timeout = window.setTimeout(() => setPresent(false), duration);

    return () => window.clearTimeout(timeout);
  }, [open, durationMs]);

  return { present, visible };
};
