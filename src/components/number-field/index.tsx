import React, { forwardRef, useId } from 'react';
import { InputFieldLayout } from '../input/input-base';
import { InputHelperText } from '../input/input-helper-text';
import { Text } from '../text';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { InputLabel } from '../input/input-label';
import { InputNumberField } from '../input/input-number-field';
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
      variant = 'subtle',
      color = 'primary',
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const tone = error ? 'error' : color;

    return (
      <InputFieldLayout
        ref={ref}
        fullWidth={fullWidth}
        label={
          label != null ? (
            <InputLabel htmlFor={fieldId} required={required} size={size}>
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
        <InputNumberField
          id={fieldId}
          size={size}
          variant={variant}
          color={tone}
          aria-invalid={error || undefined}
          {...props}
        />
      </InputFieldLayout>
    );
  },
);

NumberField.displayName = 'NumberField';

export type { TNumberFieldProps } from './types';
export { NumberField };
export default NumberField;
