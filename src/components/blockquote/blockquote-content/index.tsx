import React, { forwardRef } from 'react';
import { SBlockquoteContent } from './styles';
import { TBlockquoteContentProps } from './types';

const BlockquoteContent = forwardRef<
  HTMLParagraphElement,
  TBlockquoteContentProps
>(({ children, color = 'default', size = 'md', ...props }, ref) => {
  return (
    <SBlockquoteContent ref={ref} color={color} size={size} {...props}>
      {children}
    </SBlockquoteContent>
  );
});

BlockquoteContent.displayName = 'BlockquoteContent';

export type { TBlockquoteContentProps };
export { BlockquoteContent };
export default BlockquoteContent;
