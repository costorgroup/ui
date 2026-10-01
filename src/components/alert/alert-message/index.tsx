import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { alertMessageClasses } from './classes';
import { SAlertMessage } from './styles';
import { TAlertMessageProps } from './types';

const AlertMessage = forwardRef<HTMLDivElement, TAlertMessageProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SAlertMessage
        ref={ref}
        {...props}
        className={mergeClasses(alertMessageClasses.root, className)}
      >
        {children}
      </SAlertMessage>
    );
  },
);

AlertMessage.displayName = 'AlertMessage';

export type { TAlertMessageProps };
export { alertMessageClasses } from './classes';
export { AlertMessage };
export default AlertMessage;
