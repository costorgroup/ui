import React, { forwardRef } from 'react';
import { Backdrop } from '../backdrop';
import { Portal } from '../portal';
import { ModalBase } from './modal-base';
import { ModalHead } from './modal-head';
import { ModalBody } from './modal-body';
import { ModalActions } from './modal-actions';
import { TModalProps } from './types';

const Modal = forwardRef<HTMLDivElement, TModalProps>(
  (
    {
      children,
      title,
      actions,
      size = 'md',
      scrollable = true,
      onClose,
      ...props
    },
    ref,
  ) => {
    return (
      <Portal>
        <Backdrop
          scrollable={scrollable}
          align="start"
          justify="center"
          padding
          layer="modal"
          lockScroll
          onClose={onClose}
        >
          <ModalBase ref={ref} size={size} scrollable={scrollable} {...props}>
            {title != null || onClose != null ? (
              <ModalHead onClose={onClose}>{title}</ModalHead>
            ) : null}
            {children != null ? (
              <ModalBody scrollable={scrollable}>{children}</ModalBody>
            ) : null}
            {actions != null ? <ModalActions>{actions}</ModalActions> : null}
          </ModalBase>
        </Backdrop>
      </Portal>
    );
  },
);

Modal.displayName = 'Modal';

export type { TModalProps, TModalSize } from './types';
export { Modal };
export default Modal;
