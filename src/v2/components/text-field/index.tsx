import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { FormControl } from '../form-control';
import { InputWrapper } from '../input/input-wrapper';
import { InputTextField } from '../input/input-text-field';
import { InputIcon } from '../input/input-icon';
import { textFieldClasses } from './classes';
import { TTextFieldProps } from './types';

const TextField = forwardRef<HTMLDivElement, TTextFieldProps>(
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
      startIcon,
      endIcon,
      actionBar,
      id,
      className,
      disabled,
      readOnly,
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
          textFieldClasses.root,
          disabled && textFieldClasses.disabled,
          error && textFieldClasses.error,
          required && textFieldClasses.required,
          className,
        )}
      >
        <InputWrapper readOnly={readOnly} actionBar={actionBar}>
          {startIcon != null ? <InputIcon>{startIcon}</InputIcon> : null}
          <InputTextField disabled={disabled} readOnly={readOnly} {...props} />
          {endIcon != null ? <InputIcon>{endIcon}</InputIcon> : null}
        </InputWrapper>
      </FormControl>
    );
  },
);

TextField.displayName = 'TextField';

export type { TTextFieldProps };
export { textFieldClasses } from './classes';
export { TextField };
export default TextField;
