import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { PAGINATION_DEFAULT_VARIANTS } from '../types';
import { paginationItemClasses } from './classes';
import { resolvePaginationItemAppearance } from './resolve-appearance';
import { SPaginationItem } from './styles';
import { TPaginationItemProps } from './types';

const PaginationItem = forwardRef<HTMLButtonElement, TPaginationItemProps>(
  (
    {
      children,
      type = 'page',
      page,
      selected = false,
      variant = PAGINATION_DEFAULT_VARIANTS,
      size = 'md',
      color = 'default',
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const appearance = resolvePaginationItemAppearance(selected, variant, color);

    return (
      <SPaginationItem
        ref={ref}
        type="button"
        variant={appearance.variant}
        size={size}
        color={appearance.color}
        disabled={disabled}
        aria-current={selected ? 'page' : undefined}
        data-type={type}
        data-page={page ?? undefined}
        {...props}
        className={mergeClasses(
          paginationItemClasses.root,
          selected && paginationItemClasses.selected,
          disabled && paginationItemClasses.disabled,
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
