import React, { forwardRef } from 'react';
import QuoteIcon from '../../../../icons/quote-icon';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { useBlockquoteContext } from '../context';
import { blockquoteIconClasses } from './classes';
import { SBlockquoteIcon } from './styles';
import { TBlockquoteIconProps } from './types';

const BlockquoteIcon = forwardRef<HTMLSpanElement, TBlockquoteIconProps>(
  ({ children, color, className, ...props }, ref) => {
    const { color: contextColor } = useBlockquoteContext();

    return (
      <SBlockquoteIcon
        ref={ref}
        data-blockquote-icon=""
        {...props}
        color={color ?? contextColor}
        className={mergeClasses(blockquoteIconClasses.root, className)}
      >
        {children ?? <QuoteIcon aria-hidden />}
      </SBlockquoteIcon>
    );
  },
);

BlockquoteIcon.displayName = 'BlockquoteIcon';

export type { TBlockquoteIconProps };
export { blockquoteIconClasses } from './classes';
export { BlockquoteIcon };
export default BlockquoteIcon;
