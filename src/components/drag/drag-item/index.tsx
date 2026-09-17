import React, { forwardRef, PointerEvent, useContext, useRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { DRAG_ITEM_ATTR, DragGroupContext } from '../context';
import { getDragHost, startDragItemDrag } from '../session';
import { dragItemClasses } from './classes';
import { SDragItem } from './styles';
import { TDragItemProps } from './types';

const DRAG_THRESHOLD = 4;

const matchesSelector = (target: EventTarget | null, selector?: string) => {
  if (!selector || !(target instanceof Element)) {
    return false;
  }

  return Boolean(target.closest(selector));
};

const DragItem = forwardRef<HTMLDivElement, TDragItemProps>(
  ({ children, className, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, ...props }, ref) => {
    const context = useContext(DragGroupContext);
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const pointerRef = useRef<{
      id: number;
      x: number;
      y: number;
      started: boolean;
    } | null>(null);

    const setRefs = (node: HTMLDivElement | null) => {
      nodeRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
      onPointerDown?.(event);

      if (
        !context ||
        event.button !== 0 ||
        event.defaultPrevented
      ) {
        return;
      }

      if (
        context.nonDragAreaSelector &&
        matchesSelector(event.target, context.nonDragAreaSelector)
      ) {
        return;
      }

      if (
        context.dragHandleSelector &&
        !matchesSelector(event.target, context.dragHandleSelector)
      ) {
        return;
      }

      pointerRef.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        started: false,
      };
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(event);

      const pointer = pointerRef.current;
      const node = nodeRef.current;

      if (!pointer || pointer.id !== event.pointerId || !context || !node) {
        return;
      }

      if (pointer.started) {
        return;
      }

      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;

      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) {
        return;
      }

      const host = getDragHost(context.containerId);

      if (!host) {
        return;
      }

      pointer.started = true;
      node.setPointerCapture(event.pointerId);
      startDragItemDrag({
        event: event.nativeEvent,
        host,
        item: node,
      });
    };

    const clearPointer = (event: PointerEvent<HTMLDivElement>) => {
      if (pointerRef.current?.id === event.pointerId) {
        pointerRef.current = null;
      }
    };

    return (
      <SDragItem
        ref={setRefs}
        {...{ [DRAG_ITEM_ATTR]: 'true' }}
        {...props}
        className={mergeClasses(dragItemClasses.root, className)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => {
          onPointerUp?.(event);
          clearPointer(event);
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
          clearPointer(event);
        }}
      >
        {children}
      </SDragItem>
    );
  },
);

DragItem.displayName = 'DragItem';

export type { TDragItemProps } from './types';
export { dragItemClasses } from './classes';
export { DragItem };
export default DragItem;
