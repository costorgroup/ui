import React, { forwardRef } from 'react';
import { SDrawerBody, SDrawerBodyPlain } from './styles';
import { TDrawerBodyProps } from './types';

const DrawerBody = forwardRef<HTMLDivElement, TDrawerBodyProps>(
  (
    {
      children,
      scrollable = true,
      mode = 'hover',
      color = 'primary',
      ...props
    },
    ref,
  ) => {
    if (!scrollable) {
      return (
        <SDrawerBodyPlain ref={ref} {...props}>
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
export { DrawerBody };
export default DrawerBody;
