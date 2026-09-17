import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { checkBoxClasses } from './classes';
import { FormControl } from '../form-control';
import { InputCheckBox } from '../input/input-check-box';
import { TCheckBoxProps } from './types';

const CheckBox = forwardRef<HTMLInputElement, TCheckBoxProps>(
  (
    {
      label,
      description,
      helperText,
      error = false,
      fullWidth = true,
      direction = 'ltr',
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
        label={label}
        description={description}
        helperText={helperText}
        error={error}
        fullWidth={fullWidth}
        direction={direction}
        size={size}
        variant={variant}
        color={color}
        disabled={disabled}
        id={id}
        className={mergeClasses(
          checkBoxClasses.root,
          error && checkBoxClasses.error,
          className,
        )}
      >
        <InputCheckBox ref={ref} {...props} />
      </FormControl>
    );
  },
);

CheckBox.displayName = 'CheckBox';

export type { TCheckBoxProps, TCheckBoxDirection } from './types';
export { checkBoxClasses } from './classes';
export { CheckBox };
export default CheckBox;
