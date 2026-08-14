import React, { forwardRef } from 'react';
import { InputGroupContext } from './context';
import { SInputGroup } from './styles';
import { TInputGroupProps } from './types';

const InputGroup = forwardRef<HTMLDivElement, TInputGroupProps>(
  ({ children, orientation = 'horizontal', color, variant, ...props }, ref) => {
    return (
      <InputGroupContext.Provider value={{ color, variant }}>
        <SInputGroup
          ref={ref}
          orientation={orientation}
          role="group"
          {...props}
        >
          {children}
        </SInputGroup>
      </InputGroupContext.Provider>
    );
  },
);

InputGroup.displayName = 'InputGroup';

export type { TInputGroupProps, TInputGroupOrientation } from './types';
export { InputGroup };
export default InputGroup;
