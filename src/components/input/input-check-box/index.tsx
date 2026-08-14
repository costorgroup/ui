import React, { forwardRef } from 'react';
import { CheckIcon } from '../../../icons';
import {
  SInputCheckBox,
  SInputCheckBoxControl,
  SInputCheckBoxInput,
} from './styles';
import { TInputCheckBoxProps } from './types';

const InputCheckBox = forwardRef<HTMLInputElement, TInputCheckBoxProps>(
  ({ variant = 'subtle', size = 'md', color = 'primary', ...props }, ref) => {
    return (
      <SInputCheckBox>
        <SInputCheckBoxInput ref={ref} type="checkbox" {...props} />
        <SInputCheckBoxControl variant={variant} size={size} color={color}>
          <CheckIcon aria-hidden />
        </SInputCheckBoxControl>
      </SInputCheckBox>
    );
  },
);

InputCheckBox.displayName = 'InputCheckBox';

export { InputCheckBox };
export default InputCheckBox;
