import React, { ChangeEvent, forwardRef, useId, useState } from 'react';
import { InputFieldLayout } from '../input/input-base';
import { InputBase } from '../input/input-base';
import { InputHelperText } from '../input/input-helper-text';
import { Text } from '../text';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { InputLabel } from '../input/input-label';
import { RadioButtonGroupContext } from './context';
import { TRadioButtonGroupProps } from './types';

const RadioButtonGroup = forwardRef<HTMLDivElement, TRadioButtonGroupProps>(
  (
    {
      children,
      label,
      description,
      helperText,
      name,
      value,
      defaultValue = '',
      onChange,
      error = false,
      fullWidth = true,
      direction = 'vertical',
      size = 'md',
      variant = 'subtle',
      color = 'primary',
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedName = useId();
    const groupName = name ?? generatedName;
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const currentValue = isControlled ? value : uncontrolledValue;
    const tone = error ? 'error' : color;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(event.target.value);
      }
      onChange?.(event);
    };

    return (
      <RadioButtonGroupContext.Provider
        value={{
          name: groupName,
          value: currentValue,
          onChange: handleChange,
          size,
          variant,
          color: tone,
          error,
          disabled,
        }}
      >
        <InputFieldLayout
          ref={ref}
          fullWidth={fullWidth}
          direction="vertical"
          label={
            label != null ? <InputLabel size={size}>{label}</InputLabel> : null
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
          {...props}
        >
          <InputBase
            direction={direction}
            fullWidth={fullWidth}
            role="radiogroup"
            aria-invalid={error || undefined}
          >
            {children}
          </InputBase>
        </InputFieldLayout>
      </RadioButtonGroupContext.Provider>
    );
  },
);

RadioButtonGroup.displayName = 'RadioButtonGroup';

export type { TRadioButtonGroupProps } from './types';
export { RadioButtonGroup };
export default RadioButtonGroup;
