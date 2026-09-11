import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { overlayState, useOverlayOpen } from '../../../motion';
import { modalBaseClasses } from './classes';
import { SModalBase } from './styles';
import { TModalBaseProps } from './types';

const ModalBase = forwardRef<HTMLDivElement, TModalBaseProps>(
  (
    {
      children,
      size = 'md',
      variant = 'surface',
      scrollable = true,
      role = 'dialog',
      onClick,
      className,
      ...props
    },
    ref,
  ) => {
    const open = useOverlayOpen();

    return (
      <SModalBase
        ref={ref}
        size={size}
        scrollable={scrollable}
        variant={variant}
        elevation={1}
        radius="xl"
        role={role}
        aria-modal="true"
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          event.stopPropagation();
          onClick?.(event);
        }}
        {...props}
        {...overlayState(open)}
        className={mergeClasses(modalBaseClasses.root, className)}
      >
        {children}
      </SModalBase>
    );
  },
);

ModalBase.displayName = 'ModalBase';

export type {
  TModalBaseProps,
  TModalSize,
  TModalVariant,
} from './types';
export { modalBaseClasses } from './classes';
export { ModalBase };
export default ModalBase;
