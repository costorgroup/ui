import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { modalBodyClasses } from './classes';
import { SModalBody, SModalBodyPlain } from './styles';
import { TModalBodyProps } from './types';

const ModalBody = forwardRef<HTMLDivElement, TModalBodyProps>(
  ({ children, scrollable = true, className, ...props }, ref) => {
    const Root = scrollable ? SModalBody : SModalBodyPlain;

    return (
      <Root
        ref={ref}
        {...props}
        className={mergeClasses(modalBodyClasses.root, className)}
      >
        {children}
      </Root>
    );
  },
);

ModalBody.displayName = 'ModalBody';

export type { TModalBodyProps };
export { modalBodyClasses } from './classes';
export { ModalBody };
export default ModalBody;
