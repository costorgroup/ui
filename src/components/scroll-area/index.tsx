import React, {
  ElementType,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { scrollAreaClasses } from './classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { trackPointerOutside } from '../../helpers/track-pointer-outside';
import { SScrollArea } from './styles';
import { TScrollAreaOwnProps, TScrollAreaProps } from './types';

const ScrollArea = forwardRef(function ScrollArea<
  C extends ElementType = 'div',
>(
  {
    as,
    children,
    mode = 'hover',
    color = 'primary',
    className, ...props
  }: TScrollAreaProps<C>,
  ref: React.Ref<Element>,
) {
  const localRef = useRef<HTMLDivElement>(null);
  const stopOutsideTrackingRef = useRef<(() => void) | null>(null);
  const [hovered, setHovered] = useState(false);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      localRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<Element | null>).current = node;
      }
    },
    [ref],
  );

  const stopOutsideTracking = useCallback(() => {
    stopOutsideTrackingRef.current?.();
    stopOutsideTrackingRef.current = null;
  }, []);

  const hideHoverScrollbar = useCallback(() => {
    setHovered(false);
    stopOutsideTrackingRef.current = null;
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);

    if (mode !== 'hover' || !localRef.current) {
      return;
    }

    stopOutsideTracking();
    stopOutsideTrackingRef.current = trackPointerOutside(
      localRef.current,
      hideHoverScrollbar,
    );
  }, [hideHoverScrollbar, mode, stopOutsideTracking]);

  useEffect(() => () => stopOutsideTracking(), [stopOutsideTracking]);

  return (
    <SScrollArea
      as={as}
      ref={setRefs}
      mode={mode}
      color={color}
      hovered={hovered}
      onMouseEnter={handleMouseEnter}
      {...props}
        className={mergeClasses(
          scrollAreaClasses.root,
          className,
        )}
    >
      {children}
    </SScrollArea>
  );
}) as TPolymorphicComponent<'div', TScrollAreaOwnProps>;

ScrollArea.displayName = 'ScrollArea';

export type {
  TScrollAreaProps,
  TScrollAreaOwnProps,
  TScrollAreaMode,
} from './types';
export { scrollAreaClasses } from './classes';
export { ScrollArea };
export default ScrollArea;
