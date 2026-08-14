import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { blockquoteCaptionClasses } from './classes';
import { SBlockquoteCaption } from './styles';
import { TBlockquoteCaptionProps } from './types';

const BlockquoteCaption = forwardRef<
  HTMLParagraphElement,
  TBlockquoteCaptionProps
>(({ children, color = 'default', size = 'sm', className, ...props }, ref) => {
  return (
    <SBlockquoteCaption ref={ref} color={color} size={size} {...props}
        className={mergeClasses(
          blockquoteCaptionClasses.root,
          className,
        )}>
      {children}
    </SBlockquoteCaption>
  );
});

BlockquoteCaption.displayName = 'BlockquoteCaption';

export type { TBlockquoteCaptionProps };
export { blockquoteCaptionClasses } from './classes';
export { BlockquoteCaption };
export default BlockquoteCaption;
