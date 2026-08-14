import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { alertContentClasses } from './classes';
import { SAlertContent } from './styles';
import { TAlertContentProps } from './types';

const AlertContent = forwardRef<HTMLDivElement, TAlertContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SAlertContent ref={ref} {...props}
        className={mergeClasses(
          alertContentClasses.root,
          className,
        )}>
        {children}
      </SAlertContent>
    );
  },
);

AlertContent.displayName = 'AlertContent';

export type { TAlertContentProps };
export { alertContentClasses } from './classes';
export { AlertContent };
export default AlertContent;
