import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { useButtonGroupContext } from '../button-group/context';
import { buttonClasses } from './classes';
import { SButton } from './styles';
import { TButtonOwnProps, TButtonProps } from './types';

const Button = forwardRef(function Button<C extends ElementType = 'button'>(
  {
    as,
    children,
    variant: variantProp,
    appearance: appearanceProp,
    size: sizeProp,
    color: colorProp,
    radius = 'sm',
    fullWidth = false,
    forceContrastText = false,
    className,
    disabled: disabledProp,
    ...props
  }: TButtonProps<C>,
  ref: React.Ref<Element>,
) {
  const group = useButtonGroupContext();
  const variant = variantProp ?? group?.variant ?? 'solid';
  const appearance = appearanceProp ?? group?.appearance ?? 'opaque';
  const color = colorProp ?? group?.color ?? 'default';
  const size = sizeProp ?? group?.size ?? 'md';
  const disabled = disabledProp ?? group?.disabled ?? false;
  const tag = as ?? 'button';

  return (
    <SButton
      as={tag}
      ref={ref as React.Ref<HTMLButtonElement>}
      variant={variant}
      appearance={appearance}
      size={size}
      color={color}
      radius={radius}
      fullWidth={fullWidth}
      forceContrastText={forceContrastText}
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
}) as TPolymorphicComponent<'button', TButtonOwnProps>;

Button.displayName = 'Button';

export type {
  TButtonProps,
  TButtonOwnProps,
  TButtonVariant,
  TButtonAppearance,
  TButtonSize,
  TButtonRadius,
} from './types';
export { buttonClasses } from './classes';
export { Button };
export default Button;
