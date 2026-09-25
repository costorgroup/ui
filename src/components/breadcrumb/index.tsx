import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { BreadcrumbBase, BreadcrumbList } from './breadcrumb-base';
import { breadcrumbClasses } from './classes';
import { TBreadcrumbProps } from './types';

const Breadcrumb = forwardRef<HTMLElement, TBreadcrumbProps>(
  (
    {
      children,
      size = 'md',
      color = 'default',
      className,
      slotProps,
      ...props
    },
    ref,
  ) => {
    return (
      <BreadcrumbBase
        ref={ref}
        size={size}
        color={color}
        {...props}
        className={mergeClasses(breadcrumbClasses.root, className)}
      >
        <BreadcrumbList {...slotProps?.list}>{children}</BreadcrumbList>
      </BreadcrumbBase>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';

export type {
  TBreadcrumbProps,
  TBreadcrumbSlotProps,
  TBreadcrumbSize,
} from './types';
export { breadcrumbClasses } from './classes';
export { BreadcrumbBase, BreadcrumbList } from './breadcrumb-base';
export type { TBreadcrumbBaseProps } from './breadcrumb-base';
export { breadcrumbBaseClasses } from './breadcrumb-base';
export { BreadcrumbItem } from './breadcrumb-item';
export type { TBreadcrumbItemProps } from './breadcrumb-item';
export { breadcrumbItemClasses } from './breadcrumb-item';
export { BreadcrumbSeparator } from './breadcrumb-separator';
export type { TBreadcrumbSeparatorProps } from './breadcrumb-separator';
export { breadcrumbSeparatorClasses } from './breadcrumb-separator';
export { BreadcrumbLink } from './breadcrumb-link';
export type { TBreadcrumbLinkProps } from './breadcrumb-link';
export { breadcrumbLinkClasses } from './breadcrumb-link';
export { BreadcrumbIcon } from './breadcrumb-icon';
export type { TBreadcrumbIconProps } from './breadcrumb-icon';
export { breadcrumbIconClasses } from './breadcrumb-icon';
export { BreadcrumbEllipsis } from './breadcrumb-ellipsis';
export type { TBreadcrumbEllipsisProps } from './breadcrumb-ellipsis';
export { breadcrumbEllipsisClasses } from './breadcrumb-ellipsis';
export { Breadcrumb };
export default Breadcrumb;
