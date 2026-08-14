import React, { forwardRef } from 'react';
import { CloseIcon } from '../../icons';
import { AlertBase, AlertBody } from './alert-base';
import { AlertIcon } from './alert-icon';
import { AlertTitle } from './alert-title';
import { AlertContent } from './alert-content';
import { AlertActions } from './alert-actions';
import { SAlertClose } from './styles';
import { TAlertProps } from './types';

const Alert = forwardRef<HTMLDivElement, TAlertProps>(
  (
    {
      children,
      title,
      actions,
      icon,
      color = 'primary',
      variant = 'subtle',
      size = 'md',
      onClose,
      ...props
    },
    ref,
  ) => {
    const closable = typeof onClose === 'function';

    return (
      <AlertBase
        ref={ref}
        color={color}
        variant={variant}
        size={size}
        closable={closable}
        {...props}
      >
        {icon != null ? <AlertIcon>{icon}</AlertIcon> : null}
        <AlertBody>
          {title != null ? <AlertTitle>{title}</AlertTitle> : null}
          {children != null ? <AlertContent>{children}</AlertContent> : null}
          {actions != null ? <AlertActions>{actions}</AlertActions> : null}
        </AlertBody>
        {closable ? (
          <SAlertClose
            aria-label="Close"
            variant="ghost"
            color={color}
            size={size === 'lg' ? 'md' : 'sm'}
            onClick={onClose}
          >
            <CloseIcon />
          </SAlertClose>
        ) : null}
      </AlertBase>
    );
  },
);

Alert.displayName = 'Alert';

export type { TAlertProps, TAlertVariant, TAlertSize } from './types';
export { Alert };
export default Alert;
