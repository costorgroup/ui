import React, { forwardRef } from 'react';
import { SBlockquoteCaption } from './styles';
import { TBlockquoteCaptionProps } from './types';

const BlockquoteCaption = forwardRef<
  HTMLParagraphElement,
  TBlockquoteCaptionProps
>(({ children, color = 'default', size = 'sm', ...props }, ref) => {
  return (
    <SBlockquoteCaption ref={ref} color={color} size={size} {...props}>
      {children}
    </SBlockquoteCaption>
  );
});

BlockquoteCaption.displayName = 'BlockquoteCaption';

export type { TBlockquoteCaptionProps };
export { BlockquoteCaption };
export default BlockquoteCaption;
