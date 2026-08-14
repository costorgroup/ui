import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { tabLabelClasses } from './classes';
import { STabLabel } from './styles';
import { TTabLabelProps } from './types';

const TabLabel = forwardRef<HTMLSpanElement, TTabLabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <STabLabel ref={ref} {...props}
        className={mergeClasses(
          tabLabelClasses.root,
          className,
        )}>
        {children}
      </STabLabel>
    );
  },
);

TabLabel.displayName = 'TabLabel';

export type { TTabLabelProps };
export { tabLabelClasses } from './classes';
export { TabLabel };
export default TabLabel;
