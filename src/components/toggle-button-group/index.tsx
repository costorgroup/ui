import React, { forwardRef, MouseEvent, useState } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { ToggleButtonGroupContext } from './context';
import { toggleButtonGroupClasses } from './classes';
import { SToggleButtonGroup } from './styles';
import { TToggleButtonGroupProps } from './types';
import { TToggleButtonValue } from './context';

const nextGroupValue = (
  exclusive: boolean,
  current: TToggleButtonValue | TToggleButtonValue[] | null,
  buttonValue: TToggleButtonValue | undefined,
) => {
  if (buttonValue === undefined) {
    return current;
  }

  if (exclusive) {
    return current === buttonValue ? null : buttonValue;
  }

  const selected = Array.isArray(current) ? current : [];

  if (selected.includes(buttonValue)) {
    return selected.filter((item) => item !== buttonValue);
  }

  return [...selected, buttonValue];
};

const ToggleButtonGroup = forwardRef<HTMLDivElement, TToggleButtonGroupProps>(
  (
    {
      children,
      orientation = 'horizontal',
      color,
      variant = 'outline',
      className,
      disabled = false,
      exclusive = true,
      value: valueProp,
      defaultValue = exclusive ? null : [],
      onChange,
      ...props
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const value = isControlled ? valueProp : uncontrolledValue;

    const handleSelect = (
      event: MouseEvent<HTMLButtonElement>,
      buttonValue: TToggleButtonValue | undefined,
    ) => {
      const next = nextGroupValue(exclusive, value, buttonValue);

      if (!isControlled) {
        setUncontrolledValue(next);
      }

      onChange?.(event, next);
    };

    return (
      <ToggleButtonGroupContext.Provider
        value={{
          color,
          variant,
          disabled,
          exclusive,
          value,
          onSelect: handleSelect,
        }}
      >
        <SToggleButtonGroup
          ref={ref}
          orientation={orientation}
          role="group"
          {...props}
          className={mergeClasses(
            toggleButtonGroupClasses.root,
            disabled && toggleButtonGroupClasses.disabled,
            className,
          )}
        >
          {children}
        </SToggleButtonGroup>
      </ToggleButtonGroupContext.Provider>
    );
  },
);

ToggleButtonGroup.displayName = 'ToggleButtonGroup';

export type {
  TToggleButtonGroupProps,
  TToggleButtonGroupOrientation,
} from './types';
export type { TToggleButtonValue } from './context';
export { toggleButtonGroupClasses } from './classes';
export { ToggleButtonGroupContext } from './context';
export { useToggleButton } from './use-toggle-button';
export { ToggleButtonGroup };
export default ToggleButtonGroup;
