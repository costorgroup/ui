import React, { Children, forwardRef, isValidElement, ReactNode } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { drawerHeaderClasses } from './classes';
import { SDrawerHeader, SDrawerHeaderMain } from './styles';
import { TDrawerHeaderProps } from './types';

const isHeaderActions = (child: ReactNode) =>
  isValidElement(child) &&
  typeof child.type !== 'string' &&
  (child.type as { displayName?: string }).displayName === 'DrawerHeaderActions';

const DrawerHeader = forwardRef<HTMLDivElement, TDrawerHeaderProps>(
  ({ children, className, ...props }, ref) => {
    const nodes = Children.toArray(children);
    const actions = nodes.filter(isHeaderActions);
    const rest = nodes.filter((child) => !isHeaderActions(child));

    return (
      <SDrawerHeader
        ref={ref}
        {...props}
        className={mergeClasses(drawerHeaderClasses.root, className)}
      >
        {rest.length > 0 ? (
          <SDrawerHeaderMain className={drawerHeaderClasses.main}>
            {rest}
          </SDrawerHeaderMain>
        ) : null}
        {actions}
      </SDrawerHeader>
    );
  },
);

DrawerHeader.displayName = 'DrawerHeader';

export type { TDrawerHeaderProps };
export { drawerHeaderClasses } from './classes';
export { DrawerHeader };
export default DrawerHeader;
