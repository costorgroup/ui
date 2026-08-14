import React, { forwardRef } from 'react';
import { InputFieldLayout } from '../input/input-base';
import { InputLabel } from '../input/input-label';
import { InputWrapper } from '../input/input-wrapper';
import { InputTextField } from '../input/input-text-field';
import { InputHelperText } from '../input/input-helper-text';
import { Text } from '../text';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { InputIcon } from '../input/input-icon';
import { TTextFieldProps } from './types';

const TextField = forwardRef<HTMLDivElement, TTextFieldProps>(
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
      startIcon,
      endIcon,
      id,
      ...props
    },
    ref,
  ) => {
    const fieldId = id ?? (typeof label === 'string' ? undefined : undefined);
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
        <InputWrapper size={size} variant={variant} color={tone}>
          {startIcon != null ? <InputIcon>{startIcon}</InputIcon> : null}
          <InputTextField
            id={fieldId}
            aria-invalid={error || undefined}
            {...props}
          />
          {endIcon != null ? <InputIcon>{endIcon}</InputIcon> : null}
        </InputWrapper>
      </InputFieldLayout>
    );
  },
);

TextField.displayName = 'TextField';

export type { TTextFieldProps };
export { TextField };
export default TextField;
