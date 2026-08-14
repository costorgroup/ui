import React, { forwardRef } from 'react';
import { SInputLabel, SInputLabelRequired } from './styles';
import { TInputLabelProps } from './types';

const InputLabel = forwardRef<HTMLLabelElement, TInputLabelProps>(
  ({ children, required = false, size = 'sm', ...props }, ref) => {
    return (
      <SInputLabel ref={ref} size={size} {...props}>
        {children}
        {required ? (
          <SInputLabelRequired aria-hidden>*</SInputLabelRequired>
        ) : null}
      </SInputLabel>
    );
  },
);

InputLabel.displayName = 'InputLabel';

export { InputLabel };
export default InputLabel;
