import React, { forwardRef } from 'react';
import { SDrawerHead } from './styles';
import { TDrawerHeadProps } from './types';

const DrawerHead = forwardRef<HTMLDivElement, TDrawerHeadProps>(
  ({ children, ...props }, ref) => {
    return (
      <SDrawerHead ref={ref} {...props}>
        {children}
      </SDrawerHead>
    );
  },
);

DrawerHead.displayName = 'DrawerHead';

export type { TDrawerHeadProps };
export { DrawerHead };
export default DrawerHead;
