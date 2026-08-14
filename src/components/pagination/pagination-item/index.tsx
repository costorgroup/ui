import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { paginationItemClasses } from './classes';
import { SPaginationItem } from './styles';
import { TPaginationItemProps } from './types';

const resolveVariant = (
  selected: boolean,
  variant: TPaginationItemProps['variant'],
) => {
  if (selected) {
    if (variant === 'ghost' || variant === 'plain') {
      return 'subtle';
    }

    return variant ?? 'solid';
  }

  return 'ghost';
};

const PaginationItem = forwardRef<HTMLButtonElement, TPaginationItemProps>(
  (
    {
      children,
      type = 'page',
      page,
      selected = false,
      variant = 'solid',
      size = 'md',
      color = 'primary',
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <SPaginationItem
        ref={ref}
        type="button"
        variant={resolveVariant(selected, variant)}
        size={size}
        color={color}
        selected={selected}
        disabled={disabled}
        aria-current={selected ? 'page' : undefined}
        data-type={type}
        data-page={page ?? undefined}
        {...props}
        className={mergeClasses(
          paginationItemClasses.root,
          className,
        )}
      >
        {children}
      </SPaginationItem>
    );
  },
);

PaginationItem.displayName = 'PaginationItem';

export type { TPaginationItemProps };
export { paginationItemClasses } from './classes';
export { PaginationItem };
export default PaginationItem;
