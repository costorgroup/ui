import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { tabIconClasses } from './classes';
import { STabIcon } from './styles';
import { TTabIconProps } from './types';

const TabIcon = forwardRef<HTMLSpanElement, TTabIconProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <STabIcon ref={ref} {...props}
        className={mergeClasses(
          tabIconClasses.root,
          className,
        )}>
        {children}
      </STabIcon>
    );
  },
);

TabIcon.displayName = 'TabIcon';

export type { TTabIconProps };
export { tabIconClasses } from './classes';
export { TabIcon };
export default TabIcon;
