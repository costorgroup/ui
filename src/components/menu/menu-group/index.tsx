import React, { forwardRef } from 'react';
import { SMenuGroup } from './styles';
import { TMenuGroupProps } from './types';

const MenuGroup = forwardRef<HTMLDivElement, TMenuGroupProps>(
  ({ children, ...props }, ref) => {
    return (
      <SMenuGroup ref={ref} role="group" {...props}>
        {children}
      </SMenuGroup>
    );
  },
);

MenuGroup.displayName = 'MenuGroup';

export type { TMenuGroupProps };
export { MenuGroup };
export default MenuGroup;
