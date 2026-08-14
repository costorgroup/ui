import React, { forwardRef } from 'react';
import {
  SInputSwitch,
  SInputSwitchControl,
  SInputSwitchInput,
  SInputSwitchThumb,
} from './styles';
import { TInputSwitchProps } from './types';

const InputSwitch = forwardRef<HTMLInputElement, TInputSwitchProps>(
  ({ variant = 'subtle', size = 'md', color = 'primary', ...props }, ref) => {
    return (
      <SInputSwitch>
        <SInputSwitchInput
          ref={ref}
          type="checkbox"
          role="switch"
          {...props}
        />
        <SInputSwitchControl variant={variant} size={size} color={color}>
          <SInputSwitchThumb />
        </SInputSwitchControl>
      </SInputSwitch>
    );
  },
);

InputSwitch.displayName = 'InputSwitch';

export { InputSwitch };
export default InputSwitch;
