import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { CloseIcon } from '../../icons';
import { alertClasses } from './classes';
import { AlertBase, AlertBody } from './alert-base';
import { AlertIcon } from './alert-icon';
import { AlertTitle } from './alert-title';
import { AlertContent } from './alert-content';
import { AlertActions } from './alert-actions';
import { AlertMessage } from './alert-message';
import { SAlertClose } from './styles';
import { TAlertProps } from './types';
import { mergeSlotProps } from '../../helpers/slot-props';

const Alert = forwardRef<HTMLDivElement, TAlertProps>(
  (
    {
      children,
      title,
      actions,
      icon,
      iconAlign,
      actionsPlacement,
      actionsAlign,
      color = 'primary',
      variant = 'subtle',
      size = 'md',
      radius = 'md',
      onClose,
      className,
      slotProps,
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
        radius={radius}
        closable={closable}
        {...props}
        className={mergeClasses(
          alertClasses.root,
          className,
        )}
      >
        {icon != null ? (
          <AlertIcon align={iconAlign} {...slotProps?.icon}>
            {icon}
          </AlertIcon>
        ) : null}
        <AlertBody actionsPlacement={actionsPlacement} {...slotProps?.body}>
          {title != null || children != null ? (
            <AlertMessage {...slotProps?.message}>
              {title != null ? (
                <AlertTitle {...slotProps?.title}>{title}</AlertTitle>
              ) : null}
              {children != null ? (
                <AlertContent {...slotProps?.content}>{children}</AlertContent>
              ) : null}
            </AlertMessage>
          ) : null}
          {actions != null ? (
            <AlertActions align={actionsAlign} {...slotProps?.actions}>
              {actions}
            </AlertActions>
          ) : null}
        </AlertBody>
        {closable ? (
          <SAlertClose
            {...mergeSlotProps(
              {
                'aria-label': 'Close',
                variant: 'ghost',
                color,
                size: size === 'lg' ? 'md' : 'sm',
                onClick: onClose,
              },
              slotProps?.closeButton,
            )}
          >
            <CloseIcon />
          </SAlertClose>
        ) : null}
      </AlertBase>
    );
  },
);

Alert.displayName = 'Alert';

export type {
  TAlertProps,
  TAlertSlotProps,
  TAlertVariant,
  TAlertSize,
  TAlertRadius,
  TAlertAlign,
  TAlertActionsPlacement,
} from './types';
export { alertClasses } from './classes';
export { AlertBase, AlertBody, alertBaseClasses } from './alert-base';
export type { TAlertBaseProps, TAlertBodyProps } from './alert-base';
export { AlertMessage, alertMessageClasses } from './alert-message';
export type { TAlertMessageProps } from './alert-message';
export { AlertIcon, alertIconClasses } from './alert-icon';
export type { TAlertIconProps } from './alert-icon';
export { AlertTitle, alertTitleClasses } from './alert-title';
export type { TAlertTitleProps } from './alert-title';
export { AlertContent, alertContentClasses } from './alert-content';
export type { TAlertContentProps } from './alert-content';
export { AlertActions, alertActionsClasses } from './alert-actions';
export type { TAlertActionsProps } from './alert-actions';
export { Alert };
export default Alert;
