import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { emojiPickerFieldClasses } from './classes';
import { FormControl } from '../form-control';
import { InputEmojiField } from '../input/input-emoji-field';
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
      variant = 'surface',
      color = 'primary',
      id,
      className,
      disabled,
      slotProps,
      ...props
    },
    ref,
  ) => {
    return (
      <FormControl
        {...slotProps?.root}
        ref={ref}
        label={label}
        description={description}
        helperText={helperText}
        required={required}
        error={error}
        fullWidth={fullWidth}
        size={size}
        variant={variant}
        color={color}
        disabled={disabled}
        id={id}
        className={mergeClasses(
          emojiPickerFieldClasses.root,
          disabled && emojiPickerFieldClasses.disabled,
          error && emojiPickerFieldClasses.error,
          required && emojiPickerFieldClasses.required,
          slotProps?.root?.className,
          className,
        )}
        slotProps={slotProps}
      >
        <InputEmojiField
          slotProps={slotProps}
          disabled={disabled}
          {...props}
        />
      </FormControl>
    );
  },
);

EmojiPickerField.displayName = 'EmojiPickerField';

export type {
  TEmojiPickerFieldProps,
  TEmojiPickerFieldSlotProps,
} from './types';
export { emojiPickerFieldClasses } from './classes';
export { EmojiPickerField };
export default EmojiPickerField;
