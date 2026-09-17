import React, { Children, MouseEvent, forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useBubbleContext } from '../context';
import { TBubbleReactionsProps } from '../types';
import { bubbleReactionsClasses } from './classes';
import { SBubbleReactionItem, SBubbleReactions } from './styles';

const BubbleReactions = forwardRef<HTMLDivElement, TBubbleReactionsProps>(
  (
    {
      children,
      side = 'bottom',
      align: alignProp,
      className,
      onClick,
      onReactionsClick,
      ...props
    },
    ref,
  ) => {
    const { align: bubbleAlign, onReactionsClick: contextReactionsClick } =
      useBubbleContext();
    const align = alignProp ?? bubbleAlign;
    const handleReactionsClick = onReactionsClick ?? contextReactionsClick;

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      onClick?.(event);

      if (event.defaultPrevented) {
        return;
      }

      handleReactionsClick?.(event);
    };

    return (
      <SBubbleReactions
        ref={ref}
        side={side}
        align={align}
        data-bubble-reactions=""
        data-side={side}
        data-clickable={handleReactionsClick != null ? '' : undefined}
        onClick={handleClick}
        {...props}
        className={mergeClasses(bubbleReactionsClasses.root, className)}
      >
        {Children.map(children, (child) => (
          <SBubbleReactionItem className={bubbleReactionsClasses.item}>
            {child}
          </SBubbleReactionItem>
        ))}
      </SBubbleReactions>
    );
  },
);

BubbleReactions.displayName = 'BubbleReactions';

export type { TBubbleReactionsProps } from '../types';
export { bubbleReactionsClasses } from './classes';
export { BubbleReactions };
export default BubbleReactions;
