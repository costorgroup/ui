import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { drawerBodyClasses } from './classes';
import { SDrawerBody, SDrawerBodyPlain } from './styles';
import { TDrawerBodyProps } from './types';

const DrawerBody = forwardRef<HTMLDivElement, TDrawerBodyProps>(
  ({ children, scrollable = true, className, ...props }, ref) => {
    const Root = scrollable ? SDrawerBody : SDrawerBodyPlain;

    return (
      <Root
        ref={ref}
        {...props}
        className={mergeClasses(drawerBodyClasses.root, className)}
      >
        {children}
      </Root>
    );
  },
);

DrawerBody.displayName = 'DrawerBody';

export type { TDrawerBodyProps };
export { drawerBodyClasses } from './classes';
export { DrawerBody };
export default DrawerBody;
