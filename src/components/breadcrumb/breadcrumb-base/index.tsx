import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { breadcrumbBaseClasses } from './classes';
import { SBreadcrumbBase, SBreadcrumbList } from './styles';
import { TBreadcrumbBaseProps } from './types';

const BreadcrumbBase = forwardRef<HTMLElement, TBreadcrumbBaseProps>(
  (
    {
      children,
      size = 'md',
      color = 'primary',
      'aria-label': ariaLabel = 'Breadcrumb',
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <SBreadcrumbBase
        ref={ref}
        size={size}
        color={color}
        aria-label={ariaLabel}
        {...props}
        className={mergeClasses(
          breadcrumbBaseClasses.root,
          className,
        )}
      >
        {children}
      </SBreadcrumbBase>
    );
  },
);

BreadcrumbBase.displayName = 'BreadcrumbBase';

const BreadcrumbList = forwardRef<
  HTMLOListElement,
  HTMLAttributes<HTMLOListElement> & { children?: ReactNode }
>(({ children, className, ...props }, ref) => {
  return (
    <SBreadcrumbList
      ref={ref}
      {...props}
      className={mergeClasses(breadcrumbBaseClasses.list, className)}
    >
      {children}
    </SBreadcrumbList>
  );
});

BreadcrumbList.displayName = 'BreadcrumbList';

export type { TBreadcrumbBaseProps, TBreadcrumbSize } from './types';
export { BreadcrumbBase, BreadcrumbList };
export { breadcrumbBaseClasses } from './classes';
export default BreadcrumbBase;
