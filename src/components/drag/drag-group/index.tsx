import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { DRAG_GROUP_ATTR, DragGroupContext } from '../context';
import { registerDragHost } from '../session';
import { dragGroupClasses } from './classes';
import { SDragGroup } from './styles';
import { TDragGroupProps } from '../types';

const DragGroup = forwardRef<HTMLDivElement, TDragGroupProps>(
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
      color = 'primary',
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
    const idRef = useRef(`drag-group-${Math.random().toString(36).slice(2)}`);

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

      return registerDragHost({
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
      <DragGroupContext.Provider
        value={{
          containerId: idRef.current,
          orientation,
          behaviour,
          dragHandleSelector,
          nonDragAreaSelector,
        }}
      >
        <SDragGroup
          ref={setRefs}
          orientation={orientation}
          color={color}
          {...{ [DRAG_GROUP_ATTR]: 'true' }}
          {...props}
          className={mergeClasses(dragGroupClasses.root, className)}
        >
          {children}
        </SDragGroup>
      </DragGroupContext.Provider>
    );
  },
);

DragGroup.displayName = 'DragGroup';

export type {
  TDragGroupProps,
  TDragOrientation,
  TDragBehaviour,
  TDragLockAxis,
  TDropResult,
} from '../types';
export { applyDrag } from '../apply-drag';
export { dragGroupClasses } from './classes';
export { DragGroupContext } from '../context';
export { DragGroup };
export default DragGroup;
