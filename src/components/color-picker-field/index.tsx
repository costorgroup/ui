import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { colorPickerFieldClasses } from './classes';
import { FormControl } from '../form-control';
import { InputColorField } from '../input/input-color-field';
import { TColorPickerFieldProps } from './types';

const ColorPickerField = forwardRef<HTMLDivElement, TColorPickerFieldProps>(
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
      ...props
    },
    ref,
  ) => {
    return (
      <FormControl
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
          colorPickerFieldClasses.root,
          disabled && colorPickerFieldClasses.disabled,
          error && colorPickerFieldClasses.error,
          required && colorPickerFieldClasses.required,
          className,
        )}
      >
        <InputColorField disabled={disabled} {...props} />
      </FormControl>
    );
  },
);

ColorPickerField.displayName = 'ColorPickerField';

export type { TColorPickerFieldProps, TColorFormat } from './types';
export { colorPickerFieldClasses } from './classes';
export { ColorPickerField };
export default ColorPickerField;
