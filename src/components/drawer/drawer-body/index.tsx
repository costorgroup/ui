import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { drawerBodyClasses } from './classes';
import { SDrawerBody, SDrawerBodyPlain } from './styles';
import { TDrawerBodyProps } from './types';

const DrawerBody = forwardRef<HTMLDivElement, TDrawerBodyProps>(
  (
    {
      children,
      scrollable = true,
      mode = 'hover',
      color = 'primary',
      className,
      ...props
    },
    ref,
  ) => {
    if (!scrollable) {
      return (
        <SDrawerBodyPlain ref={ref} {...props}
        className={mergeClasses(
          drawerBodyClasses.root,
          className,
        )}>
          {children}
        </SDrawerBodyPlain>
      );
    }

    return (
      <SDrawerBody ref={ref} mode={mode} color={color} {...props}>
        {children}
      </SDrawerBody>
    );
  },
);

DrawerBody.displayName = 'DrawerBody';

export type { TDrawerBodyProps };
export { drawerBodyClasses } from './classes';
export { DrawerBody };
export default DrawerBody;
