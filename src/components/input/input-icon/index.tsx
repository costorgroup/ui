import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { inputIconClasses } from './classes';
import { SInputIcon } from './styles';
import { TInputIconProps } from './types';

const InputIcon = forwardRef<HTMLSpanElement, TInputIconProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SInputIcon
        ref={ref}
        {...props}
        className={mergeClasses(inputIconClasses.root, className)}
      >
        {children}
      </SInputIcon>
    );
  },
);

InputIcon.displayName = 'InputIcon';

export { inputIconClasses } from './classes';
export { InputIcon };
export default InputIcon;
