import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { InputFieldLayout } from '../input/input-base';
import { InputLabel } from '../input/input-label';
import { InputWrapper } from '../input/input-wrapper';
import { InputTextAreaField } from '../input/input-text-area-field';
import { InputHelperText } from '../input/input-helper-text';
import { Text } from '../text';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { textAreaClasses } from './classes';
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
      className,
      disabled,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const tone = error ? 'error' : color;

    return (
      <InputFieldLayout
        ref={ref}
        fullWidth={fullWidth}
        className={mergeClasses(
          textAreaClasses.root,
          disabled && textAreaClasses.disabled,
          error && textAreaClasses.error,
          required && textAreaClasses.required,
          className,
        )}
        label={
          label != null ? (
            <InputLabel
              htmlFor={id}
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
        <InputWrapper
          size={size}
          variant={variant}
          color={tone}
          error={error}
          disabled={disabled}
          readOnly={readOnly}
        >
          <InputTextAreaField
            id={id}
            aria-invalid={error || undefined}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            {...props}
          />
        </InputWrapper>
      </InputFieldLayout>
    );
  },
);

TextArea.displayName = 'TextArea';

export type { TTextAreaProps };
export { textAreaClasses } from './classes';
export { TextArea };
export default TextArea;
