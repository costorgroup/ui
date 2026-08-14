import React, { forwardRef } from 'react';
import { STabIcon } from './styles';
import { TTabIconProps } from './types';

const TabIcon = forwardRef<HTMLSpanElement, TTabIconProps>(
  ({ children, ...props }, ref) => {
    return (
      <STabIcon ref={ref} {...props}>
        {children}
      </STabIcon>
    );
  },
);

TabIcon.displayName = 'TabIcon';

export type { TTabIconProps };
export { TabIcon };
export default TabIcon;
