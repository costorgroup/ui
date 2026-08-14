import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { menuGroupClasses } from './classes';
import { SMenuGroup } from './styles';
import { TMenuGroupProps } from './types';

const MenuGroup = forwardRef<HTMLDivElement, TMenuGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SMenuGroup ref={ref} role="group" {...props}
        className={mergeClasses(
          menuGroupClasses.root,
          className,
        )}>
        {children}
      </SMenuGroup>
    );
  },
);

MenuGroup.displayName = 'MenuGroup';

export type { TMenuGroupProps };
export { menuGroupClasses } from './classes';
export { MenuGroup };
export default MenuGroup;
