import React, { forwardRef, MouseEvent, useContext, useState } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { ButtonGroupContext } from '../button-group/context';
import { InputGroupContext } from '../input-group/context';
import { iconButtonClasses } from './classes';
import { SIconButton } from './styles';
import { TIconButtonProps } from './types';

const IconButton = forwardRef<HTMLButtonElement, TIconButtonProps>(
  (
    {
      children,
      variant: variantProp,
      size = 'md',
      color: colorProp,
      rounded = false,
      type = 'button',
      onMouseDown,
      className,
      disabled,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const buttonGroup = useContext(ButtonGroupContext);
    const inputGroup = useContext(InputGroupContext);
    const group = buttonGroup ?? inputGroup;

    const variant = variantProp ?? group?.variant ?? 'solid';
    const color = colorProp ?? group?.color ?? 'primary';
    const [focusVisible, setFocusVisible] = useState(false);

    const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onMouseDown?.(event);
    };

    return (
      <SIconButton
        ref={ref}
        type={type}
        variant={variant}
        size={size}
        color={color}
        rounded={rounded}
        disabled={disabled}
        {...props}
        className={mergeClasses(
          iconButtonClasses.root,
          disabled && iconButtonClasses.disabled,
          className,
        )}
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
      </SIconButton>
    );
  },
);

IconButton.displayName = 'IconButton';

export { iconButtonClasses } from './classes';
export { IconButton };
export default IconButton;
