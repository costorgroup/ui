import React, {
  forwardRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { DraggablesContext } from './draggables-context';
import { registerDraggablesHost } from './session';
import { draggablesClasses } from './classes';
import { DRAGGABLES_ATTR } from './context';
import { SDraggables } from './styles';
import { TDraggablesProps } from './types';

const Draggables = forwardRef<HTMLDivElement, TDraggablesProps>(
  (
    {
      children,
      orientation = 'vertical',
      behaviour = 'move',
      groupName,
      lockAxis,
      dragHandleSelector,
      nonDragAreaSelector,
      animationDuration = 200,
      autoScroll = true,
      getChildPayload,
      shouldAcceptDrop,
      onDragStart,
      onDragEnd,
      onDragEnter,
      onDragLeave,
      onDrop,
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const idRef = useRef(`draggables-${Math.random().toString(36).slice(2)}`);

    const setRefs = (node: HTMLDivElement | null) => {
      nodeRef.current = node;

      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const optionsRef = useRef({
      orientation,
      behaviour,
      groupName,
      lockAxis,
      animationDuration,
      autoScroll,
      getChildPayload,
      shouldAcceptDrop,
      onDragStart,
      onDragEnd,
      onDragEnter,
      onDragLeave,
      onDrop,
    });

    useLayoutEffect(() => {
      optionsRef.current = {
        orientation,
        behaviour,
        groupName,
        lockAxis,
        animationDuration,
        autoScroll,
        getChildPayload,
        shouldAcceptDrop,
        onDragStart,
        onDragEnd,
        onDragEnter,
        onDragLeave,
        onDrop,
      };
    });

    useEffect(() => {
      const node = nodeRef.current;

      if (!node) {
        return undefined;
      }

      return registerDraggablesHost({
        id: idRef.current,
        node,
        get groupName() {
          return optionsRef.current.groupName;
        },
        get orientation() {
          return optionsRef.current.orientation;
        },
        get behaviour() {
          return optionsRef.current.behaviour;
        },
        get lockAxis() {
          return optionsRef.current.lockAxis;
        },
        get animationDuration() {
          return optionsRef.current.animationDuration;
        },
        get autoScroll() {
          return optionsRef.current.autoScroll;
        },
        getChildPayload: (index) => optionsRef.current.getChildPayload?.(index),
        shouldAcceptDrop: (source, payload) =>
          optionsRef.current.shouldAcceptDrop?.(source, payload) as
            | boolean
            | undefined,
        onDragEnter: () => optionsRef.current.onDragEnter?.(),
        onDragLeave: () => optionsRef.current.onDragLeave?.(),
        onDrop: (result) => optionsRef.current.onDrop?.(result),
        onDragStart: (payload) => optionsRef.current.onDragStart?.(payload),
        onDragEnd: (payload) => optionsRef.current.onDragEnd?.(payload),
      });
    }, []);

    return (
      <DraggablesContext.Provider
        value={{
          containerId: idRef.current,
          orientation,
          behaviour,
          dragHandleSelector,
          nonDragAreaSelector,
        }}
      >
        <SDraggables
          ref={setRefs}
          orientation={orientation}
          {...{ [DRAGGABLES_ATTR]: 'true' }}
          {...props}
          className={mergeClasses(draggablesClasses.root, className)}
        >
          {children}
        </SDraggables>
      </DraggablesContext.Provider>
    );
  },
);

Draggables.displayName = 'Draggables';

export type {
  TDraggablesProps,
  TDraggablesOrientation,
  TDraggablesBehaviour,
  TDraggablesLockAxis,
  TDropResult,
} from './types';
export { applyDrag } from './apply-drag';
export { draggablesClasses } from './classes';
export { DraggablesContext } from './draggables-context';
export { Draggables };
export default Draggables;
