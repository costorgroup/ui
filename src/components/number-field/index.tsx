import React, { forwardRef, useId } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { InputFieldLayout } from '../input/input-base';
import { InputHelperText } from '../input/input-helper-text';
import { Text } from '../text';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { InputLabel } from '../input/input-label';
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
      variant = 'subtle',
      color = 'primary',
      id,
      className,
      disabled,
      readOnly,
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
        className={mergeClasses(
          numberFieldClasses.root,
          disabled && numberFieldClasses.disabled,
          error && numberFieldClasses.error,
          required && numberFieldClasses.required,
          className,
        )}
        label={
          label != null ? (
            <InputLabel
              htmlFor={fieldId}
              required={required}
              error={error}
              disabled={disabled}
              size={size}
            >
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
            <InputHelperText size={size} color={tone} error={error}>
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
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          {...props}
        />
      </InputFieldLayout>
    );
  },
);

NumberField.displayName = 'NumberField';

export type { TNumberFieldProps } from './types';
export { numberFieldClasses } from './classes';
export { NumberField };
export default NumberField;
