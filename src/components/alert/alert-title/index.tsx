import React, { forwardRef } from 'react';
import { SAlertTitle } from './styles';
import { TAlertTitleProps } from './types';

const AlertTitle = forwardRef<HTMLDivElement, TAlertTitleProps>(
  ({ children, ...props }, ref) => {
    return (
      <SAlertTitle ref={ref} {...props}>
        {children}
      </SAlertTitle>
    );
  },
);

AlertTitle.displayName = 'AlertTitle';

export type { TAlertTitleProps };
export { AlertTitle };
export default AlertTitle;
