import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { fileFieldClasses } from './classes';
import { FormControl } from '../form-control';
import { InputFileField } from '../input/input-file-field';
import { TFileFieldProps } from './types';

const FileField = forwardRef<HTMLDivElement, TFileFieldProps>(
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
      value,
      defaultValue,
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
        value={value}
        defaultValue={defaultValue}
        className={mergeClasses(
          fileFieldClasses.root,
          disabled && fileFieldClasses.disabled,
          error && fileFieldClasses.error,
          required && fileFieldClasses.required,
          className,
        )}
      >
        <InputFileField
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          {...props}
        />
      </FormControl>
    );
  },
);

FileField.displayName = 'FileField';

export type { TFileFieldProps } from './types';
export { fileFieldClasses } from './classes';
export { FileField };
export default FileField;
