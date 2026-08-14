import React, { forwardRef } from 'react';
import { SBlockquoteBase } from './styles';
import { TBlockquoteBaseProps } from './types';

const BlockquoteBase = forwardRef<HTMLQuoteElement, TBlockquoteBaseProps>(
  ({ children, color = 'primary', ...props }, ref) => {
    return (
      <SBlockquoteBase ref={ref} color={color} {...props}>
        {children}
      </SBlockquoteBase>
    );
  },
);

BlockquoteBase.displayName = 'BlockquoteBase';

export type { TBlockquoteBaseProps };
export { BlockquoteBase };
export default BlockquoteBase;
