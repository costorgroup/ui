import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { blockquoteClasses } from './classes';
import { BlockquoteBase } from './blockquote-base';
import { TBlockquoteProps } from './types';

const Blockquote = forwardRef<HTMLQuoteElement, TBlockquoteProps>(
  ({ className, ...props }, ref) => {
    return (
      <BlockquoteBase
        ref={ref}
        {...props}
        className={mergeClasses(blockquoteClasses.root, className)}
      />
    );
  },
);

Blockquote.displayName = 'Blockquote';

export type { TBlockquoteProps, TBlockquoteVariant } from './types';
export { blockquoteClasses } from './classes';
export { BlockquoteBase, blockquoteBaseClasses } from './blockquote-base';
export type { TBlockquoteBaseProps } from './blockquote-base';
export { BlockquoteContent, blockquoteContentClasses } from './blockquote-content';
export type {
  TBlockquoteContentProps,
  TBlockquoteContentOwnProps,
} from './blockquote-content';
export { BlockquoteCaption, blockquoteCaptionClasses } from './blockquote-caption';
export type {
  TBlockquoteCaptionProps,
  TBlockquoteCaptionOwnProps,
} from './blockquote-caption';
export { BlockquoteIcon, blockquoteIconClasses } from './blockquote-icon';
export type { TBlockquoteIconProps } from './blockquote-icon';
export { BlockquoteRail, blockquoteRailClasses } from './blockquote-rail';
export type { TBlockquoteRailProps } from './blockquote-rail';
export { Blockquote };
export default Blockquote;
