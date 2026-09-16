import React, { forwardRef, isValidElement, ReactNode } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { Portal } from '../../../components/portal';
import { Backdrop } from '../backdrop';
import { modalClasses } from './classes';
import { ModalActions } from './modal-actions';
import { ModalBase } from './modal-base';
import { ModalBody } from './modal-body';
import { ModalDescription } from './modal-description';
import { ModalHeader } from './modal-header';
import { ModalHeaderActions } from './modal-header-actions';
import { ModalTitle } from './modal-title';
import { TModalProps } from './types';

const wrapSlot = (
  value: ReactNode,
  Slot: typeof ModalTitle | typeof ModalDescription,
) => {
  if (value == null) {
    return null;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return <Slot>{value}</Slot>;
  }

  if (isValidElement(value)) {
    return value;
  }

  return <Slot>{value}</Slot>;
};

const Modal = forwardRef<HTMLDivElement, TModalProps>(
  (
    {
      children,
      title,
      description,
      headerActions,
      actions,
      size = 'md',
      variant = 'surface',
      scrollable = true,
      open = true,
      onClose,
      className,
      ...props
    },
    ref,
  ) => (
    <Portal>
      <Backdrop
        scrollable={scrollable}
        align="center"
        justify="center"
        layer="modal"
        lockScroll
        open={open}
        onClose={onClose}
      >
        <ModalBase
          ref={ref}
          size={size}
          scrollable={scrollable}
          variant={variant}
          {...props}
          className={mergeClasses(modalClasses.root, className)}
        >
          {title != null || description != null || headerActions != null ? (
            <ModalHeader>
              {wrapSlot(title, ModalTitle)}
              {wrapSlot(description, ModalDescription)}
              {headerActions != null ? (
                <ModalHeaderActions>{headerActions}</ModalHeaderActions>
              ) : null}
            </ModalHeader>
          ) : null}
          {children != null ? (
            <ModalBody scrollable={scrollable}>{children}</ModalBody>
          ) : null}
          {actions != null ? <ModalActions>{actions}</ModalActions> : null}
        </ModalBase>
      </Backdrop>
    </Portal>
  ),
);

Modal.displayName = 'Modal';

export type { TModalProps, TModalSize, TModalVariant } from './types';
export { modalClasses } from './classes';
export { ModalBase, modalBaseClasses } from './modal-base';
export type { TModalBaseProps } from './modal-base';
export { ModalHeader, modalHeaderClasses } from './modal-header';
export type { TModalHeaderProps } from './modal-header';
export {
  ModalHeaderActions,
  modalHeaderActionsClasses,
} from './modal-header-actions';
export type { TModalHeaderActionsProps } from './modal-header-actions';
export { ModalBody, modalBodyClasses } from './modal-body';
export type { TModalBodyProps } from './modal-body';
export { ModalActions, modalActionsClasses } from './modal-actions';
export type { TModalActionsProps } from './modal-actions';
export { ModalTitle, modalTitleClasses } from './modal-title';
export type {
  TModalTitleProps,
  TModalTitleOwnProps,
  TModalTitleAs,
} from './modal-title';
export { ModalDescription, modalDescriptionClasses } from './modal-description';
export type { TModalDescriptionProps } from './modal-description';
export { Modal };
export default Modal;
