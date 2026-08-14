import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { modalBaseClasses } from './classes';
import { SModalBase } from './styles';
import { TModalBaseProps } from './types';

const ModalBase = forwardRef<HTMLDivElement, TModalBaseProps>(
  (
    {
      children,
      size = 'md',
      scrollable = true,
      role = 'dialog',
      onClick,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <SModalBase
        ref={ref}
        size={size}
        scrollable={scrollable}
        role={role}
        aria-modal="true"
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          event.stopPropagation();
          onClick?.(event);
        }}
        {...props}
        className={mergeClasses(
          modalBaseClasses.root,
          className,
        )}
      >
        {children}
      </SModalBase>
    );
  },
);

ModalBase.displayName = 'ModalBase';

export type { TModalBaseProps, TModalSize } from './types';
export { modalBaseClasses } from './classes';
export { ModalBase };
export default ModalBase;
