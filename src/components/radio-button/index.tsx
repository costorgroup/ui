import React, { ChangeEvent, forwardRef, useContext, useId } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { radioButtonClasses } from './classes';
import { InputFieldLayout } from '../input/input-base';
import { InputHelperText } from '../input/input-helper-text';
import { Text } from '../text';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { InputLabel } from '../input/input-label';
import { InputRadioButton } from '../input/input-radio-button';
import { RadioButtonGroupContext } from '../radio-button-group/context';
import { TRadioButtonProps } from './types';

const RadioButton = forwardRef<HTMLInputElement, TRadioButtonProps>(
  (
    {
      label,
      description,
      helperText,
      error,
      fullWidth = true,
      direction = 'ltr',
      size,
      variant,
      color,
      id,
      name,
      checked,
      disabled,
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const group = useContext(RadioButtonGroupContext);
    const generatedId = useId();
    const fieldId = id ?? generatedId;

    const resolvedSize = size ?? group?.size ?? 'md';
    const resolvedVariant = variant ?? group?.variant ?? 'subtle';
    const resolvedColor = color ?? group?.color ?? 'primary';
    const resolvedError = error ?? group?.error ?? false;
    const resolvedDisabled = disabled ?? group?.disabled;
    const tone = resolvedError ? 'error' : resolvedColor;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      group?.onChange(event);
    };

    return (
      <InputFieldLayout
        fullWidth={fullWidth}
        direction={direction}
        align="flex-start"
        label={
          label != null ? (
            <InputLabel
              htmlFor={fieldId}
              size={resolvedSize}
              style={{ lineHeight: 1 }}
            >
              {label}
            </InputLabel>
          ) : null
        }
        description={
          description != null ? (
            <Text size={inputDescriptionTextSize[resolvedSize]} color="default">{description}</Text>
          ) : null
        }
        helperText={
          helperText != null ? (
            <InputHelperText size={resolvedSize} color={tone}>
              {helperText}
            </InputHelperText>
          ) : null
        }
      >
        <InputRadioButton
          ref={ref}
          id={fieldId}
          {...props}
          name={name ?? group?.name}
          size={resolvedSize}
          variant={resolvedVariant}
          color={tone}
          checked={
            group != null
              ? String(group.value) === String(props.value)
              : checked
          }
          disabled={resolvedDisabled}
          aria-invalid={resolvedError || undefined}
          onChange={handleChange}
        
        className={mergeClasses(
          radioButtonClasses.root,
          checked && radioButtonClasses.checked,
          disabled && radioButtonClasses.disabled,
          error && radioButtonClasses.error,
          className,
        )}
      />
      </InputFieldLayout>
    );
  },
);

RadioButton.displayName = 'RadioButton';

export type { TRadioButtonProps, TRadioButtonDirection } from './types';
export { radioButtonClasses } from './classes';
export { RadioButton };
export default RadioButton;
