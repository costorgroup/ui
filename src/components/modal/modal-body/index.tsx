import React, { forwardRef } from 'react';
import { SModalBody, SModalBodyPlain } from './styles';
import { TModalBodyProps } from './types';

const ModalBody = forwardRef<HTMLDivElement, TModalBodyProps>(
  (
    {
      children,
      scrollable = true,
      mode = 'hover',
      color = 'primary',
      ...props
    },
    ref,
  ) => {
    if (!scrollable) {
      return (
        <SModalBodyPlain ref={ref} {...props}>
          {children}
        </SModalBodyPlain>
      );
    }

    return (
      <SModalBody ref={ref} mode={mode} color={color} {...props}>
        {children}
      </SModalBody>
    );
  },
);

ModalBody.displayName = 'ModalBody';

export type { TModalBodyProps };
export { ModalBody };
export default ModalBody;
