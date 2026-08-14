import React, { forwardRef } from 'react';
import { SAlertContent } from './styles';
import { TAlertContentProps } from './types';

const AlertContent = forwardRef<HTMLDivElement, TAlertContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <SAlertContent ref={ref} {...props}>
        {children}
      </SAlertContent>
    );
  },
);

AlertContent.displayName = 'AlertContent';

export type { TAlertContentProps };
export { AlertContent };
export default AlertContent;
