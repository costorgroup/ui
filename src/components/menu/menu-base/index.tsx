import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { menuBaseClasses } from './classes';
import { SMenuBase } from './styles';
import { TMenuBaseProps } from './types';

const MenuBase = forwardRef<HTMLDivElement, TMenuBaseProps>(
  ({ children, top, left, visible, role = 'menu', className, ...props }, ref) => {
    return (
      <SMenuBase
        ref={ref}
        top={top}
        left={left}
        visible={visible}
        role={role}
        {...props}
        className={mergeClasses(
          menuBaseClasses.root,
          className,
        )}
      >
        {children}
      </SMenuBase>
    );
  },
);

MenuBase.displayName = 'MenuBase';

export type { TMenuBaseProps };
export { menuBaseClasses } from './classes';
export { MenuBase };
export default MenuBase;
