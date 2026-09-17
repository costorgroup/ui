import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { itemClasses } from './classes';
import { SItem } from './styles';
import { TItemProps } from './types';

const Item = forwardRef<HTMLDivElement, TItemProps>(
  (
    {
      children,
      radius = 'md',
      appearance = 'opaque',
      size = 'md',
      direction = 'horizontal',
      className,
      ...props
    },
    ref,
  ) => (
    <SItem
      ref={ref}
      radius={radius}
      appearance={appearance}
      size={size}
      direction={direction}
      {...props}
      className={mergeClasses(
        itemClasses.root,
        appearance === 'opaque'
          ? itemClasses.opaque
          : itemClasses.transparent,
        itemClasses[size],
        direction === 'vertical'
          ? itemClasses.vertical
          : itemClasses.horizontal,
        className,
      )}
    >
      {children}
    </SItem>
  ),
);

Item.displayName = 'Item';

export type {
  TItemProps,
  TItemAppearance,
  TItemRadius,
  TItemSize,
  TItemDirection,
} from './types';
export type { TItemIconProps } from './item-icon';
export type { TItemContentProps } from './item-content';
export type { TItemTitleProps } from './item-title';
export type { TItemDescriptionProps } from './item-description';
export type { TItemActionsProps } from './item-actions';
export { itemClasses } from './classes';
export { ItemIcon, itemIconClasses } from './item-icon';
export { ItemContent, itemContentClasses } from './item-content';
export { ItemTitle, itemTitleClasses } from './item-title';
export { ItemDescription, itemDescriptionClasses } from './item-description';
export { ItemActions, itemActionsClasses } from './item-actions';
export { Item };
export default Item;
