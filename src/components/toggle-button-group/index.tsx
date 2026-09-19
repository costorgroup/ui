import React, { forwardRef, MouseEvent, useCallback, useMemo, useState } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { toggleButtonGroupClasses } from './classes';
import { ToggleButtonGroupContext, TToggleButtonValue } from './context';
import { SToggleButtonGroup } from './styles';
import { TToggleButtonGroupProps } from './types';

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
      color = 'default',
      variant = 'outline',
      appearance,
      size,
      className,
      disabled = false,
      rounded = false,
      fullWidth = false,
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

    const handleSelect = useCallback(
      (
        event: MouseEvent<HTMLButtonElement>,
        buttonValue: TToggleButtonValue | undefined,
      ) => {
        const next = nextGroupValue(exclusive, value, buttonValue);

        if (!isControlled) {
          setUncontrolledValue(next);
        }

        onChange?.(event, next);
      },
      [exclusive, isControlled, onChange, value],
    );

    const contextValue = useMemo(
      () => ({
        color,
        variant,
        appearance,
        size,
        disabled,
        exclusive,
        value,
        onSelect: handleSelect,
      }),
      [appearance, color, disabled, exclusive, handleSelect, size, value, variant],
    );

    return (
      <ToggleButtonGroupContext.Provider value={contextValue}>
        <SToggleButtonGroup
          ref={ref}
          orientation={orientation}
          variant={variant}
          color={color}
          rounded={rounded}
          fullWidth={fullWidth}
          role="group"
          {...props}
          className={mergeClasses(
            toggleButtonGroupClasses.root,
            orientation === 'vertical'
              ? toggleButtonGroupClasses.vertical
              : toggleButtonGroupClasses.horizontal,
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
} from './types';
export type {
  TToggleButtonGroupOrientation,
  TToggleButtonValue,
} from './context';
export { toggleButtonGroupClasses } from './classes';
export {
  ToggleButtonGroupContext,
  useToggleButtonGroupContext,
} from './context';
export { useToggleButton } from './use-toggle-button';
export { ToggleButtonGroup };
export default ToggleButtonGroup;
