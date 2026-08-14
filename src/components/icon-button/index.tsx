import React, { forwardRef, MouseEvent, useContext } from 'react';
import { ButtonGroupContext } from '../button-group/context';
import { InputGroupContext } from '../input-group/context';
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
      ...props
    },
    ref,
  ) => {
    const buttonGroup = useContext(ButtonGroupContext);
    const inputGroup = useContext(InputGroupContext);
    const group = buttonGroup ?? inputGroup;

    const variant = variantProp ?? group?.variant ?? 'solid';
    const color = colorProp ?? group?.color ?? 'primary';

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
        {...props}
        onMouseDown={handleMouseDown}
      >
        {children}
      </SIconButton>
    );
  },
);

IconButton.displayName = 'IconButton';

export { IconButton };
export default IconButton;
