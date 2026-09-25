import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { richTextFieldClasses } from './classes';
import { FormControl } from '../form-control';
import { InputRichTextField } from '../input/input-rich-text-field';
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
          richTextFieldClasses.root,
          disabled && richTextFieldClasses.disabled,
          error && richTextFieldClasses.error,
          required && richTextFieldClasses.required,
          slotProps?.root?.className,
          className,
        )}
        slotProps={slotProps}
      >
        <InputRichTextField
          slotProps={slotProps}
          disabled={disabled}
          {...props}
        />
      </FormControl>
    );
  },
);

RichTextField.displayName = 'RichTextField';

export type { TRichTextFieldProps, TRichTextFieldSlotProps } from './types';
export { richTextFieldClasses } from './classes';
export { RichTextField };
export default RichTextField;
