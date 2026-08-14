import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { colorPickerFieldClasses } from './classes';
import { InputFieldLayout } from '../input/input-base';
import { InputColorField } from '../input/input-color-field';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { InputHelperText } from '../input/input-helper-text';
import { InputLabel } from '../input/input-label';
import { Text } from '../text';
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
        <InputColorField
          ref={ref}
          id={id}
          size={size}
          variant={variant}
          color={tone}
          aria-invalid={error || undefined}
          {...props}
        className={mergeClasses(
          colorPickerFieldClasses.root,
          error && colorPickerFieldClasses.error,
          required && colorPickerFieldClasses.required,
          className,
        )}
        />
      </InputFieldLayout>
    );
  },
);

ColorPickerField.displayName = 'ColorPickerField';

export type { TColorPickerFieldProps, TColorFormat } from './types';
export { colorPickerFieldClasses } from './classes';
export { ColorPickerField };
export default ColorPickerField;
