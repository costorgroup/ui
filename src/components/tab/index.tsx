import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { tabClasses } from './classes';
import { TabBase } from './tab-base';
import { TabIcon } from './tab-icon';
import { TabLabel } from './tab-label';
import { TTabProps } from './types';

const Tab = forwardRef<HTMLButtonElement, TTabProps>(
  ({ children, icon, className, ...props }, ref) => {
    return (
      <TabBase ref={ref} {...props}
        className={mergeClasses(
          tabClasses.root,
          className,
        )}>
        {icon != null ? <TabIcon>{icon}</TabIcon> : null}
        {children != null ? <TabLabel>{children}</TabLabel> : null}
      </TabBase>
    );
  },
);

Tab.displayName = 'Tab';

export type { TTabProps } from './types';
export { tabClasses } from './classes';
export { Tab };
export default Tab;
