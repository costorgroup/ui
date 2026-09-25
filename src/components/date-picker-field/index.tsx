import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { datePickerFieldClasses } from './classes';
import { FormControl } from '../form-control';
import { InputDateField } from '../input/input-date-field';
import { TDatePickerFieldProps } from './types';

const DatePickerField = forwardRef<HTMLDivElement, TDatePickerFieldProps>(
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
          datePickerFieldClasses.root,
          disabled && datePickerFieldClasses.disabled,
          error && datePickerFieldClasses.error,
          required && datePickerFieldClasses.required,
          slotProps?.root?.className,
          className,
        )}
        slotProps={slotProps}
      >
        <InputDateField
          slotProps={slotProps}
          disabled={disabled}
          {...props}
        />
      </FormControl>
    );
  },
);

DatePickerField.displayName = 'DatePickerField';

export type {
  TDatePickerFieldProps,
  TDatePickerFieldSlotProps,
  TDatePickerMode,
} from './types';
export type {
  TDatePickerDisplayType,
  TTimePickerDisplayType,
} from './types';
export { datePickerFieldClasses } from './classes';
export { DatePickerField };
export default DatePickerField;
