import React, { forwardRef } from 'react';
import { SAppBarLogo } from './styles';
import { TAppBarLogoProps } from './types';

const AppBarLogo = forwardRef<HTMLDivElement, TAppBarLogoProps>(
  ({ children, ...props }, ref) => {
    return (
      <SAppBarLogo ref={ref} data-app-bar-logo="" {...props}>
        {children}
      </SAppBarLogo>
    );
  },
);

AppBarLogo.displayName = 'AppBarLogo';

export type { TAppBarLogoProps };
export { AppBarLogo };
export default AppBarLogo;
