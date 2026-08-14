import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { alertBaseClasses } from './classes';
import { SAlertBase, SAlertBody } from './styles';
import { TAlertBaseProps } from './types';

const AlertBase = forwardRef<HTMLDivElement, TAlertBaseProps>(
  (
    {
      children,
      color = 'primary',
      variant = 'subtle',
      size = 'md',
      closable = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <SAlertBase
        ref={ref}
        role="alert"
        color={color}
        variant={variant}
        size={size}
        closable={closable}
        {...props}
        className={mergeClasses(
          alertBaseClasses.root,
          className,
        )}
      >
        {children}
      </SAlertBase>
    );
  },
);

AlertBase.displayName = 'AlertBase';

const AlertBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { children?: ReactNode }
>(({ children, className, ...props }, ref) => {
  return (
    <SAlertBody
      ref={ref}
      {...props}
      className={mergeClasses(alertBaseClasses.body, className)}
    >
      {children}
    </SAlertBody>
  );
});

AlertBody.displayName = 'AlertBody';

export type { TAlertBaseProps, TAlertVariant, TAlertSize } from './types';
export { AlertBase, AlertBody };
export { alertBaseClasses } from './classes';
export default AlertBase;
