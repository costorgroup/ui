import React, { forwardRef } from 'react';
import { TabBase } from './tab-base';
import { TabIcon } from './tab-icon';
import { TabLabel } from './tab-label';
import { TTabProps } from './types';

const Tab = forwardRef<HTMLButtonElement, TTabProps>(
  ({ children, icon, ...props }, ref) => {
    return (
      <TabBase ref={ref} {...props}>
        {icon != null ? <TabIcon>{icon}</TabIcon> : null}
        {children != null ? <TabLabel>{children}</TabLabel> : null}
      </TabBase>
    );
  },
);

Tab.displayName = 'Tab';

export type { TTabProps } from './types';
export { Tab };
export default Tab;
