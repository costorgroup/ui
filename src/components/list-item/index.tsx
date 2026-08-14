import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { listItemClasses } from './classes';
import { SListItem } from './styles';
import { TListItemProps } from './types';

const ListItem = forwardRef<HTMLLIElement, TListItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SListItem ref={ref} {...props}
        className={mergeClasses(
          listItemClasses.root,
          className,
        )}>
        {children}
      </SListItem>
    );
  },
);

ListItem.displayName = 'ListItem';

export type { TListItemProps } from './types';
export { listItemClasses } from './classes';
export { ListItem };
export default ListItem;
