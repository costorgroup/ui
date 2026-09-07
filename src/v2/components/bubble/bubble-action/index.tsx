import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { useBubbleContext } from '../context';
import { TBubbleActionProps } from '../types';
import { bubbleActionClasses } from './classes';
import { SBubbleAction } from './styles';

const BubbleAction = forwardRef<HTMLDivElement, TBubbleActionProps>(
  ({ children, className, ...props }, ref) => {
    const { align } = useBubbleContext();

    return (
      <SBubbleAction
        ref={ref}
        align={align}
        data-bubble-action=""
        {...props}
        className={mergeClasses(bubbleActionClasses.root, className)}
      >
        {children}
      </SBubbleAction>
    );
  },
);

BubbleAction.displayName = 'BubbleAction';

export type { TBubbleActionProps } from '../types';
export { bubbleActionClasses } from './classes';
export { BubbleAction };
export default BubbleAction;
