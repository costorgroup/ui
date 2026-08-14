import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { inputSelectOptionClasses } from './classes';
import { SInputSelectOption } from '../input-select/styles';
import { TInputSelectOptionProps } from './types';

const InputSelectOption = forwardRef<HTMLButtonElement, TInputSelectOptionProps>(
  ({ children, type = 'button', className, ...props }, ref) => {
    return (
      <SInputSelectOption ref={ref} type={type} role="option" {...props}
        className={mergeClasses(
          inputSelectOptionClasses.root,
          className,
        )}>
        {children}
      </SInputSelectOption>
    );
  },
);

InputSelectOption.displayName = 'InputSelectOption';

export { inputSelectOptionClasses } from './classes';
export { InputSelectOption };
export default InputSelectOption;
