import { MouseEvent, useContext, useState } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TButtonVariant } from '../button/types';
import { ToggleButtonGroupContext, TToggleButtonValue } from './context';

type TUseToggleButtonParams = {
  value?: TToggleButtonValue;
  active?: boolean;
  defaultActive?: boolean;
  disabled?: boolean;
  variant?: TButtonVariant;
  color?: TPaletteColor;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onChange?: (event: MouseEvent<HTMLButtonElement>, active: boolean) => void;
};

const isValueSelected = (
  groupValue: TToggleButtonValue | TToggleButtonValue[] | null,
  buttonValue: TToggleButtonValue | undefined,
  exclusive: boolean,
) => {
  if (buttonValue === undefined || groupValue == null) {
    return false;
  }

  if (exclusive) {
    return groupValue === buttonValue;
  }

  return Array.isArray(groupValue) && groupValue.includes(buttonValue);
};

export const useToggleButton = ({
  value,
  active,
  defaultActive = false,
  disabled,
  variant: variantProp,
  color: colorProp,
  onClick,
  onChange,
}: TUseToggleButtonParams) => {
  const group = useContext(ToggleButtonGroupContext);
  const isControlled = active !== undefined;
  const [uncontrolledActive, setUncontrolledActive] = useState(defaultActive);

  const resolvedActive = group
    ? isValueSelected(group.value, value, group.exclusive)
    : isControlled
      ? Boolean(active)
      : uncontrolledActive;

  const variant = variantProp ?? group?.variant ?? 'outline';
  const color = colorProp ?? group?.color ?? 'primary';
  const resolvedDisabled = disabled ?? group?.disabled ?? false;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (resolvedDisabled) {
      return;
    }

    if (group) {
      group.onSelect(event, value);
    } else {
      const next = !resolvedActive;

      if (!isControlled) {
        setUncontrolledActive(next);
      }

      onChange?.(event, next);
    }

    onClick?.(event);
  };

  return {
    active: resolvedActive,
    variant,
    color,
    disabled: resolvedDisabled,
    handleClick,
  };
};
