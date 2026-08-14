import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { inputLabelClasses } from './classes';
import { SInputLabel, SInputLabelRequired } from './styles';
import { TInputLabelProps } from './types';

const InputLabel = forwardRef<HTMLLabelElement, TInputLabelProps>(
  (
    {
      children,
      required = false,
      error = false,
      disabled = false,
      size = 'sm',
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <SInputLabel
        ref={ref}
        size={size}
        {...props}
        className={mergeClasses(
          inputLabelClasses.root,
          required && inputLabelClasses.required,
          error && inputLabelClasses.error,
          disabled && inputLabelClasses.disabled,
          className,
        )}
      >
        {children}
        {required ? (
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
