import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { breadcrumbSeparatorClasses } from './classes';
import { ArrowRightIcon } from '../../../icons';
import { SBreadcrumbSeparator } from './styles';
import { TBreadcrumbSeparatorProps } from './types';

const BreadcrumbSeparator = forwardRef<HTMLLIElement, TBreadcrumbSeparatorProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SBreadcrumbSeparator
        ref={ref}
        data-separator=""
        aria-hidden="true"
        {...props}
        className={mergeClasses(
          breadcrumbSeparatorClasses.root,
          className,
        )}
      >
        {children ?? <ArrowRightIcon aria-hidden="true" />}
      </SBreadcrumbSeparator>
    );
  },
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export type { TBreadcrumbSeparatorProps };
export { breadcrumbSeparatorClasses } from './classes';
export { BreadcrumbSeparator };
export default BreadcrumbSeparator;
