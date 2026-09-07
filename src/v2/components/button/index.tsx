import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useButtonGroupContext } from '../button-group/context';
import { buttonClasses } from './classes';
import { SButton } from './styles';
import { TButtonProps } from './types';

const Button = forwardRef<HTMLButtonElement, TButtonProps>(
  (
    {
      children,
      variant: variantProp,
      appearance: appearanceProp,
      size: sizeProp,
      color: colorProp,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const group = useButtonGroupContext();
    const variant = variantProp ?? group?.variant ?? 'solid';
    const appearance = appearanceProp ?? group?.appearance ?? 'opaque';
    const color = colorProp ?? group?.color ?? 'default';
    const size = sizeProp ?? group?.size ?? 'md';

    return (
      <SButton
        ref={ref}
        variant={variant}
        appearance={appearance}
        size={size}
        color={color}
        disabled={disabled}
        {...props}
        className={mergeClasses(
          buttonClasses.root,
          disabled && buttonClasses.disabled,
          className,
        )}
      >
        {children}
      </SButton>
    );
  },
);

Button.displayName = 'Button';

export type { TButtonProps, TButtonVariant, TButtonAppearance, TButtonSize } from './types';
export { buttonClasses } from './classes';
export { Button };
export default Button;
