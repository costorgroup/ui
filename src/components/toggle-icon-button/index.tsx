import React, { forwardRef, MouseEvent, useState } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { useToggleButton } from '../toggle-button-group/use-toggle-button';
import { toggleIconButtonClasses } from './classes';
import { SToggleIconButton } from './styles';
import { TToggleIconButtonProps } from './types';

const ToggleIconButton = forwardRef<HTMLButtonElement, TToggleIconButtonProps>(
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
      type = 'button',
      onMouseDown,
      className,
      disabled,
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

    const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onMouseDown?.(event);
    };

    return (
      <SToggleIconButton
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
          toggleIconButtonClasses.root,
          resolvedDisabled && toggleIconButtonClasses.disabled,
          resolvedActive && toggleIconButtonClasses.active,
          focusVisible && toggleIconButtonClasses.focusVisible,
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
        onMouseDown={handleMouseDown}
      >
        {children}
      </SToggleIconButton>
    );
  },
);

ToggleIconButton.displayName = 'ToggleIconButton';

export type {
  TToggleIconButtonProps,
  TToggleIconButtonVariant,
  TToggleIconButtonAppearance,
  TToggleIconButtonSize,
  TToggleIconButtonRadius,
} from './types';
export { toggleIconButtonClasses } from './classes';
export { ToggleIconButton };
export default ToggleIconButton;
