import React, { forwardRef } from 'react';
import { SModalActions } from './styles';
import { TModalActionsProps } from './types';

const ModalActions = forwardRef<HTMLDivElement, TModalActionsProps>(
  ({ children, ...props }, ref) => {
    return (
      <SModalActions ref={ref} {...props}>
        {children}
      </SModalActions>
    );
  },
);

ModalActions.displayName = 'ModalActions';

export type { TModalActionsProps };
export { ModalActions };
export default ModalActions;
