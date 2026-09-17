import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { navigationClasses } from './classes';
import { SNavigation } from './styles';
import { TNavigationProps } from './types';

const Navigation = forwardRef<HTMLElement, TNavigationProps>(
  ({ children, size = 'md', position = 'static', className, ...props }, ref) => {
    return (
      <SNavigation
        ref={ref}
        size={size}
        position={position}
        data-slot="navigation"
        {...props}
        className={mergeClasses(navigationClasses.root, className)}
      >
        {children}
      </SNavigation>
    );
  },
);

Navigation.displayName = 'Navigation';

export type { TNavigationProps, TNavigationSize, TNavigationPosition } from './types';
export { navigationClasses } from './classes';
export { NavigationLogo, navigationLogoClasses } from './navigation-logo';
export type { TNavigationLogoProps } from './navigation-logo';
export { NavigationItems, navigationItemsClasses } from './navigation-items';
export type { TNavigationItemsProps } from './navigation-items';
export { NavigationItem, navigationItemClasses } from './navigation-item';
export type { TNavigationItemProps, TNavigationItemOwnProps } from './navigation-item';
export { Navigation };
export default Navigation;
