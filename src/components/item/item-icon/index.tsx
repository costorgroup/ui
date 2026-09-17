import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { itemIconClasses } from './classes';
import { SItemIcon } from './styles';
import { TItemIconProps } from './types';

const ItemIcon = forwardRef<HTMLDivElement, TItemIconProps>(
  ({ children, className, ...props }, ref) => (
    <SItemIcon
      ref={ref}
      {...props}
      className={mergeClasses(itemIconClasses.root, className)}
    >
      {children}
    </SItemIcon>
  ),
);

ItemIcon.displayName = 'ItemIcon';

export type { TItemIconProps } from './types';
export { itemIconClasses } from './classes';
export { ItemIcon };
export default ItemIcon;
