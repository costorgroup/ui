import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { modalBodyClasses } from './classes';
import { SModalBody, SModalBodyPlain } from './styles';
import { TModalBodyProps } from './types';

const ModalBody = forwardRef<HTMLDivElement, TModalBodyProps>(
  (
    {
      children,
      scrollable = true,
      mode = 'hover',
      color = 'primary',
      className,
      ...props
    },
    ref,
  ) => {
    if (!scrollable) {
      return (
        <SModalBodyPlain ref={ref} {...props}
        className={mergeClasses(
          modalBodyClasses.root,
          className,
        )}>
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
export { modalBodyClasses } from './classes';
export { ModalBody };
export default ModalBody;
