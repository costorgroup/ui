import React, { forwardRef, useContext } from 'react';
import { ButtonGroupContext } from '../button-group/context';
import { InputGroupContext } from '../input-group/context';
import { SButton } from './styles';
import { TButtonProps } from './types';

const Button = forwardRef<HTMLButtonElement, TButtonProps>(
  (
    {
      children,
      variant: variantProp,
      size = 'md',
      color: colorProp,
      ...props
    },
    ref,
  ) => {
    const buttonGroup = useContext(ButtonGroupContext);
    const inputGroup = useContext(InputGroupContext);
    const group = buttonGroup ?? inputGroup;

    const variant = variantProp ?? group?.variant ?? 'solid';
    const color = colorProp ?? group?.color ?? 'primary';

    return (
      <SButton ref={ref} variant={variant} size={size} color={color} {...props}>
        {children}
      </SButton>
    );
  },
);

Button.displayName = 'Button';

export type { TButtonProps, TButtonVariant, TButtonSize } from './types';
export { Button };
export default Button;
