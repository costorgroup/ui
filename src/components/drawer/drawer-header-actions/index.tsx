import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { drawerHeaderActionsClasses } from './classes';
import { SDrawerHeaderActions } from './styles';
import { TDrawerHeaderActionsProps } from './types';

const DrawerHeaderActions = forwardRef<HTMLDivElement, TDrawerHeaderActionsProps>(
  ({ children, className, ...props }, ref) => (
    <SDrawerHeaderActions
      ref={ref}
      {...props}
      className={mergeClasses(drawerHeaderActionsClasses.root, className)}
    >
      {children}
    </SDrawerHeaderActions>
  ),
);

DrawerHeaderActions.displayName = 'DrawerHeaderActions';

export type { TDrawerHeaderActionsProps };
export { drawerHeaderActionsClasses } from './classes';
export { DrawerHeaderActions };
export default DrawerHeaderActions;
