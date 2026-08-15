import React, { forwardRef } from 'react';
import {
  isAriaInvalid,
  mergeClasses,
} from '../../../helpers/generate-utility-classes';
import { inputCheckBoxClasses } from './classes';
import { CheckIcon } from '../../../icons';
import {
  SInputCheckBox,
  SInputCheckBoxControl,
  SInputCheckBoxInput,
} from './styles';
import { TInputCheckBoxProps } from './types';

const InputCheckBox = forwardRef<HTMLInputElement, TInputCheckBoxProps>(
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
      <SInputCheckBox
        className={mergeClasses(
          inputCheckBoxClasses.root,
          disabled && inputCheckBoxClasses.disabled,
          (checked ?? defaultChecked) && inputCheckBoxClasses.checked,
          isAriaInvalid(ariaInvalid) && inputCheckBoxClasses.error,
          className,
        )}
      >
        <SInputCheckBoxInput
          ref={ref}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          aria-invalid={ariaInvalid}
          {...props}
          className={inputCheckBoxClasses.input}
        />
        <SInputCheckBoxControl
          className={inputCheckBoxClasses.control}
          variant={variant}
          size={size}
          color={color}
        >
          <CheckIcon aria-hidden />
        </SInputCheckBoxControl>
      </SInputCheckBox>
    );
  },
);

InputCheckBox.displayName = 'InputCheckBox';

export { inputCheckBoxClasses } from './classes';
export { InputCheckBox };
export default InputCheckBox;
