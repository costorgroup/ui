import React, { forwardRef, MouseEvent, useState } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { ArrowRightIcon } from '../../../icons';
import { paginationClasses } from './classes';
import {
  defaultGetItemAriaLabel,
  getPaginationItems,
} from './get-items';
import { PaginationBase } from './pagination-base';
import { PaginationEllipsis } from './pagination-ellipsis';
import { PaginationItem } from './pagination-item';
import { PaginationList } from './pagination-list';
import { TPaginationItemType, TPaginationProps, PAGINATION_DEFAULT_VARIANTS } from './types';

const FlipIcon = () => (
  <span
    aria-hidden
    style={{ display: 'inline-flex', transform: 'scaleX(-1)' }}
  >
    <ArrowRightIcon width="1em" height="1em" />
  </span>
);

const renderItemContent = (type: TPaginationItemType, page: number | null) => {
  switch (type) {
    case 'first':
      return (
        <>
          <FlipIcon />
          <FlipIcon />
        </>
      );
    case 'previous':
      return <FlipIcon />;
    case 'next':
      return <ArrowRightIcon width="1em" height="1em" />;
    case 'last':
      return (
        <>
          <ArrowRightIcon width="1em" height="1em" />
          <ArrowRightIcon width="1em" height="1em" />
        </>
      );
    case 'page':
    default:
      return page;
  }
};

const Pagination = forwardRef<HTMLElement, TPaginationProps>(
  (
    {
      count,
      page: pageProp,
      defaultPage = 1,
      onChange,
      color = 'default',
      variant = PAGINATION_DEFAULT_VARIANTS,
      size = 'md',
      disabled = false,
      hidePrevButton = false,
      hideNextButton = false,
      showFirstButton = false,
      showLastButton = false,
      siblingCount = 1,
      boundaryCount = 1,
      getItemAriaLabel = defaultGetItemAriaLabel,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = pageProp !== undefined;
    const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage);
    const page = isControlled ? Number(pageProp) : uncontrolledPage;

    const items = getPaginationItems({
      count,
      page,
      disabled,
      hidePrevButton,
      hideNextButton,
      showFirstButton,
      showLastButton,
      siblingCount,
      boundaryCount,
    });

    const handleClick =
      (nextPage: number | null) => (event: MouseEvent<HTMLButtonElement>) => {
        if (nextPage === null || nextPage === page) {
          return;
        }

        if (!isControlled) {
          setUncontrolledPage(nextPage);
        }

        onChange?.(event, nextPage);
      };

    return (
      <PaginationBase
        ref={ref}
        {...props}
        className={mergeClasses(
          paginationClasses.root,
          disabled && paginationClasses.disabled,
          className,
        )}
      >
        <PaginationList>
          {items.map((item, index) => {
            const key = `${item.type}-${item.page ?? index}`;

            if (
              item.type === 'start-ellipsis' ||
              item.type === 'end-ellipsis'
            ) {
              return (
                <li key={key}>
                  <PaginationEllipsis size={size} />
                </li>
              );
            }

            return (
              <li key={key}>
                <PaginationItem
                  type={item.type}
                  page={item.page}
                  selected={item.selected}
                  disabled={item.disabled}
                  variant={variant}
                  size={size}
                  color={color}
                  aria-label={getItemAriaLabel(
                    item.type,
                    item.page ?? 0,
                    item.selected,
                  )}
                  onClick={handleClick(item.page)}
                >
                  {renderItemContent(item.type, item.page)}
                </PaginationItem>
              </li>
            );
          })}
        </PaginationList>
      </PaginationBase>
    );
  },
);

Pagination.displayName = 'Pagination';

export type {
  TPaginationProps,
  TPaginationVariant,
  TPaginationVariantProp,
  TPaginationSize,
  TPaginationItemType,
  TPaginationItemData,
} from './types';
export {
  PAGINATION_DEFAULT_VARIANTS,
  PAGINATION_INACTIVE_COLOR,
} from './types';
export { paginationClasses } from './classes';
export { PaginationBase, paginationBaseClasses } from './pagination-base';
export type { TPaginationBaseProps } from './pagination-base';
export { PaginationList, paginationListClasses } from './pagination-list';
export type { TPaginationListProps } from './pagination-list';
export { PaginationItem, paginationItemClasses } from './pagination-item';
export type { TPaginationItemProps } from './pagination-item';
export { PaginationEllipsis, paginationEllipsisClasses } from './pagination-ellipsis';
export type { TPaginationEllipsisProps } from './pagination-ellipsis';
export { Pagination };
export default Pagination;
