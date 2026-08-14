import React, { forwardRef } from 'react';
import { SAlertIcon } from './styles';
import { TAlertIconProps } from './types';

const AlertIcon = forwardRef<HTMLSpanElement, TAlertIconProps>(
  ({ children, ...props }, ref) => {
    return (
      <SAlertIcon ref={ref} data-alert-icon="" {...props}>
        {children}
      </SAlertIcon>
    );
  },
);

AlertIcon.displayName = 'AlertIcon';

export type { TAlertIconProps };
export { AlertIcon };
export default AlertIcon;
