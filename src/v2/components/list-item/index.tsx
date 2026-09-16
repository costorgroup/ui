import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { TPaletteColor } from '../../../theme/types';
import { useListContext } from '../list/context';
import { TListSize } from '../list/types';
import { TListVariant } from '../list/variant-styles';
import { listItemClasses } from './classes';
import { SListItem } from './styles';
import { TListItemProps } from './types';

const ListItem = forwardRef<HTMLDivElement, TListItemProps>(
  ({ children, className, ...props }, ref) => {
    const list = useListContext();
    const color: TPaletteColor = list?.color ?? 'default';
    const variant: TListVariant = list?.variant ?? 'subtle';
    const size: TListSize = list?.size ?? 'md';

    return (
      <SListItem
        ref={ref}
        color={color}
        variant={variant}
        size={size}
        {...props}
        className={mergeClasses(listItemClasses.root, className)}
      >
        {children}
      </SListItem>
    );
  },
);

ListItem.displayName = 'ListItem';

export type { TListItemProps };
export { listItemClasses };
export { ListItem };
export default ListItem;
