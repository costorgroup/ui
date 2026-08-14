import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { alertTitleClasses } from './classes';
import { SAlertTitle } from './styles';
import { TAlertTitleProps } from './types';

const AlertTitle = forwardRef<HTMLDivElement, TAlertTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SAlertTitle ref={ref} {...props}
        className={mergeClasses(
          alertTitleClasses.root,
          className,
        )}>
        {children}
      </SAlertTitle>
    );
  },
);

AlertTitle.displayName = 'AlertTitle';

export type { TAlertTitleProps };
export { alertTitleClasses } from './classes';
export { AlertTitle };
export default AlertTitle;
