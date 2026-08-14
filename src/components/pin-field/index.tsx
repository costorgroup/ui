import React, { forwardRef } from 'react';
import { InputFieldLayout } from '../input/input-base';
import { InputHelperText } from '../input/input-helper-text';
import { Text } from '../text';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { InputLabel } from '../input/input-label';
import { InputPinField } from '../input/input-pin-field';
import { TPinFieldProps } from './types';

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
      variant = 'subtle',
      color = 'primary',
      id,
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
            <InputLabel
              htmlFor={id ? `${id}-pin-0` : undefined}
              required={required}
              size={size}
            >
              {label}
            </InputLabel>
          ) : null
        }
        description={
          description != null ? (
            <Text size={inputDescriptionTextSize[size]} color="default">{description}</Text>
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
        <InputPinField
          ref={ref}
          id={id}
          size={size}
          variant={variant}
          color={tone}
          {...props}
          aria-invalid={error || undefined}
        />
      </InputFieldLayout>
    );
  },
);

PinField.displayName = 'PinField';

export type { TPinFieldProps };
export { PinField };
export default PinField;
