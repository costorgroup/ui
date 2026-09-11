import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { drawerHeadActionsClasses } from './classes';
import { SDrawerHeadActions } from './styles';
import { TDrawerHeadActionsProps } from './types';

const DrawerHeadActions = forwardRef<HTMLDivElement, TDrawerHeadActionsProps>(
  ({ children, className, ...props }, ref) => (
    <SDrawerHeadActions
      ref={ref}
      {...props}
      className={mergeClasses(drawerHeadActionsClasses.root, className)}
    >
      {children}
    </SDrawerHeadActions>
  ),
);

DrawerHeadActions.displayName = 'DrawerHeadActions';

export type { TDrawerHeadActionsProps };
export { drawerHeadActionsClasses } from './classes';
export { DrawerHeadActions };
export default DrawerHeadActions;
