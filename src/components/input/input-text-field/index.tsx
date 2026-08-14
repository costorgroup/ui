import React, { forwardRef } from 'react';
import { SInputTextField } from './styles';
import { TInputTextFieldProps } from './types';

const InputTextField = forwardRef<HTMLInputElement, TInputTextFieldProps>(
  (props, ref) => {
    return <SInputTextField ref={ref} {...props} />;
  },
);

InputTextField.displayName = 'InputTextField';

export { InputTextField };
export default InputTextField;
