import React, { forwardRef } from 'react';
import { SMenuBase } from './styles';
import { TMenuBaseProps } from './types';

const MenuBase = forwardRef<HTMLDivElement, TMenuBaseProps>(
  ({ children, top, left, visible, role = 'menu', ...props }, ref) => {
    return (
      <SMenuBase
        ref={ref}
        top={top}
        left={left}
        visible={visible}
        role={role}
        {...props}
      >
        {children}
      </SMenuBase>
    );
  },
);

MenuBase.displayName = 'MenuBase';

export type { TMenuBaseProps };
export { MenuBase };
export default MenuBase;
