import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@emotion/react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { tooltipClasses } from './classes';
import { getTooltipCoords } from './get-coords';
import { STooltipContent, STooltipPanel, STooltipTrigger } from './styles';
import { TTooltipProps } from './types';
import { mergeSlotProps } from '../../helpers/slot-props';

const assignRef = <T,>(ref: React.Ref<T> | undefined, value: T | null) => {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  (ref as React.MutableRefObject<T | null>).current = value;
};

const Tooltip = forwardRef<HTMLSpanElement, TTooltipProps>(
  (
    {
      children,
      title,
      render,
      placement = 'top',
      offset = 8,
      className,
      slotProps,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLSpanElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const setTriggerNode = useCallback(
      (node: HTMLSpanElement | null) => {
        triggerRef.current = node;
        assignRef(ref, node);
      },
      [ref],
    );

    const getViewportPadding = useCallback(() => {
      const value = theme.spacing(theme.gap.md);
      const amount = parseFloat(value);

      if (Number.isNaN(amount)) {
        return 16;
      }

      if (value.endsWith('rem')) {
        const root =
          typeof document !== 'undefined'
            ? parseFloat(getComputedStyle(document.documentElement).fontSize) ||
              16
            : 16;

        return amount * root;
      }

      return amount;
    }, [theme]);

    const clearCloseTimer = useCallback(() => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    }, []);

    const openTooltip = useCallback(() => {
      clearCloseTimer();
      setMounted(true);
    }, [clearCloseTimer]);

    const scheduleClose = useCallback(() => {
      clearCloseTimer();
      closeTimerRef.current = setTimeout(() => {
        setVisible(false);
      }, 100);
    }, [clearCloseTimer]);

    const updatePosition = useCallback(() => {
      const trigger = triggerRef.current;
      const content = contentRef.current;

      if (!trigger || !content) {
        return;
      }

      setCoords(
        getTooltipCoords(
          trigger.getBoundingClientRect(),
          content.getBoundingClientRect(),
          placement,
          offset,
          getViewportPadding(),
          {
            width: window.innerWidth,
            height: window.innerHeight,
          },
        ),
      );
    }, [getViewportPadding, offset, placement]);

    const tooltipBody = render ? render({ placement }) : title;

    useLayoutEffect(() => {
      if (!mounted) {
        return;
      }

      updatePosition();

      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => {
          setVisible(true);
        });
      });

      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }, [mounted, updatePosition, tooltipBody]);

    useEffect(() => {
      if (!mounted) {
        return;
      }

      const handleReposition = () => {
        updatePosition();
      };

      window.addEventListener('resize', handleReposition);
      window.addEventListener('scroll', handleReposition, true);

      return () => {
        window.removeEventListener('resize', handleReposition);
        window.removeEventListener('scroll', handleReposition, true);
      };
    }, [mounted, updatePosition]);

    useEffect(
      () => () => {
        clearCloseTimer();
      },
      [clearCloseTimer],
    );

    const portal =
      mounted && tooltipBody != null && typeof document !== 'undefined'
        ? createPortal(
            <STooltipContent
              {...mergeSlotProps(
                {
                  ref: contentRef,
                  top: coords.top,
                  left: coords.left,
                  placement,
                  visible,
                  role: 'tooltip',
                  onMouseEnter: openTooltip,
                  onMouseLeave: scheduleClose,
                  onTransitionEnd: (event) => {
                    if (event.target !== event.currentTarget) {
                      return;
                    }

                    if (event.propertyName !== 'opacity') {
                      return;
                    }

                    if (!visible) {
                      setMounted(false);
                    }
                  },
                },
                slotProps?.popper,
              )}
            >
              <STooltipPanel
                {...mergeSlotProps(
                  {
                    elevation: 2,
                    variant: 'surface',
                    radius: 'md',
                    className: tooltipClasses.panel,
                  },
                  slotProps?.panel,
                )}
              >
                {tooltipBody}
              </STooltipPanel>
            </STooltipContent>,
            document.body,
          )
        : null;

    return (
      <>
        <STooltipTrigger
          ref={setTriggerNode}
          onMouseEnter={openTooltip}
          onMouseLeave={scheduleClose}
          onFocus={openTooltip}
          onBlur={scheduleClose}
          {...props}
          className={mergeClasses(tooltipClasses.root, className)}
        >
          {children}
        </STooltipTrigger>
        {portal}
      </>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export type {
  TTooltipProps,
  TTooltipSlotProps,
  TTooltipPlacement,
  TTooltipRender,
  TTooltipRenderProps,
} from './types';
export { tooltipClasses } from './classes';
export { Tooltip };
export default Tooltip;
