import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { blockquoteClasses } from './classes';
import { BlockquoteBase } from './blockquote-base';
import { BlockquoteContent } from './blockquote-content';
import { BlockquoteCaption } from './blockquote-caption';
import { TBlockquoteProps } from './types';

const Blockquote = forwardRef<HTMLQuoteElement, TBlockquoteProps>(
  ({ children, caption, color = 'primary', className, ...props }, ref) => {
    return (
      <BlockquoteBase ref={ref} color={color} {...props}
        className={mergeClasses(
          blockquoteClasses.root,
          className,
        )}>
        {children != null ? (
          <BlockquoteContent color="default" size="md">
            {children}
          </BlockquoteContent>
        ) : null}
        {caption != null ? (
          <BlockquoteCaption color="default" size="sm">
            {caption}
          </BlockquoteCaption>
        ) : null}
      </BlockquoteBase>
    );
  },
);

Blockquote.displayName = 'Blockquote';

export type { TBlockquoteProps } from './types';
export { blockquoteClasses } from './classes';
export { Blockquote };
export default Blockquote;
