import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
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
>(({ children, ...props }, ref) => {
  return (
    <SAlertBody ref={ref} {...props}>
      {children}
    </SAlertBody>
  );
});

AlertBody.displayName = 'AlertBody';

export type { TAlertBaseProps, TAlertVariant, TAlertSize } from './types';
export { AlertBase, AlertBody };
export default AlertBase;
