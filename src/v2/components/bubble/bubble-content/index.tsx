import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../../../helpers/polymorphic';
import { useBubbleContext } from '../context';
import { TBubbleContentOwnProps, TBubbleContentProps } from '../types';
import { bubbleContentClasses } from './classes';
import { SBubbleContent } from './styles';

const BubbleContent = forwardRef(function BubbleContent<
  C extends ElementType = 'div',
>(
  { as, children, className, ...props }: TBubbleContentProps<C>,
  ref: React.Ref<Element>,
) {
  const { color, variant } = useBubbleContext();

  return (
    <SBubbleContent
      as={as}
      ref={ref as React.Ref<HTMLDivElement>}
      color={color}
      variant={variant}
      data-bubble-content=""
      {...props}
      className={mergeClasses(bubbleContentClasses.root, className)}
    >
      {children}
    </SBubbleContent>
  );
}) as TPolymorphicComponent<'div', TBubbleContentOwnProps>;

BubbleContent.displayName = 'BubbleContent';

export type { TBubbleContentProps, TBubbleContentOwnProps } from '../types';
export { bubbleContentClasses } from './classes';
export { BubbleContent };
export default BubbleContent;
