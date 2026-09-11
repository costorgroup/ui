import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { useFormControlState } from '../../form-control/context';
import { inputLabelClasses } from './classes';
import { SInputLabel, SInputLabelRequired } from './styles';
import { TInputLabelProps } from './types';

const InputLabel = forwardRef<HTMLLabelElement, TInputLabelProps>(
  (
    {
      children,
      required: requiredProp,
      error: errorProp,
      disabled: disabledProp,
      size: sizeProp,
      htmlFor,
      id,
      className,
      ...props
    },
    ref,
  ) => {
    const form = useFormControlState({
      required: requiredProp,
      error: errorProp,
      disabled: disabledProp,
      size: sizeProp,
      id: htmlFor,
    });

    return (
      <SInputLabel
        ref={ref}
        id={id ?? form.labelId}
        htmlFor={htmlFor ?? form.id}
        size={form.size}
        disabled={form.disabled}
        focused={form.focused}
        {...props}
        className={mergeClasses(
          inputLabelClasses.root,
          form.required && inputLabelClasses.required,
          form.error && inputLabelClasses.error,
          form.disabled && inputLabelClasses.disabled,
          form.focused && inputLabelClasses.focused,
          className,
        )}
      >
        {children}
        {form.required ? (
          <SInputLabelRequired
            className={inputLabelClasses.asterisk}
            aria-hidden
          >
            *
          </SInputLabelRequired>
        ) : null}
      </SInputLabel>
    );
  },
);

InputLabel.displayName = 'InputLabel';

export { inputLabelClasses } from './classes';
export { InputLabel };
export default InputLabel;
