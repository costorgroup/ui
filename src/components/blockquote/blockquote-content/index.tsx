import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../../helpers/polymorphic';
import { blockquoteContentClasses } from './classes';
import { SBlockquoteContent } from './styles';
import { TBlockquoteContentOwnProps, TBlockquoteContentProps } from './types';

const BlockquoteContent = forwardRef(function BlockquoteContent<
  C extends ElementType = 'p',
>(
  { as, children, size = 'md', className, ...props }: TBlockquoteContentProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SBlockquoteContent
      as={as}
      ref={ref as React.Ref<HTMLParagraphElement>}
      size={size}
      {...props}
      className={mergeClasses(blockquoteContentClasses.root, className)}
    >
      {children}
    </SBlockquoteContent>
  );
}) as TPolymorphicComponent<'p', TBlockquoteContentOwnProps>;

BlockquoteContent.displayName = 'BlockquoteContent';

export type { TBlockquoteContentProps, TBlockquoteContentOwnProps };
export { blockquoteContentClasses } from './classes';
export { BlockquoteContent };
export default BlockquoteContent;
