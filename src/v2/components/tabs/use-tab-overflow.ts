import {
  ReactNode,
  RefObject,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import { TTabsOrientation } from './context';

export const useTabOverflow = (
  listRef: RefObject<HTMLElement | null>,
  orientation: TTabsOrientation,
  children?: ReactNode,
) => {
  const [fadeStart, setFadeStart] = useState(false);
  const [fadeEnd, setFadeEnd] = useState(false);

  const update = useCallback(() => {
    const list = listRef.current;

    if (list == null) {
      setFadeStart(false);
      setFadeEnd(false);
      return;
    }

    const scroll =
      orientation === 'horizontal' ? list.scrollLeft : list.scrollTop;
    const max =
      orientation === 'horizontal'
        ? list.scrollWidth - list.clientWidth
        : list.scrollHeight - list.clientHeight;

    setFadeStart(scroll > 0);
    setFadeEnd(max > 0 && scroll < max);
  }, [listRef, orientation]);

  useLayoutEffect(() => {
    const list = listRef.current;

    if (list == null) {
      return undefined;
    }

    update();
    list.addEventListener('scroll', update, { passive: true });
    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    observer?.observe(list);

    for (const child of Array.from(list.children)) {
      observer?.observe(child);
    }

    return () => {
      list.removeEventListener('scroll', update);
      observer?.disconnect();
    };
  }, [children, listRef, update]);

  return { fadeStart, fadeEnd };
};
