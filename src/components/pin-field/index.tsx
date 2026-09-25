import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { pinFieldClasses } from './classes';
import { FormControl } from '../form-control';
import { InputPinField } from '../input/input-pin-field';
import { TPinFieldProps, TPinFieldSlotProps } from './types';

const PinField = forwardRef<HTMLDivElement, TPinFieldProps>(
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
          pinFieldClasses.root,
          disabled && pinFieldClasses.disabled,
          error && pinFieldClasses.error,
          required && pinFieldClasses.required,
          slotProps?.root?.className,
          className,
        )}
        slotProps={slotProps}
      >
        <InputPinField
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

PinField.displayName = 'PinField';

export type { TPinFieldProps, TPinFieldSlotProps };
export { pinFieldClasses } from './classes';
export { PinField };
export default PinField;
