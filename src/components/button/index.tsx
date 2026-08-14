import React, { forwardRef, useContext, useState } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { ButtonGroupContext } from '../button-group/context';
import { InputGroupContext } from '../input-group/context';
import { buttonClasses } from './classes';
import { SButton } from './styles';
import { TButtonProps } from './types';

const Button = forwardRef<HTMLButtonElement, TButtonProps>(
  (
    {
      children,
      variant: variantProp,
      size = 'md',
      color: colorProp,
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

    return (
      <SButton
        ref={ref}
        variant={variant}
        size={size}
        color={color}
        disabled={disabled}
        {...props}
        className={mergeClasses(
          buttonClasses.root,
          disabled && buttonClasses.disabled,
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
      >
        {children}
      </SButton>
    );
  },
);

Button.displayName = 'Button';

export type { TButtonProps, TButtonVariant, TButtonSize } from './types';
export { buttonClasses } from './classes';
export { Button };
export default Button;
