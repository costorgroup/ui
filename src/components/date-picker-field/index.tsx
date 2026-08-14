import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { datePickerFieldClasses } from './classes';
import { InputFieldLayout } from '../input/input-base';
import { InputDateField } from '../input/input-date-field';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { InputHelperText } from '../input/input-helper-text';
import { InputLabel } from '../input/input-label';
import { Text } from '../text';
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
      variant = 'subtle',
      color = 'primary',
      id,
      className,
      ...props
    },
    ref,
  ) => {
    const tone = error ? 'error' : color;

    return (
      <InputFieldLayout
        fullWidth={fullWidth}
        label={
          label != null ? (
            <InputLabel htmlFor={id} required={required} size={size}>
              {label}
            </InputLabel>
          ) : null
        }
        description={
          description != null ? (
            <Text size={inputDescriptionTextSize[size]} color="default">
              {description}
            </Text>
          ) : null
        }
        helperText={
          helperText != null ? (
            <InputHelperText size={size} color={tone}>
              {helperText}
            </InputHelperText>
          ) : null
        }
      >
        <InputDateField
          ref={ref}
          id={id}
          size={size}
          variant={variant}
          color={tone}
          aria-invalid={error || undefined}
          {...props}
        className={mergeClasses(
          datePickerFieldClasses.root,
          error && datePickerFieldClasses.error,
          required && datePickerFieldClasses.required,
          className,
        )}
        />
      </InputFieldLayout>
    );
  },
);

DatePickerField.displayName = 'DatePickerField';

export type { TDatePickerFieldProps, TDatePickerMode } from './types';
export type {
  TDatePickerDisplayType,
  TTimePickerDisplayType,
} from './types';
export { datePickerFieldClasses } from './classes';
export { DatePickerField };
export default DatePickerField;
