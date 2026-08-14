import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { appBarItemsClasses } from './classes';
import { SAppBarItems } from './styles';
import { TAppBarItemsProps } from './types';

const AppBarItems = forwardRef<HTMLDivElement, TAppBarItemsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SAppBarItems ref={ref} data-app-bar-items="" {...props}
        className={mergeClasses(
          appBarItemsClasses.root,
          className,
        )}>
        {children}
      </SAppBarItems>
    );
  },
);

AppBarItems.displayName = 'AppBarItems';

export type { TAppBarItemsProps };
export { appBarItemsClasses } from './classes';
export { AppBarItems };
export default AppBarItems;
