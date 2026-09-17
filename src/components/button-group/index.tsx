import React, { forwardRef, useMemo } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { buttonGroupClasses } from './classes';
import { ButtonGroupContext } from './context';
import { SButtonGroup } from './styles';
import { TButtonGroupProps } from './types';

const ButtonGroup = forwardRef<HTMLDivElement, TButtonGroupProps>(
  (
    {
      children,
      orientation = 'horizontal',
      color = 'default',
      variant,
      appearance,
      size,
      disabled = false,
      rounded = false,
      className,
      ...props
    },
    ref,
  ) => {
    const contextValue = useMemo(
      () => ({ orientation, color, variant, appearance, size, disabled }),
      [appearance, color, disabled, orientation, size, variant],
    );

    return (
      <ButtonGroupContext.Provider value={contextValue}>
        <SButtonGroup
          ref={ref}
          orientation={orientation}
          variant={variant}
          color={color}
          rounded={rounded}
          role="group"
          {...props}
          className={mergeClasses(
            buttonGroupClasses.root,
            orientation === 'vertical'
              ? buttonGroupClasses.vertical
              : buttonGroupClasses.horizontal,
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

export type { TButtonGroupProps } from './types';
export type { TButtonGroupOrientation } from './context';
export { buttonGroupClasses } from './classes';
export { ButtonGroupContext, useButtonGroupContext } from './context';
export { ButtonGroup };
export default ButtonGroup;
