import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { treeViewLabelClasses } from './classes';
import { STreeViewLabel } from './styles';
import { TTreeViewLabelProps } from './types';

const TreeViewLabel = forwardRef<HTMLSpanElement, TTreeViewLabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <STreeViewLabel
        ref={ref}
        {...props}
        className={mergeClasses(treeViewLabelClasses.root, className)}
      >
        {children}
      </STreeViewLabel>
    );
  },
);

TreeViewLabel.displayName = 'TreeViewLabel';

export type { TTreeViewLabelProps };
export { treeViewLabelClasses } from './classes';
export { TreeViewLabel };
export default TreeViewLabel;
