import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { inputCheckBoxClasses } from './classes';
import { CheckIcon } from '../../../icons';
import {
  SInputCheckBox,
  SInputCheckBoxControl,
  SInputCheckBoxInput,
} from './styles';
import { TInputCheckBoxProps } from './types';

const InputCheckBox = forwardRef<HTMLInputElement, TInputCheckBoxProps>(
  ({ variant = 'subtle', size = 'md', color = 'primary', className, ...props }, ref) => {
    return (
      <SInputCheckBox>
        <SInputCheckBoxInput ref={ref} type="checkbox" {...props}
        className={mergeClasses(
          inputCheckBoxClasses.root,
          className,
        )} />
        <SInputCheckBoxControl variant={variant} size={size} color={color}>
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
