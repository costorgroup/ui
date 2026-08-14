import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { alertClasses } from './classes';
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
      className,
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
        className={mergeClasses(
          alertClasses.root,
          className,
        )}
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
export { alertClasses } from './classes';
export { Alert };
export default Alert;
