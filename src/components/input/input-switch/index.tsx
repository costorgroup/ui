import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { inputSwitchClasses } from './classes';
import {
  SInputSwitch,
  SInputSwitchControl,
  SInputSwitchInput,
  SInputSwitchThumb,
} from './styles';
import { TInputSwitchProps } from './types';

const InputSwitch = forwardRef<HTMLInputElement, TInputSwitchProps>(
  (
    {
      variant = 'subtle',
      size = 'md',
      color = 'primary',
      className,
      disabled,
      checked,
      defaultChecked,
      ...props
    },
    ref,
  ) => {
    return (
      <SInputSwitch
        className={mergeClasses(
          inputSwitchClasses.root,
          disabled && inputSwitchClasses.disabled,
          (checked ?? defaultChecked) && inputSwitchClasses.checked,
          className,
        )}
      >
        <SInputSwitchInput
          ref={ref}
          type="checkbox"
          role="switch"
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          {...props}
          className={inputSwitchClasses.input}
        />
        <SInputSwitchControl
          className={inputSwitchClasses.control}
          variant={variant}
          size={size}
          color={color}
        >
          <SInputSwitchThumb className={inputSwitchClasses.thumb} />
        </SInputSwitchControl>
      </SInputSwitch>
    );
  },
);

InputSwitch.displayName = 'InputSwitch';

export { inputSwitchClasses } from './classes';
export { InputSwitch };
export default InputSwitch;
