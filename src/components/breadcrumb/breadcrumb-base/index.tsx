import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { SBreadcrumbBase, SBreadcrumbList } from './styles';
import { TBreadcrumbBaseProps } from './types';

const BreadcrumbBase = forwardRef<HTMLElement, TBreadcrumbBaseProps>(
  (
    {
      children,
      size = 'md',
      color = 'primary',
      'aria-label': ariaLabel = 'Breadcrumb',
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
>(({ children, ...props }, ref) => {
  return (
    <SBreadcrumbList ref={ref} {...props}>
      {children}
    </SBreadcrumbList>
  );
});

BreadcrumbList.displayName = 'BreadcrumbList';

export type { TBreadcrumbBaseProps, TBreadcrumbSize } from './types';
export { BreadcrumbBase, BreadcrumbList };
export default BreadcrumbBase;
