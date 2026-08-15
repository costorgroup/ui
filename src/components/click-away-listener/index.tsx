import React, {
  Children,
  Ref,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
} from 'react';
import { TClickAwayListenerProps } from './types';

const mouseEventMap = {
  onClick: 'click',
  onMouseDown: 'mousedown',
  onMouseUp: 'mouseup',
  onPointerDown: 'pointerdown',
} as const;

const touchEventMap = {
  onTouchStart: 'touchstart',
  onTouchEnd: 'touchend',
} as const;

const assignRef = <T,>(ref: Ref<T> | undefined, value: T) => {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    (ref as { current: T }).current = value;
  }
};

const ClickAwayListener = ({
  children,
  onClickAway,
  mouseEvent = 'onMouseDown',
  touchEvent = 'onTouchEnd',
}: TClickAwayListenerProps) => {
  const nodeRef = useRef<Element | null>(null);
  const onClickAwayRef = useRef(onClickAway);
  onClickAwayRef.current = onClickAway;

  const child = Children.only(children);

  useEffect(() => {
    const handleAway = (event: MouseEvent | TouchEvent) => {
      const node = nodeRef.current;
      const target = event.target as Node | null;

      if (!node || !target || node.contains(target)) {
        return;
      }

      onClickAwayRef.current(event);
    };

    if (mouseEvent) {
      document.addEventListener(mouseEventMap[mouseEvent], handleAway);
    }

    if (touchEvent) {
      document.addEventListener(touchEventMap[touchEvent], handleAway);
    }

    return () => {
      if (mouseEvent) {
        document.removeEventListener(mouseEventMap[mouseEvent], handleAway);
      }

      if (touchEvent) {
        document.removeEventListener(touchEventMap[touchEvent], handleAway);
      }
    };
  }, [mouseEvent, touchEvent]);

  if (!isValidElement(child)) {
    return child;
  }

  const childRef = (child as { ref?: Ref<Element> }).ref;

  return cloneElement(child as React.ReactElement<{ ref?: Ref<Element> }>, {
    ref: (node: Element | null) => {
      nodeRef.current = node;
      assignRef(childRef, node);
    },
  });
};

ClickAwayListener.displayName = 'ClickAwayListener';

export type {
  TClickAwayListenerProps,
  TClickAwayMouseEvent,
  TClickAwayTouchEvent,
} from './types';
export { ClickAwayListener };
export default ClickAwayListener;
