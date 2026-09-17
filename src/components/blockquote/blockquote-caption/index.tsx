import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../../helpers/polymorphic';
import { blockquoteCaptionClasses } from './classes';
import { SBlockquoteCaption } from './styles';
import { TBlockquoteCaptionOwnProps, TBlockquoteCaptionProps } from './types';

const BlockquoteCaption = forwardRef(function BlockquoteCaption<
  C extends ElementType = 'p',
>(
  { as, children, size = 'sm', className, ...props }: TBlockquoteCaptionProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SBlockquoteCaption
      as={as}
      ref={ref as React.Ref<HTMLParagraphElement>}
      size={size}
      {...props}
      className={mergeClasses(blockquoteCaptionClasses.root, className)}
    >
      {children}
    </SBlockquoteCaption>
  );
}) as TPolymorphicComponent<'p', TBlockquoteCaptionOwnProps>;

BlockquoteCaption.displayName = 'BlockquoteCaption';

export type { TBlockquoteCaptionProps, TBlockquoteCaptionOwnProps };
export { blockquoteCaptionClasses } from './classes';
export { BlockquoteCaption };
export default BlockquoteCaption;
