import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import type { TMenuAnchorPosition } from '../../components/menu/types';
import type {
  TUseMenuMenuProps,
  TUseMenuOptions,
  TUseMenuReturn,
  TUseMenuTriggerProps,
} from './types';

const HOVER_DELAY_MS = 200;

const useMenu = ({
  trigger = 'click',
  delay = HOVER_DELAY_MS,
  placement,
  offset,
}: TUseMenuOptions = {}): TUseMenuReturn => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorPosition, setAnchorPosition] =
    useState<TMenuAnchorPosition | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resolvedOffset = offset ?? (trigger === 'context' ? 0 : 4);
  const open = trigger === 'context' ? anchorPosition != null : Boolean(anchorEl);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    clearCloseTimer();
    setAnchorEl(null);
    setAnchorPosition(null);
  }, [clearCloseTimer]);

  useEffect(
    () => () => {
      clearCloseTimer();
    },
    [clearCloseTimer],
  );

  const openAtElement = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      clearCloseTimer();
      setAnchorPosition(null);
      setAnchorEl(event.currentTarget);
    },
    [clearCloseTimer],
  );

  const triggerProps = useMemo<TUseMenuTriggerProps>(() => {
    const base = {
      'aria-haspopup': 'menu' as const,
      'aria-expanded': open,
    };

    if (trigger === 'hover') {
      return {
        ...base,
        onMouseEnter: openAtElement,
        onMouseLeave: () => {
          clearCloseTimer();
          closeTimerRef.current = setTimeout(close, delay);
        },
      };
    }

    if (trigger === 'context') {
      return {
        ...base,
        onContextMenu: (event: MouseEvent<HTMLElement>) => {
          event.preventDefault();
          clearCloseTimer();
          setAnchorEl(null);
          setAnchorPosition({ top: event.clientY, left: event.clientX });
        },
      };
    }

    return {
      ...base,
      onClick: (event: MouseEvent<HTMLElement>) => {
        if (anchorEl === event.currentTarget) {
          close();
          return;
        }

        openAtElement(event);
      },
    };
  }, [anchorEl, clearCloseTimer, close, delay, open, openAtElement, trigger]);

  const menuProps = useMemo<TUseMenuMenuProps>(() => {
    const next: TUseMenuMenuProps = {
      open,
      onClose: close,
      anchorEl,
      anchorPosition,
      offset: resolvedOffset,
      placement,
    };

    if (trigger === 'hover') {
      next.onMouseEnter = clearCloseTimer;
      next.onMouseLeave = () => {
        clearCloseTimer();
        closeTimerRef.current = setTimeout(close, delay);
      };
    }

    return next;
  }, [
    anchorEl,
    anchorPosition,
    clearCloseTimer,
    close,
    delay,
    open,
    placement,
    resolvedOffset,
    trigger,
  ]);

  return { open, close, triggerProps, menuProps };
};

export type {
  TMenuTrigger,
  TUseMenuOptions,
  TUseMenuReturn,
  TUseMenuTriggerProps,
  TUseMenuMenuProps,
} from './types';
export { useMenu };
export default useMenu;
