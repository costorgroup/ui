import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { marqueeClasses } from './classes';
import {
  MarqueeItem,
  type TMarqueeItemProps,
} from './marquee-item';
import { SMarquee, SMarqueeTrack } from './styles';
import { TMarqueeDirection, TMarqueeProps } from './types';
import { mergeSlotProps } from '../../helpers/slot-props';

const isHorizontal = (direction: TMarqueeDirection) =>
  direction === 'left' || direction === 'right';

const travelSign = (direction: TMarqueeDirection) =>
  direction === 'left' || direction === 'top' ? 1 : -1;

const PAN_THRESHOLD = 6;
const COPIES = 4;

const isMarqueeItemElement = (
  child: ReactElement,
): child is ReactElement<TMarqueeItemProps> =>
  typeof child.type !== 'string' &&
  (child.type as { isMarqueeItem?: boolean }).isMarqueeItem === true;

const wrapItems = (children: TMarqueeProps['children']) =>
  Children.toArray(children).flatMap((child, index) => {
    if (!isValidElement(child)) {
      return [];
    }

    if (isMarqueeItemElement(child)) {
      return [child];
    }

    return [
      <MarqueeItem key={child.key ?? index}>{child}</MarqueeItem>,
    ];
  });

const readGap = (track: HTMLElement, horizontal: boolean) => {
  const style = window.getComputedStyle(track);
  const raw = horizontal ? style.columnGap : style.rowGap;
  const value = Number.parseFloat(raw);

  return Number.isFinite(value) ? value : 0;
};

const itemStride = (
  item: HTMLElement,
  horizontal: boolean,
  gap: number,
) => (horizontal ? item.offsetWidth : item.offsetHeight) + gap;

const Marquee = forwardRef<HTMLDivElement, TMarqueeProps>(
  (
    {
      children,
      direction = 'left',
      gap = 'sm',
      autoPlay = false,
      speed = 40,
      offset = 0,
      pauseOnHover = false,
      paused = false,
      align = 'center',
      className,
      onPointerDown,
      onMouseEnter,
      onMouseLeave,
      slotProps,
      ...props
    },
    ref,
  ) => {
    const items = useMemo(() => wrapItems(children), [children]);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const offsetRef = useRef(offset);
    const hoveringRef = useRef(false);
    const draggingRef = useRef(false);
    const pointerIdRef = useRef<number | null>(null);
    const lastPointRef = useRef<{ x: number; y: number } | null>(null);
    const suppressClickRef = useRef(false);
    const clearPointerListenersRef = useRef<(() => void) | null>(null);
    const clearClickListenerRef = useRef<(() => void) | null>(null);
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        viewportRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const applyTransform = useCallback(
      (axis: TMarqueeDirection) => {
        const track = trackRef.current;

        if (track == null || track.children.length < 2) {
          return;
        }

        const horizontal = isHorizontal(axis);
        const gapPx = readGap(track, horizontal);
        let guard = 0;

        while (guard < track.children.length) {
          const first = track.children.item(0) as HTMLElement | null;
          const second = track.children.item(1) as HTMLElement | null;

          if (first == null) {
            break;
          }

          const firstStride =
            second != null
              ? horizontal
                ? second.offsetLeft - first.offsetLeft
                : second.offsetTop - first.offsetTop
              : itemStride(first, horizontal, gapPx);

          if (firstStride <= 0) {
            break;
          }

          if (offsetRef.current >= firstStride) {
            offsetRef.current -= firstStride;
            track.appendChild(first);
            guard += 1;
            continue;
          }

          if (offsetRef.current < 0) {
            const last = track.children.item(
              track.children.length - 1,
            ) as HTMLElement | null;

            if (last == null) {
              break;
            }

            offsetRef.current += itemStride(last, horizontal, gapPx);
            track.insertBefore(last, first);
            guard += 1;
            continue;
          }

          break;
        }

        const x = horizontal ? -offsetRef.current : 0;
        const y = horizontal ? 0 : -offsetRef.current;
        track.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      },
      [],
    );

    useLayoutEffect(() => {
      offsetRef.current = offset;
      applyTransform(direction);
    }, [applyTransform, direction, offset, items.length]);

    useEffect(
      () => () => {
        clearPointerListenersRef.current?.();
        clearClickListenerRef.current?.();
      },
      [],
    );

    useEffect(() => {
      if (!autoPlay || paused || speed === 0 || items.length === 0) {
        return undefined;
      }

      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      let frame = 0;
      let last = performance.now();
      const travel = travelSign(direction) * Math.abs(speed);

      const tick = (now: number) => {
        const delta = Math.min(now - last, 64);
        last = now;

        if (
          !draggingRef.current &&
          !hoveringRef.current &&
          !media.matches
        ) {
          offsetRef.current += (travel * delta) / 1000;
          applyTransform(direction);
        }

        frame = window.requestAnimationFrame(tick);
      };

      frame = window.requestAnimationFrame(tick);

      return () => window.cancelAnimationFrame(frame);
    }, [applyTransform, autoPlay, direction, items.length, paused, speed]);

    const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
      onPointerDown?.(event);

      if (event.defaultPrevented || event.button !== 0) {
        return;
      }

      const viewport = viewportRef.current;

      if (viewport == null) {
        return;
      }

      clearPointerListenersRef.current?.();
      clearClickListenerRef.current?.();
      pointerIdRef.current = event.pointerId;
      lastPointRef.current = { x: event.clientX, y: event.clientY };
      draggingRef.current = false;
      suppressClickRef.current = false;

      const onPointerMove = (moveEvent: PointerEvent) => {
        if (moveEvent.pointerId !== pointerIdRef.current) {
          return;
        }

        if (moveEvent.buttons === 0) {
          onPointerUp(moveEvent);
          return;
        }

        const last = lastPointRef.current;

        if (last == null) {
          return;
        }

        const deltaX = moveEvent.clientX - last.x;
        const deltaY = moveEvent.clientY - last.y;

        if (!draggingRef.current) {
          const along = isHorizontal(direction)
            ? Math.abs(deltaX)
            : Math.abs(deltaY);
          const across = isHorizontal(direction)
            ? Math.abs(deltaY)
            : Math.abs(deltaX);

          if (along < PAN_THRESHOLD || along < across) {
            return;
          }

          draggingRef.current = true;
          suppressClickRef.current = true;
          viewport.dataset.dragging = 'true';
        }

        moveEvent.preventDefault();
        offsetRef.current -= isHorizontal(direction) ? deltaX : deltaY;
        lastPointRef.current = { x: moveEvent.clientX, y: moveEvent.clientY };
        applyTransform(direction);
      };

      const onClickCapture = (clickEvent: MouseEvent) => {
        if (!suppressClickRef.current) {
          return;
        }

        clickEvent.preventDefault();
        clickEvent.stopPropagation();
        suppressClickRef.current = false;
        clearClickListenerRef.current?.();
      };

      const onPointerUp = (upEvent: PointerEvent) => {
        if (upEvent.pointerId !== pointerIdRef.current) {
          return;
        }

        clearPointerListenersRef.current?.();

        if (!suppressClickRef.current) {
          clearClickListenerRef.current?.();
        }

        pointerIdRef.current = null;
        lastPointRef.current = null;
        draggingRef.current = false;
        viewport.removeAttribute('data-dragging');
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
      window.addEventListener('click', onClickCapture, true);

      clearPointerListenersRef.current = () => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);
        clearPointerListenersRef.current = null;
      };

      clearClickListenerRef.current = () => {
        window.removeEventListener('click', onClickCapture, true);
        clearClickListenerRef.current = null;
      };
    };

    return (
      <SMarquee
        ref={setRefs}
        direction={direction}
        gap={gap}
        align={align}
        {...props}
        className={mergeClasses(marqueeClasses.root, className)}
        onPointerDown={handlePointerDown}
        onMouseEnter={(event) => {
          hoveringRef.current = pauseOnHover;
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          hoveringRef.current = false;
          onMouseLeave?.(event);
        }}
      >
        <SMarqueeTrack
          {...mergeSlotProps(
            {
              ref: trackRef,
              direction,
              gap,
              align,
              className: marqueeClasses.track,
            },
            slotProps?.track,
          )}
        >
          {Array.from({ length: COPIES }, (_, copy) =>
            items.map((item, index) =>
              cloneElement(item, {
                key: `${copy}:${item.key ?? index}`,
              }),
            ),
          )}
        </SMarqueeTrack>
      </SMarquee>
    );
  },
);

Marquee.displayName = 'Marquee';

export type {
  TMarqueeProps,
  TMarqueeSlotProps,
  TMarqueeDirection,
  TMarqueeGap,
} from './types';
export type { TMarqueeItemProps } from './marquee-item';
export { marqueeClasses } from './classes';
export { MarqueeItem, marqueeItemClasses } from './marquee-item';
export { Marquee };
export default Marquee;
