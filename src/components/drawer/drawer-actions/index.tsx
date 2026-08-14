import React, { forwardRef } from 'react';
import { SDrawerActions } from './styles';
import { TDrawerActionsProps } from './types';

const DrawerActions = forwardRef<HTMLDivElement, TDrawerActionsProps>(
  ({ children, ...props }, ref) => {
    return (
      <SDrawerActions ref={ref} {...props}>
        {children}
      </SDrawerActions>
    );
  },
);

DrawerActions.displayName = 'DrawerActions';

export type { TDrawerActionsProps };
export { DrawerActions };
export default DrawerActions;
