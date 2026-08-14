import React, { forwardRef } from 'react';
import { SAlertActions } from './styles';
import { TAlertActionsProps } from './types';

const AlertActions = forwardRef<HTMLDivElement, TAlertActionsProps>(
  ({ children, ...props }, ref) => {
    return (
      <SAlertActions ref={ref} {...props}>
        {children}
      </SAlertActions>
    );
  },
);

AlertActions.displayName = 'AlertActions';

export type { TAlertActionsProps };
export { AlertActions };
export default AlertActions;
