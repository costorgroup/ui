import React, { forwardRef } from 'react';
import { ButtonGroupContext } from './context';
import { SButtonGroup } from './styles';
import { TButtonGroupProps } from './types';

const ButtonGroup = forwardRef<HTMLDivElement, TButtonGroupProps>(
  ({ children, orientation = 'horizontal', color, variant, ...props }, ref) => {
    return (
      <ButtonGroupContext.Provider value={{ color, variant }}>
        <SButtonGroup
          ref={ref}
          orientation={orientation}
          role="group"
          {...props}
        >
          {children}
        </SButtonGroup>
      </ButtonGroupContext.Provider>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';

export type { TButtonGroupProps, TButtonGroupOrientation } from './types';
export { ButtonGroup };
export default ButtonGroup;
