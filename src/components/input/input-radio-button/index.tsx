import React, { forwardRef } from 'react';
import {
  isAriaInvalid,
  mergeClasses,
} from '../../../helpers/generate-utility-classes';
import { inputRadioButtonClasses } from './classes';
import {
  SInputRadioButton,
  SInputRadioButtonControl,
  SInputRadioButtonDot,
  SInputRadioButtonInput,
} from './styles';
import { TInputRadioButtonProps } from './types';

const InputRadioButton = forwardRef<HTMLInputElement, TInputRadioButtonProps>(
  (
    {
      variant = 'subtle',
      size = 'md',
      color = 'primary',
      className,
      disabled,
      checked,
      defaultChecked,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref,
  ) => {
    return (
      <SInputRadioButton
        className={mergeClasses(
          inputRadioButtonClasses.root,
          disabled && inputRadioButtonClasses.disabled,
          (checked ?? defaultChecked) && inputRadioButtonClasses.checked,
          isAriaInvalid(ariaInvalid) && inputRadioButtonClasses.error,
          className,
        )}
      >
        <SInputRadioButtonInput
          ref={ref}
          type="radio"
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          aria-invalid={ariaInvalid}
          {...props}
          className={inputRadioButtonClasses.input}
        />
        <SInputRadioButtonControl
          className={inputRadioButtonClasses.control}
          variant={variant}
          size={size}
          color={color}
        >
          <SInputRadioButtonDot
            className={inputRadioButtonClasses.dot}
            aria-hidden
          />
        </SInputRadioButtonControl>
      </SInputRadioButton>
    );
  },
);

InputRadioButton.displayName = 'InputRadioButton';

export { inputRadioButtonClasses } from './classes';
export { InputRadioButton };
export default InputRadioButton;
