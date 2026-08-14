import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { drawerActionsClasses } from './classes';
import { SDrawerActions } from './styles';
import { TDrawerActionsProps } from './types';

const DrawerActions = forwardRef<HTMLDivElement, TDrawerActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SDrawerActions ref={ref} {...props}
        className={mergeClasses(
          drawerActionsClasses.root,
          className,
        )}>
        {children}
      </SDrawerActions>
    );
  },
);

DrawerActions.displayName = 'DrawerActions';

export type { TDrawerActionsProps };
export { drawerActionsClasses } from './classes';
export { DrawerActions };
export default DrawerActions;
