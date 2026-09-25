import React, {
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { IconButton } from '../icon-button';
import { speedDialClasses } from './classes';
import { speedDialLayout } from './data';
import {
  SSpeedDial,
  SSpeedDialItems,
  SSpeedDialTriggerIcon,
  SSpeedDialTriggerWrap,
} from './styles';
import { TSpeedDialProps } from './types';
import { mergeSlotProps } from '../../helpers/slot-props';

const SpeedDialPlusIcon = () => (
  <svg
    width="1.15em"
    height="1.15em"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
    />
  </svg>
);

const SpeedDial = forwardRef<HTMLDivElement, TSpeedDialProps>(
  (
    {
      children,
      icon,
      itemsDirection = 'top',
      itemsGap = 'sm',
      gap = 'md',
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      color = 'default',
      size = 'lg',
      variant = 'solid',
      appearance = 'opaque',
      radius = 'pill',
      disabled,
      triggerProps,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      'aria-label': ariaLabel = 'Speed dial',
      className,
      slotProps,
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
        className={mergeClasses(
          speedDialClasses.root,
          disabled && speedDialClasses.disabled,
          open && speedDialClasses.open,
          className,
        )}
      >
        <SSpeedDialTriggerWrap>
          <IconButton
            {...mergeSlotProps(
              {
                type: 'button',
                color,
                size,
                variant,
                appearance,
                radius,
                disabled,
                'aria-label': ariaLabel,
                'aria-expanded': open,
                'aria-haspopup': 'menu',
                ...triggerProps,
                className: mergeClasses(
                  speedDialClasses.trigger,
                  triggerProps?.className,
                ),
                onClick: (event: MouseEvent<HTMLButtonElement>) => {
                  setOpen(!open);
                  triggerProps?.onClick?.(event);
                },
              },
              slotProps?.trigger,
            )}
          >
            <SSpeedDialTriggerIcon
              {...mergeSlotProps(
                {
                  'data-open': open ? 'true' : 'false',
                },
                slotProps?.triggerIcon,
              )}
            >
              {icon ?? <SpeedDialPlusIcon />}
            </SSpeedDialTriggerIcon>
          </IconButton>
        </SSpeedDialTriggerWrap>
        <SSpeedDialItems
          {...mergeSlotProps(
            {
              itemsDirection: layout.itemsDirection,
              itemsGap,
              itemOffset: layout.itemOffset,
              'data-open': open ? 'true' : 'false',
              'data-items-direction': layout.itemsDirection,
              role: 'menu',
              className: speedDialClasses.items,
              onClick: () => setOpen(false),
            },
            slotProps?.items,
          )}
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
  TSpeedDialSlotProps,
  TSpeedDialItemsDirection,
  TSpeedDialInset,
} from './types';
export { speedDialClasses } from './classes';
export { SpeedDial };
export default SpeedDial;
