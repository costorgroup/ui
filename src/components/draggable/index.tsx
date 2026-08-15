import React, { forwardRef, PointerEvent, useContext, useRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { DraggablesContext } from '../draggables/draggables-context';
import { DRAGGABLE_ITEM_ATTR } from '../draggables/context';
import {
  getDraggablesHost,
  startDraggableDrag,
} from '../draggables/session';
import { draggableClasses } from './classes';
import { SDraggable } from './styles';
import { TDraggableProps } from './types';

const DRAG_THRESHOLD = 4;

const matchesSelector = (target: EventTarget | null, selector?: string) => {
  if (!selector || !(target instanceof Element)) {
    return false;
  }

  return Boolean(target.closest(selector));
};

const Draggable = forwardRef<HTMLDivElement, TDraggableProps>(
  ({ children, className, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, ...props }, ref) => {
    const context = useContext(DraggablesContext);
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

      const host = getDraggablesHost(context.containerId);

      if (!host) {
        return;
      }

      pointer.started = true;
      node.setPointerCapture(event.pointerId);
      startDraggableDrag({
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
      <SDraggable
        ref={setRefs}
        {...{ [DRAGGABLE_ITEM_ATTR]: 'true' }}
        {...props}
        className={mergeClasses(draggableClasses.root, className)}
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
      </SDraggable>
    );
  },
);

Draggable.displayName = 'Draggable';

export type { TDraggableProps } from './types';
export { draggableClasses } from './classes';
export { Draggable };
export default Draggable;
