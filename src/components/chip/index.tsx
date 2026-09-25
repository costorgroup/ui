import React, { KeyboardEvent, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import CloseIcon from '../../icons/close-icon';
import { chipClasses } from './classes';
import { SChip, SChipDelete } from './styles';
import { TChipProps } from './types';
import { mergeSlotProps } from '../../helpers/slot-props';

const Chip = forwardRef<HTMLSpanElement, TChipProps>(
  (
    {
      children,
      variant = 'solid',
      appearance = 'opaque',
      size = 'md',
      color = 'default',
      radius = 'sm',
      className,
      disabled = false,
      onClick,
      onDelete,
      onKeyDown,
      tabIndex,
      slotProps,
      ...props
    },
    ref,
  ) => {
    const clickable = typeof onClick === 'function';

    const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || !clickable || disabled) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.(event as unknown as React.MouseEvent<HTMLSpanElement>);
      }
    };

    return (
      <SChip
        ref={ref}
        variant={variant}
        appearance={appearance}
        size={size}
        color={color}
        radius={radius}
        clickable={clickable}
        role={clickable ? 'button' : undefined}
        aria-disabled={disabled || undefined}
        {...props}
        tabIndex={clickable ? (disabled ? -1 : (tabIndex ?? 0)) : tabIndex}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        className={mergeClasses(
          chipClasses.root,
          clickable && chipClasses.clickable,
          onDelete && chipClasses.deletable,
          disabled && chipClasses.disabled,
          className,
        )}
      >
        {children}
        {onDelete ? (
          <SChipDelete
            {...mergeSlotProps(
              {
                size: 'xs',
                radius: 'full',
                variant: 'ghost',
                appearance,
                color,
                className: chipClasses.delete,
                disabled,
                'aria-label': 'Delete',
                onMouseDown: (event) => event.stopPropagation(),
                onClick: (event) => {
                  event.stopPropagation();
                  if (!disabled) onDelete(event);
                },
              },
              slotProps?.deleteButton,
            )}
          >
            <CloseIcon />
          </SChipDelete>
        ) : null}
      </SChip>
    );
  },
);

Chip.displayName = 'Chip';

export type {
  TChipProps,
  TChipSlotProps,
  TChipVariant,
  TChipAppearance,
  TChipSize,
  TChipRadius,
} from './types';
export { chipClasses } from './classes';
export { Chip };
export default Chip;
