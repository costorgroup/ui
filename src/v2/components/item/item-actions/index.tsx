import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { itemActionsClasses } from './classes';
import { SItemActions } from './styles';
import { TItemActionsProps } from './types';

const ItemActions = forwardRef<HTMLDivElement, TItemActionsProps>(
  ({ children, className, ...props }, ref) => (
    <SItemActions
      ref={ref}
      {...props}
      className={mergeClasses(itemActionsClasses.root, className)}
    >
      {children}
    </SItemActions>
  ),
);

ItemActions.displayName = 'ItemActions';

export type { TItemActionsProps } from './types';
export { itemActionsClasses } from './classes';
export { ItemActions };
export default ItemActions;
