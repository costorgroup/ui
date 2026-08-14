import React, { forwardRef } from 'react';
import { SInputSelectOption } from '../input-select/styles';
import { TInputSelectOptionProps } from './types';

const InputSelectOption = forwardRef<HTMLButtonElement, TInputSelectOptionProps>(
  ({ children, type = 'button', ...props }, ref) => {
    return (
      <SInputSelectOption ref={ref} type={type} role="option" {...props}>
        {children}
      </SInputSelectOption>
    );
  },
);

InputSelectOption.displayName = 'InputSelectOption';

export { InputSelectOption };
export default InputSelectOption;
