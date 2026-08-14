import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { pinFieldClasses } from './classes';
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
        
        className={mergeClasses(
          pinFieldClasses.root,
          error && pinFieldClasses.error,
          required && pinFieldClasses.required,
          className,
        )}
      />
      </InputFieldLayout>
    );
  },
);

PinField.displayName = 'PinField';

export type { TPinFieldProps };
export { pinFieldClasses } from './classes';
export { PinField };
export default PinField;
