import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { appBarLogoClasses } from './classes';
import { SAppBarLogo } from './styles';
import { TAppBarLogoProps } from './types';

const AppBarLogo = forwardRef<HTMLDivElement, TAppBarLogoProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SAppBarLogo ref={ref} data-app-bar-logo="" {...props}
        className={mergeClasses(
          appBarLogoClasses.root,
          className,
        )}>
        {children}
      </SAppBarLogo>
    );
  },
);

AppBarLogo.displayName = 'AppBarLogo';

export type { TAppBarLogoProps };
export { appBarLogoClasses } from './classes';
export { AppBarLogo };
export default AppBarLogo;
