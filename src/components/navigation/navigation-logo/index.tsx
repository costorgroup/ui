import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { navigationLogoClasses } from './classes';
import { SNavigationLogo } from './styles';
import { TNavigationLogoProps } from './types';

const NavigationLogo = forwardRef<HTMLDivElement, TNavigationLogoProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SNavigationLogo
        ref={ref}
        data-slot="navigation-logo"
        {...props}
        className={mergeClasses(navigationLogoClasses.root, className)}
      >
        {children}
      </SNavigationLogo>
    );
  },
);

NavigationLogo.displayName = 'NavigationLogo';

export type { TNavigationLogoProps } from './types';
export { navigationLogoClasses } from './classes';
export { NavigationLogo };
export default NavigationLogo;
