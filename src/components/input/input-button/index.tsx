import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useFormControlState } from '../../form-control/context';
import type { TButtonSize } from '../../button/types';
import type { TInputSize } from '../input-wrapper/types';
import { inputButtonClasses } from './classes';
import { SInputButton } from './styles';
import { TInputButtonProps } from './types';

const COMPACT_SIZE: Record<TInputSize, TButtonSize> = {
  xs: 'xs',
  sm: 'xs',
  md: 'xs',
  lg: 'sm',
  xl: 'sm',
};

const InputButton = forwardRef<HTMLButtonElement, TInputButtonProps>(
  (
    {
      variant = 'ghost',
      color = 'default',
      radius = 'none',
      size: sizeProp,
      className,
      disabled: disabledProp,
      ...props
    },
    ref,
  ) => {
    const form = useFormControlState({
      disabled: disabledProp,
    });
    const size = sizeProp ?? COMPACT_SIZE[form.size];

    return (
      <SInputButton
        ref={ref}
        variant={variant}
        color={color}
        radius={radius}
        size={size}
        disabled={form.disabled}
        {...props}
        className={mergeClasses(
          inputButtonClasses.root,
          form.disabled && inputButtonClasses.disabled,
          className,
        )}
      />
    );
  },
);

InputButton.displayName = 'InputButton';

export type { TInputButtonProps } from './types';
export { inputButtonClasses } from './classes';
export { InputButton };
export default InputButton;
