import React, { forwardRef } from 'react';
import { SListItem } from './styles';
import { TListItemProps } from './types';

const ListItem = forwardRef<HTMLLIElement, TListItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <SListItem ref={ref} {...props}>
        {children}
      </SListItem>
    );
  },
);

ListItem.displayName = 'ListItem';

export type { TListItemProps } from './types';
export { ListItem };
export default ListItem;
