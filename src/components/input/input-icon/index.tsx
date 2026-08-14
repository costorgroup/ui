import React, { forwardRef } from 'react';
import { SInputIcon } from './styles';
import { TInputIconProps } from './types';

const InputIcon = forwardRef<HTMLSpanElement, TInputIconProps>(
  ({ children, ...props }, ref) => {
    return (
      <SInputIcon ref={ref} {...props}>
        {children}
      </SInputIcon>
    );
  },
);

InputIcon.displayName = 'InputIcon';

export { InputIcon };
export default InputIcon;
