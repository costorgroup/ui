import React, { forwardRef, useEffect, useRef } from 'react';
import { SBackdrop } from './styles';
import { TBackdropProps } from './types';

const Backdrop = forwardRef<HTMLDivElement, TBackdropProps>(
  (
    {
      children,
      scrollable = true,
      align = 'center',
      justify = 'center',
      padding = false,
      layer = 'modal',
      lockScroll = false,
      onClose,
      onMouseDown,
      onClick,
      ...props
    },
    ref,
  ) => {
    const backdropClick = useRef(false);

    useEffect(() => {
      if (!lockScroll && !onClose) {
        return;
      }

      const previousOverflow = document.body.style.overflow;

      if (lockScroll) {
        document.body.style.overflow = 'hidden';
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose?.();
        }
      };

      if (onClose) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        if (lockScroll) {
          document.body.style.overflow = previousOverflow;
        }

        if (onClose) {
          document.removeEventListener('keydown', handleKeyDown);
        }
      };
    }, [lockScroll, onClose]);

    return (
      <SBackdrop
        ref={ref}
        role="presentation"
        scrollable={scrollable}
        align={align}
        justify={justify}
        padding={padding}
        layer={layer}
        onMouseDown={(event) => {
          backdropClick.current = event.target === event.currentTarget;
          onMouseDown?.(event);
        }}
        onClick={(event) => {
          onClick?.(event);

          if (event.defaultPrevented) {
            return;
          }

          if (!backdropClick.current) {
            return;
          }

          backdropClick.current = false;
          onClose?.();
        }}
        {...props}
      >
        {children}
      </SBackdrop>
    );
  },
);

Backdrop.displayName = 'Backdrop';

export type {
  TBackdropProps,
  TBackdropAlign,
  TBackdropJustify,
  TBackdropLayer,
} from './types';
export { Backdrop };
export default Backdrop;
