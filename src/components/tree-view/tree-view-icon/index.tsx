import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { treeViewIconClasses } from './classes';
import { STreeViewIcon } from './styles';
import { TTreeViewIconProps } from './types';

const TreeViewIcon = forwardRef<HTMLSpanElement, TTreeViewIconProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <STreeViewIcon
        ref={ref}
        aria-hidden
        {...props}
        className={mergeClasses(treeViewIconClasses.root, className)}
      >
        {children}
      </STreeViewIcon>
    );
  },
);

TreeViewIcon.displayName = 'TreeViewIcon';

export type { TTreeViewIconProps };
export { treeViewIconClasses } from './classes';
export { TreeViewIcon };
export default TreeViewIcon;
