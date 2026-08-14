import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { richTextFieldClasses } from './classes';
import { InputFieldLayout } from '../input/input-base';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { InputHelperText } from '../input/input-helper-text';
import { InputLabel } from '../input/input-label';
import { InputRichTextField } from '../input/input-rich-text-field';
import { Text } from '../text';
import { TRichTextFieldProps } from './types';

const RichTextField = forwardRef<HTMLDivElement, TRichTextFieldProps>(
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
        <InputRichTextField
          ref={ref}
          id={id}
          size={size}
          variant={variant}
          color={tone}
          aria-invalid={error || undefined}
          {...props}
        className={mergeClasses(
          richTextFieldClasses.root,
          error && richTextFieldClasses.error,
          required && richTextFieldClasses.required,
          className,
        )}
        />
      </InputFieldLayout>
    );
  },
);

RichTextField.displayName = 'RichTextField';

export type { TRichTextFieldProps } from './types';
export { richTextFieldClasses } from './classes';
export { RichTextField };
export default RichTextField;
