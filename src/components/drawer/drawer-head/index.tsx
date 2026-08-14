import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { drawerHeadClasses } from './classes';
import { SDrawerHead } from './styles';
import { TDrawerHeadProps } from './types';

const DrawerHead = forwardRef<HTMLDivElement, TDrawerHeadProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SDrawerHead ref={ref} {...props}
        className={mergeClasses(
          drawerHeadClasses.root,
          className,
        )}>
        {children}
      </SDrawerHead>
    );
  },
);

DrawerHead.displayName = 'DrawerHead';

export type { TDrawerHeadProps };
export { drawerHeadClasses } from './classes';
export { DrawerHead };
export default DrawerHead;
