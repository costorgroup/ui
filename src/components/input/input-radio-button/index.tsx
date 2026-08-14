import React, { forwardRef } from 'react';
import {
  SInputRadioButton,
  SInputRadioButtonControl,
  SInputRadioButtonDot,
  SInputRadioButtonInput,
} from './styles';
import { TInputRadioButtonProps } from './types';

const InputRadioButton = forwardRef<HTMLInputElement, TInputRadioButtonProps>(
  ({ variant = 'subtle', size = 'md', color = 'primary', ...props }, ref) => {
    return (
      <SInputRadioButton>
        <SInputRadioButtonInput ref={ref} type="radio" {...props} />
        <SInputRadioButtonControl variant={variant} size={size} color={color}>
          <SInputRadioButtonDot aria-hidden />
        </SInputRadioButtonControl>
      </SInputRadioButton>
    );
  },
);

InputRadioButton.displayName = 'InputRadioButton';

export { InputRadioButton };
export default InputRadioButton;
