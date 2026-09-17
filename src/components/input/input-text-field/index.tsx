import React, { ChangeEvent, FocusEvent, forwardRef } from 'react';
import {
  isAriaInvalid,
  mergeClasses,
} from '../../../helpers/generate-utility-classes';
import { useFormControlState } from '../../form-control/context';
import { inputTextFieldClasses } from './classes';
import { SInputTextField } from './styles';
import { TInputTextFieldProps } from './types';

const InputTextField = forwardRef<HTMLInputElement, TInputTextFieldProps>(
  (
    {
      className,
      disabled: disabledProp,
      readOnly,
      required: requiredProp,
      id,
      onChange,
      onFocus,
      onBlur,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const form = useFormControlState({
      disabled: disabledProp,
      required: requiredProp,
      id,
    });
    const error = isAriaInvalid(ariaInvalid) || form.error;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      form.onChange?.(event, event.target.value);
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      form.setFocused?.(true);
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
    };

    return (
      <SInputTextField
        ref={ref}
        {...props}
        id={id ?? form.id}
        disabled={form.disabled}
        readOnly={readOnly}
        required={form.required}
        aria-invalid={error || undefined}
        aria-describedby={ariaDescribedBy ?? form.helperId}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={mergeClasses(
          inputTextFieldClasses.root,
          form.disabled && inputTextFieldClasses.disabled,
          error && inputTextFieldClasses.error,
          readOnly && inputTextFieldClasses.readOnly,
          form.required && inputTextFieldClasses.required,
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
