import React, { forwardRef } from 'react';
import { InputFieldLayout } from '../input/input-base';
import { InputLabel } from '../input/input-label';
import { InputWrapper } from '../input/input-wrapper';
import { InputTextAreaField } from '../input/input-text-area-field';
import { InputHelperText } from '../input/input-helper-text';
import { Text } from '../text';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { TTextAreaProps } from './types';

const TextArea = forwardRef<HTMLDivElement, TTextAreaProps>(
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
        ref={ref}
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
          <InputTextAreaField
            id={id}
            aria-invalid={error || undefined}
            {...props}
          />
        </InputWrapper>
      </InputFieldLayout>
    );
  },
);

TextArea.displayName = 'TextArea';

export type { TTextAreaProps };
export { TextArea };
export default TextArea;
