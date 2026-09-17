import React, { forwardRef, useState } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { useToggleButton } from '../toggle-button-group/use-toggle-button';
import { toggleButtonClasses } from './classes';
import { SToggleButton } from './styles';
import { TToggleButtonProps } from './types';

const ToggleButton = forwardRef<HTMLButtonElement, TToggleButtonProps>(
  (
    {
      children,
      value,
      active,
      defaultActive,
      variant: variantProp,
      appearance: appearanceProp,
      size: sizeProp,
      color: colorProp,
      radius = 'sm',
      className,
      disabled,
      type = 'button',
      onClick,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const {
      active: resolvedActive,
      variant,
      appearance,
      size,
      color,
      disabled: resolvedDisabled,
      handleClick,
    } = useToggleButton({
      value,
      active,
      defaultActive,
      disabled,
      variant: variantProp,
      appearance: appearanceProp,
      size: sizeProp,
      color: colorProp,
      onClick,
      onChange,
    });
    const [focusVisible, setFocusVisible] = useState(false);

    return (
      <SToggleButton
        ref={ref}
        type={type}
        value={value == null ? undefined : String(value)}
        variant={variant}
        appearance={appearance}
        size={size}
        color={color}
        radius={radius}
        disabled={resolvedDisabled}
        aria-pressed={resolvedActive}
        {...props}
        className={mergeClasses(
          toggleButtonClasses.root,
          resolvedDisabled && toggleButtonClasses.disabled,
          resolvedActive && toggleButtonClasses.active,
          focusVisible && toggleButtonClasses.focusVisible,
          className,
        )}
        onClick={handleClick}
        onFocus={(event) => {
          setFocusVisible(event.currentTarget.matches(':focus-visible'));
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocusVisible(false);
          onBlur?.(event);
        }}
      >
        {children}
      </SToggleButton>
    );
  },
);

ToggleButton.displayName = 'ToggleButton';

export type {
  TToggleButtonProps,
  TToggleButtonVariant,
  TToggleButtonAppearance,
  TToggleButtonSize,
  TToggleButtonRadius,
} from './types';
export { toggleButtonClasses } from './classes';
export { ToggleButton };
export default ToggleButton;
