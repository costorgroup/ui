import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { rangeClasses } from './classes';
import { FormControl } from '../form-control';
import { InputRangeField } from '../input/input-range-field';
import { TRangeProps } from './types';

const Range = forwardRef<HTMLDivElement, TRangeProps>(
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
          rangeClasses.root,
          disabled && rangeClasses.disabled,
          error && rangeClasses.error,
          required && rangeClasses.required,
          className,
        )}
      >
        <InputRangeField
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          {...props}
        />
      </FormControl>
    );
  },
);

Range.displayName = 'Range';

export type { TRangeProps };
export { rangeClasses } from './classes';
export { Range };
export default Range;
