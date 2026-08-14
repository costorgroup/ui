import React, { forwardRef } from 'react';
import {
  isAriaInvalid,
  mergeClasses,
} from '../../../helpers/generate-utility-classes';
import { inputTextFieldClasses } from './classes';
import { SInputTextField } from './styles';
import { TInputTextFieldProps } from './types';

const InputTextField = forwardRef<HTMLInputElement, TInputTextFieldProps>(
  (
    {
      className,
      disabled,
      readOnly,
      required,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref,
  ) => {
    return (
      <SInputTextField
        ref={ref}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        aria-invalid={ariaInvalid}
        {...props}
        className={mergeClasses(
          inputTextFieldClasses.root,
          disabled && inputTextFieldClasses.disabled,
          isAriaInvalid(ariaInvalid) && inputTextFieldClasses.error,
          readOnly && inputTextFieldClasses.readOnly,
          required && inputTextFieldClasses.required,
          className,
        )}
      />
    );
  },
);

InputTextField.displayName = 'InputTextField';

export { inputTextFieldClasses } from './classes';
export { InputTextField };
export default InputTextField;
