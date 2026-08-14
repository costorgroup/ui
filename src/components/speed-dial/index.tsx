import React, {
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { speedDialClasses } from './classes';
import { CloseIcon, MoreHorizontalIcon } from '../../icons';
import { IconButton } from '../icon-button';
import { speedDialLayout } from './data';
import { SSpeedDial, SSpeedDialIcon, SSpeedDialIconWrap, SSpeedDialItems } from './styles';
import { TSpeedDialProps } from './types';

const SpeedDial = forwardRef<HTMLDivElement, TSpeedDialProps>(
  (
    {
      children,
      icon,
      closeIcon,
      itemsDirection = 'top',
      itemsGap = 'sm',
      gap = 'md',
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      color = 'primary',
      size = 'lg',
      variant = 'solid',
      disabled,
      triggerProps,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      'aria-label': ariaLabel = 'Speed dial',
      className,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const isControlled = openProp !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const open = isControlled ? openProp : uncontrolledOpen;
    const layout = speedDialLayout[itemsDirection];

    const setOpen = (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }

      onOpenChange?.(next);
    };

    const assignRef = (node: HTMLDivElement | null) => {
      rootRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useEffect(() => {
      if (!open) {
        return;
      }

      const onPointerDown = (event: PointerEvent) => {
        if (rootRef.current?.contains(event.target as Node)) {
          return;
        }

        setOpen(false);
      };

      const onEscape = (event: globalThis.KeyboardEvent) => {
        if (event.key === 'Escape') {
          setOpen(false);
        }
      };

      document.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('keydown', onEscape);

      return () => {
        document.removeEventListener('pointerdown', onPointerDown);
        document.removeEventListener('keydown', onEscape);
      };
    }, [open]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
      }

      onKeyDown?.(event);
    };

    return (
      <SSpeedDial
        ref={assignRef}
        flexDirection={layout.flexDirection}
        gap={gap}
        {...props}
        onMouseEnter={(event) => {
          if (!disabled) {
            setOpen(true);
          }
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          setOpen(false);
          onMouseLeave?.(event);
        }}
        onKeyDown={handleKeyDown}
      >
        <IconButton
          type="button"
          color={color}
          size={size}
          variant={variant}
          rounded
          disabled={disabled}
          aria-label={ariaLabel}
          aria-expanded={open}
          aria-haspopup="menu"
          {...triggerProps}
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            setOpen(!open);
            triggerProps?.onClick?.(event);
          }}
        >
          <SSpeedDialIconWrap>
            <SSpeedDialIcon data-slot="icon" data-open={open}>
              {icon ?? <MoreHorizontalIcon 
        className={mergeClasses(
          speedDialClasses.root,
          disabled && speedDialClasses.disabled,
          open && speedDialClasses.open,
          className,
        )}
      />}
            </SSpeedDialIcon>
            <SSpeedDialIcon data-slot="close" data-open={open}>
              {closeIcon ?? <CloseIcon />}
            </SSpeedDialIcon>
          </SSpeedDialIconWrap>
        </IconButton>
        <SSpeedDialItems
          open={open}
          itemsDirection={layout.itemsDirection}
          itemsGap={itemsGap}
          data-open={open}
          data-items-direction={layout.itemsDirection}
          role="menu"
          onClick={() => setOpen(false)}
        >
          {children}
        </SSpeedDialItems>
      </SSpeedDial>
    );
  },
);

SpeedDial.displayName = 'SpeedDial';

export type {
  TSpeedDialProps,
  TSpeedDialItemsDirection,
  TSpeedDialInset,
} from './types';
export { speedDialClasses } from './classes';
export { SpeedDial };
export default SpeedDial;
