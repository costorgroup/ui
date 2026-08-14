import React, { forwardRef } from 'react';
import { SInputHelperText } from './styles';
import { TInputHelperTextProps } from './types';

const InputHelperText = forwardRef<HTMLParagraphElement, TInputHelperTextProps>(
  ({ children, color = 'default', size = 'sm', ...props }, ref) => {
    return (
      <SInputHelperText ref={ref} color={color} size={size} {...props}>
        {children}
      </SInputHelperText>
    );
  },
);

InputHelperText.displayName = 'InputHelperText';

export { InputHelperText };
export default InputHelperText;
