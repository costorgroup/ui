import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { inputRadioButtonClasses } from './classes';
import {
  SInputRadioButton,
  SInputRadioButtonControl,
  SInputRadioButtonDot,
  SInputRadioButtonInput,
} from './styles';
import { TInputRadioButtonProps } from './types';

const InputRadioButton = forwardRef<HTMLInputElement, TInputRadioButtonProps>(
  ({ variant = 'subtle', size = 'md', color = 'primary', className, ...props }, ref) => {
    return (
      <SInputRadioButton>
        <SInputRadioButtonInput ref={ref} type="radio" {...props}
        className={mergeClasses(
          inputRadioButtonClasses.root,
          className,
        )} />
        <SInputRadioButtonControl variant={variant} size={size} color={color}>
          <SInputRadioButtonDot aria-hidden />
        </SInputRadioButtonControl>
      </SInputRadioButton>
    );
  },
);

InputRadioButton.displayName = 'InputRadioButton';

export { inputRadioButtonClasses } from './classes';
export { InputRadioButton };
export default InputRadioButton;
