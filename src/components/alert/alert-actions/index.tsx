import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { alertActionsClasses } from './classes';
import { SAlertActions } from './styles';
import { TAlertActionsProps } from './types';

const AlertActions = forwardRef<HTMLDivElement, TAlertActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SAlertActions ref={ref} {...props}
        className={mergeClasses(
          alertActionsClasses.root,
          className,
        )}>
        {children}
      </SAlertActions>
    );
  },
);

AlertActions.displayName = 'AlertActions';

export type { TAlertActionsProps };
export { alertActionsClasses } from './classes';
export { AlertActions };
export default AlertActions;
