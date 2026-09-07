import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useButtonGroupContext } from '../button-group/context';
import { iconButtonClasses } from './classes';
import { SIconButton } from './styles';
import { TIconButtonProps } from './types';

const IconButton = forwardRef<HTMLButtonElement, TIconButtonProps>(
  (
    {
      children,
      variant: variantProp,
      appearance: appearanceProp,
      size: sizeProp,
      color: colorProp,
      rounded = false,
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
      <SIconButton
        ref={ref}
        type="button"
        variant={variant}
        appearance={appearance}
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
      >
        {children}
      </SIconButton>
    );
  },
);

IconButton.displayName = 'IconButton';

export type {
  TIconButtonProps,
  TIconButtonVariant,
  TIconButtonAppearance,
  TIconButtonSize,
} from './types';
export { iconButtonClasses } from './classes';
export { IconButton };
export default IconButton;
