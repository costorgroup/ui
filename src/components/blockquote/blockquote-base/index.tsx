import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { blockquoteBaseClasses } from './classes';
import { SBlockquoteBase } from './styles';
import { TBlockquoteBaseProps } from './types';

const BlockquoteBase = forwardRef<HTMLQuoteElement, TBlockquoteBaseProps>(
  ({ children, color = 'primary', className, ...props }, ref) => {
    return (
      <SBlockquoteBase ref={ref} color={color} {...props}
        className={mergeClasses(
          blockquoteBaseClasses.root,
          className,
        )}>
        {children}
      </SBlockquoteBase>
    );
  },
);

BlockquoteBase.displayName = 'BlockquoteBase';

export type { TBlockquoteBaseProps };
export { blockquoteBaseClasses } from './classes';
export { BlockquoteBase };
export default BlockquoteBase;
