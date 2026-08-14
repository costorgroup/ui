import React, { forwardRef } from 'react';
import { Heading } from '../heading';
import { Text } from '../text';
import type { TTextSize } from '../text/types';
import { SList, SListHeader, SListItems } from './styles';
import { TListProps, TListSize } from './types';

const descriptionSize: Record<TListSize, TTextSize> = {
  xs: 'xs',
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
  xl: 'md',
};

const List = forwardRef<HTMLDivElement, TListProps>(
  (
    {
      children,
      title,
      description,
      titleAs = 'h5',
      listStyle = 'unordered',
      size = 'md',
      color = 'primary',
      ...props
    },
    ref,
  ) => {
    const as = listStyle === 'ordered' ? 'ol' : 'ul';
    const hasTitle = title != null && title !== '';
    const hasDescription = description != null && description !== '';
    const hasHeader = hasTitle || hasDescription;

    return (
      <SList ref={ref} size={size} color={color} {...props}>
        {hasHeader ? (
          <SListHeader>
            {hasTitle ? (
              <Heading as={titleAs} color={color}>
                {title}
              </Heading>
            ) : null}
            {hasDescription ? (
              <Text as="p" size={descriptionSize[size]} color="default">
                {description}
              </Text>
            ) : null}
          </SListHeader>
        ) : null}
        <SListItems as={as} listStyle={listStyle} size={size} color={color}>
          {children}
        </SListItems>
      </SList>
    );
  },
);

List.displayName = 'List';

export type { TListProps, TListStyle, TListSize } from './types';
export { List };
export default List;
