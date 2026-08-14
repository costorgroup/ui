import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { ButtonGroupContext } from './context';
import { buttonGroupClasses } from './classes';
import { SButtonGroup } from './styles';
import { TButtonGroupProps } from './types';

const ButtonGroup = forwardRef<HTMLDivElement, TButtonGroupProps>(
  (
    {
      children,
      orientation = 'horizontal',
      color,
      variant,
      className,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    return (
      <ButtonGroupContext.Provider value={{ color, variant }}>
        <SButtonGroup
          ref={ref}
          orientation={orientation}
          role="group"
          {...props}
          className={mergeClasses(
            buttonGroupClasses.root,
            disabled && buttonGroupClasses.disabled,
            className,
          )}
        >
          {children}
        </SButtonGroup>
      </ButtonGroupContext.Provider>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';

export type { TButtonGroupProps, TButtonGroupOrientation } from './types';
export { buttonGroupClasses } from './classes';
export { ButtonGroup };
export default ButtonGroup;
