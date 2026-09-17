import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { TBubbleGroupProps } from '../types';
import { bubbleGroupClasses } from './classes';
import { SBubbleGroup } from './styles';

const BubbleGroup = forwardRef<HTMLDivElement, TBubbleGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SBubbleGroup
        ref={ref}
        {...props}
        className={mergeClasses(bubbleGroupClasses.root, className)}
      >
        {children}
      </SBubbleGroup>
    );
  },
);

BubbleGroup.displayName = 'BubbleGroup';

export type { TBubbleGroupProps } from '../types';
export { bubbleGroupClasses } from './classes';
export { BubbleGroup };
export default BubbleGroup;
