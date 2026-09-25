import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { mergeSlotProps } from '../../helpers/slot-props';
import { FormControl } from '../form-control';
import { InputNumberField } from '../input/input-number-field';
import { numberFieldClasses } from './classes';
import { TNumberFieldProps } from './types';

const NumberField = forwardRef<HTMLDivElement, TNumberFieldProps>(
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
      readOnly,
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
        className={mergeClasses(
          numberFieldClasses.root,
          disabled && numberFieldClasses.disabled,
          error && numberFieldClasses.error,
          required && numberFieldClasses.required,
          slotProps?.root?.className,
          className,
        )}
        slotProps={slotProps}
      >
        <InputNumberField
          {...mergeSlotProps(
            { disabled, readOnly, ...props },
            slotProps?.input,
          )}
          slotProps={slotProps}
        />
      </FormControl>
    );
  },
);

NumberField.displayName = 'NumberField';

export type { TNumberFieldProps, TNumberFieldSlotProps } from './types';
export { numberFieldClasses } from './classes';
export { NumberField };
export default NumberField;
