import React, { forwardRef } from 'react';
import { STabLabel } from './styles';
import { TTabLabelProps } from './types';

const TabLabel = forwardRef<HTMLSpanElement, TTabLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <STabLabel ref={ref} {...props}>
        {children}
      </STabLabel>
    );
  },
);

TabLabel.displayName = 'TabLabel';

export type { TTabLabelProps };
export { TabLabel };
export default TabLabel;
