import React, { forwardRef, useEffect, useRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import {
  OverlayMotionContext,
  overlayState,
  usePresence,
} from '../../motion';
import { backdropClasses } from './classes';
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
      open = true,
      onClose,
      onMouseDown,
      onClick,
      className,
      ...props
    },
    ref,
  ) => {
    const backdropClick = useRef(false);
    const { present, visible } = usePresence(open);

    useEffect(() => {
      if (!present || (!lockScroll && !onClose)) {
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

      if (open && onClose) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        if (lockScroll) {
          document.body.style.overflow = previousOverflow;
        }

        if (open && onClose) {
          document.removeEventListener('keydown', handleKeyDown);
        }
      };
    }, [present, open, lockScroll, onClose]);

    return (
      <OverlayMotionContext.Provider value={visible}>
        <SBackdrop
          ref={ref}
          role="presentation"
          scrollable={scrollable}
          align={align}
          justify={justify}
          padding={padding}
          layer={layer}
          hidden={!present}
          aria-hidden={!present}
          onMouseDown={(event) => {
            backdropClick.current = event.target === event.currentTarget;
            onMouseDown?.(event);
          }}
          onClick={(event) => {
            onClick?.(event);

            if (event.defaultPrevented || !open) {
              return;
            }

            if (!backdropClick.current) {
              return;
            }

            backdropClick.current = false;
            onClose?.();
          }}
          {...props}
          {...overlayState(visible)}
          className={mergeClasses(backdropClasses.root, className)}
        >
          {children}
        </SBackdrop>
      </OverlayMotionContext.Provider>
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
export { backdropClasses } from './classes';
export { Backdrop };
export default Backdrop;
