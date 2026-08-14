import React, { forwardRef, useId } from 'react';
import { InputFieldLayout } from '../input/input-base';
import { InputHelperText } from '../input/input-helper-text';
import { Text } from '../text';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { InputLabel } from '../input/input-label';
import { InputSwitch } from '../input/input-switch';
import { TSwitchProps } from './types';

const Switch = forwardRef<HTMLInputElement, TSwitchProps>(
  (
    {
      label,
      description,
      helperText,
      error = false,
      fullWidth = true,
      direction = 'ltr',
      size = 'md',
      variant = 'subtle',
      color = 'primary',
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const tone = error ? 'error' : color;

    return (
      <InputFieldLayout
        fullWidth={fullWidth}
        direction={direction}
        align="flex-start"
        label={
          label != null ? (
            <InputLabel htmlFor={fieldId} size={size} style={{ lineHeight: 1 }}>
              {label}
            </InputLabel>
          ) : null
        }
        description={
          description != null ? (
            <Text size={inputDescriptionTextSize[size]} color="default">{description}</Text>
          ) : null
        }
        helperText={
          helperText != null ? (
            <InputHelperText size={size} color={tone}>
              {helperText}
            </InputHelperText>
          ) : null
        }
      >
        <InputSwitch
          ref={ref}
          id={fieldId}
          size={size}
          variant={variant}
          color={tone}
          aria-invalid={error || undefined}
          {...props}
        />
      </InputFieldLayout>
    );
  },
);

Switch.displayName = 'Switch';

export type { TSwitchProps, TSwitchDirection } from './types';
export { Switch };
export default Switch;
