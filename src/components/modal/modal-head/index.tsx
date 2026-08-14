import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { modalHeadClasses } from './classes';
import { CloseIcon } from '../../../icons';
import { IconButton } from '../../icon-button';
import { SModalHead, SModalHeadClose, SModalHeadContent } from './styles';
import { TModalHeadProps } from './types';

const ModalHead = forwardRef<HTMLDivElement, TModalHeadProps>(
  ({ children, onClose, className, ...props }, ref) => {
    return (
      <SModalHead ref={ref} {...props}
        className={mergeClasses(
          modalHeadClasses.root,
          className,
        )}>
        {children != null ? (
          <SModalHeadContent>{children}</SModalHeadContent>
        ) : (
          <SModalHeadContent />
        )}
        {onClose != null ? (
          <SModalHeadClose>
            <IconButton
              type="button"
              variant="ghost"
              color="default"
              size="lg"
              rounded
              aria-label="Close"
              onClick={onClose}
            >
              <CloseIcon width="1em" height="1em" />
            </IconButton>
          </SModalHeadClose>
        ) : null}
      </SModalHead>
    );
  },
);

ModalHead.displayName = 'ModalHead';

export type { TModalHeadProps };
export { modalHeadClasses } from './classes';
export { ModalHead };
export default ModalHead;
