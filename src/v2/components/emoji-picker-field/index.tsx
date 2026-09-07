import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { emojiPickerFieldClasses } from './classes';
import { InputFieldLayout } from '../input/input-base';
import { InputEmojiField } from '../input/input-emoji-field';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { InputHelperText } from '../input/input-helper-text';
import { InputLabel } from '../input/input-label';
import { Text } from '../text';
import { TEmojiPickerFieldProps } from './types';

const EmojiPickerField = forwardRef<HTMLDivElement, TEmojiPickerFieldProps>(
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
      color = 'default',
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
            <Text size={inputDescriptionTextSize[size]}>{description}</Text>
          ) : null
        }
        helperText={
          helperText != null ? (
            <InputHelperText size={size} error={error}>
              {helperText}
            </InputHelperText>
          ) : null
        }
      >
        <InputEmojiField
          ref={ref}
          id={id}
          size={size}
          variant={variant}
          color={tone}
          aria-invalid={error || undefined}
          {...props}
          className={mergeClasses(
            emojiPickerFieldClasses.root,
            error && emojiPickerFieldClasses.error,
            required && emojiPickerFieldClasses.required,
            className,
          )}
        />
      </InputFieldLayout>
    );
  },
);

EmojiPickerField.displayName = 'EmojiPickerField';

export type { TEmojiPickerFieldProps } from './types';
export { emojiPickerFieldClasses } from './classes';
export { EmojiPickerField };
export default EmojiPickerField;
