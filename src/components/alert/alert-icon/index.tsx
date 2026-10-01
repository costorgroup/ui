import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { alertIconClasses } from './classes';
import { SAlertIcon } from './styles';
import { TAlertIconProps } from './types';

const AlertIcon = forwardRef<HTMLSpanElement, TAlertIconProps>(
  ({ children, align = 'start', className, ...props }, ref) => {
    return (
      <SAlertIcon
        ref={ref}
        data-alert-icon=""
        data-align={align}
        align={align}
        {...props}
        className={mergeClasses(
          alertIconClasses.root,
          className,
        )}
      >
        {children}
      </SAlertIcon>
    );
  },
);

AlertIcon.displayName = 'AlertIcon';

export type { TAlertIconProps };
export { alertIconClasses } from './classes';
export { AlertIcon };
export default AlertIcon;
