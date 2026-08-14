import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { InputGroupContext } from './context';
import { inputGroupClasses } from './classes';
import { SInputGroup } from './styles';
import { TInputGroupProps } from './types';

const InputGroup = forwardRef<HTMLDivElement, TInputGroupProps>(
  (
    {
      children,
      orientation = 'horizontal',
      color,
      variant,
      className,
      disabled = false,
      error = false,
      ...props
    },
    ref,
  ) => {
    return (
      <InputGroupContext.Provider value={{ color, variant }}>
        <SInputGroup
          ref={ref}
          orientation={orientation}
          role="group"
          {...props}
          className={mergeClasses(
            inputGroupClasses.root,
            disabled && inputGroupClasses.disabled,
            error && inputGroupClasses.error,
            className,
          )}
        >
          {children}
        </SInputGroup>
      </InputGroupContext.Provider>
    );
  },
);

InputGroup.displayName = 'InputGroup';

export type { TInputGroupProps, TInputGroupOrientation } from './types';
export { inputGroupClasses } from './classes';
export { InputGroup };
export default InputGroup;
