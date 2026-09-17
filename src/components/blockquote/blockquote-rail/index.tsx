import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useBlockquoteContext } from '../context';
import { blockquoteRailClasses } from './classes';
import { SBlockquoteRail } from './styles';
import { TBlockquoteRailProps } from './types';

const BlockquoteRail = forwardRef<HTMLDivElement, TBlockquoteRailProps>(
  ({ className, thickness = 4, ...props }, ref) => {
    const { color, variant } = useBlockquoteContext();

    return (
      <SBlockquoteRail
        ref={ref}
        aria-hidden
        data-blockquote-rail=""
        {...props}
        color={color}
        variant={variant}
        thickness={thickness}
        className={mergeClasses(blockquoteRailClasses.root, className)}
      />
    );
  },
);

BlockquoteRail.displayName = 'BlockquoteRail';

export type { TBlockquoteRailProps };
export { blockquoteRailClasses } from './classes';
export { BlockquoteRail };
export default BlockquoteRail;
