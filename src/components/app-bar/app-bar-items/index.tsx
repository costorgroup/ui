import React, { forwardRef } from 'react';
import { SAppBarItems } from './styles';
import { TAppBarItemsProps } from './types';

const AppBarItems = forwardRef<HTMLDivElement, TAppBarItemsProps>(
  ({ children, ...props }, ref) => {
    return (
      <SAppBarItems ref={ref} data-app-bar-items="" {...props}>
        {children}
      </SAppBarItems>
    );
  },
);

AppBarItems.displayName = 'AppBarItems';

export type { TAppBarItemsProps };
export { AppBarItems };
export default AppBarItems;
