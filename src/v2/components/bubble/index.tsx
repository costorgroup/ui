import React, {
  MouseEvent,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { bubbleClasses } from './classes';
import { BubbleContext } from './context';
import { SBubble, SBubbleRow } from './styles';
import { TBubbleProps } from './types';

const Bubble = forwardRef<HTMLDivElement, TBubbleProps>(
  (
    {
      children,
      color = 'primary',
      variant = 'solid',
      align = 'start',
      className,
      onClick,
      onReactionsClick,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [override, setOverride] = useState<boolean | null>(null);
    const actionsVisible = override ?? hovered;
    const contextValue = useMemo(
      () => ({ color, variant, align, onReactionsClick }),
      [align, color, onReactionsClick, variant],
    );

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref != null) {
          ref.current = node;
        }
      },
      [ref],
    );

    const handleClick = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        const target = event.target as Element | null;

        if (
          target?.closest('[data-bubble-action]') ||
          target?.closest('[data-bubble-reactions]')
        ) {
          return;
        }

        setOverride((current) => !(current ?? hovered));
      },
      [hovered, onClick],
    );

    return (
      <BubbleContext.Provider value={contextValue}>
        <SBubble
          ref={setRefs}
          align={align}
          variant={variant}
          data-bubble=""
          data-align={align}
          data-actions-visible={actionsVisible ? '' : undefined}
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            setOverride(null);
          }}
          {...props}
          className={mergeClasses(
            bubbleClasses.root,
            align === 'end' ? bubbleClasses.end : bubbleClasses.start,
            actionsVisible && bubbleClasses.actionsOpen,
            className,
          )}
        >
          <SBubbleRow align={align} className={bubbleClasses.row} data-bubble-row="">
            {children}
          </SBubbleRow>
        </SBubble>
      </BubbleContext.Provider>
    );
  },
);

Bubble.displayName = 'Bubble';

export type {
  TBubbleProps,
  TBubbleVariant,
  TBubbleAlign,
  TBubbleReactionSide,
} from './types';
export { bubbleClasses } from './classes';
export { BubbleContext, useBubbleContext } from './context';
export {
  BubbleContent,
  bubbleContentClasses,
  type TBubbleContentProps,
} from './bubble-content';
export {
  BubbleAction,
  bubbleActionClasses,
  type TBubbleActionProps,
} from './bubble-action';
export {
  BubbleGroup,
  bubbleGroupClasses,
  type TBubbleGroupProps,
} from './bubble-group';
export {
  BubbleReactions,
  bubbleReactionsClasses,
  type TBubbleReactionsProps,
} from './bubble-reactions';
export { Bubble };
export default Bubble;
