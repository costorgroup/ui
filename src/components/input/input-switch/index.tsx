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
  ({ variant = 'subtle', size = 'md', color = 'primary', className, ...props }, ref) => {
    return (
      <SInputSwitch>
        <SInputSwitchInput
          ref={ref}
          type="checkbox"
          role="switch"
          {...props}
        className={mergeClasses(
          inputSwitchClasses.root,
          className,
        )}
        />
        <SInputSwitchControl variant={variant} size={size} color={color}>
          <SInputSwitchThumb />
        </SInputSwitchControl>
      </SInputSwitch>
    );
  },
);

InputSwitch.displayName = 'InputSwitch';

export { inputSwitchClasses } from './classes';
export { InputSwitch };
export default InputSwitch;
