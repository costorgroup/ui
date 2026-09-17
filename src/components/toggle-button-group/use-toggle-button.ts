import { MouseEvent, useContext, useState } from 'react';
import { TPaletteColor } from '../../theme/types';
import {
  TButtonAppearance,
  TButtonSize,
  TButtonVariant,
} from '../button/types';
import { ToggleButtonGroupContext, TToggleButtonValue } from './context';

type TUseToggleButtonParams = {
  value?: TToggleButtonValue;
  active?: boolean;
  defaultActive?: boolean;
  disabled?: boolean;
  variant?: TButtonVariant;
  appearance?: TButtonAppearance;
  size?: TButtonSize;
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
  appearance: appearanceProp,
  size: sizeProp,
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
  const appearance = appearanceProp ?? group?.appearance ?? 'opaque';
  const color = colorProp ?? group?.color ?? 'default';
  const size = sizeProp ?? group?.size ?? 'md';
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
    appearance,
    size,
    color,
    disabled: resolvedDisabled,
    handleClick,
  };
};
