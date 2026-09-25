import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { rangeClasses } from './classes';
import { FormControl } from '../form-control';
import { InputRangeField } from '../input/input-range-field';
import { TRangeProps, TRangeSlotProps } from './types';

const Range = forwardRef<HTMLDivElement, TRangeProps>(
  (
    {
      label,
      description,
      helperText,
      required,
      error = false,
      fullWidth = true,
      size = 'md',
      variant = 'surface',
      color = 'primary',
      id,
      className,
      disabled,
      value,
      defaultValue,
      slotProps,
      ...props
    },
    ref,
  ) => {
    return (
      <FormControl
        {...slotProps?.root}
        ref={ref}
        label={label}
        description={description}
        helperText={helperText}
        required={required}
        error={error}
        fullWidth={fullWidth}
        size={size}
        variant={variant}
        color={color}
        disabled={disabled}
        id={id}
        value={value}
        defaultValue={defaultValue}
        className={mergeClasses(
          rangeClasses.root,
          disabled && rangeClasses.disabled,
          error && rangeClasses.error,
          required && rangeClasses.required,
          slotProps?.root?.className,
          className,
        )}
        slotProps={slotProps}
      >
        <InputRangeField
          slotProps={slotProps}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          {...props}
        />
      </FormControl>
    );
  },
);

Range.displayName = 'Range';

export type { TRangeProps, TRangeSlotProps };
export { rangeClasses } from './classes';
export { Range };
export default Range;
