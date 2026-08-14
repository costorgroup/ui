import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { blockquoteContentClasses } from './classes';
import { SBlockquoteContent } from './styles';
import { TBlockquoteContentProps } from './types';

const BlockquoteContent = forwardRef<
  HTMLParagraphElement,
  TBlockquoteContentProps
>(({ children, color = 'default', size = 'md', className, ...props }, ref) => {
  return (
    <SBlockquoteContent ref={ref} color={color} size={size} {...props}
        className={mergeClasses(
          blockquoteContentClasses.root,
          className,
        )}>
      {children}
    </SBlockquoteContent>
  );
});

BlockquoteContent.displayName = 'BlockquoteContent';

export type { TBlockquoteContentProps };
export { blockquoteContentClasses } from './classes';
export { BlockquoteContent };
export default BlockquoteContent;
