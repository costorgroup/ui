import React, {
  ChangeEvent,
  ReactElement,
  Ref,
  forwardRef,
  useContext,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { radioButtonClasses } from './classes';
import { FormControl } from '../form-control';
import { InputRadioButton } from '../input/input-radio-button';
import {
  RadioButtonGroupContext,
  TRadioButtonGroupContextValue,
} from '../radio-button-group/context';
import { isValueSelected } from '../form-control/value';
import { TRadioButtonProps } from './types';

const RadioButtonInner = <T,>(
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
    value,
    ...props
  }: TRadioButtonProps<T>,
  ref: Ref<HTMLInputElement>,
) => {
  const group = useContext(RadioButtonGroupContext) as TRadioButtonGroupContextValue<T> | null;
  const resolvedSize = size ?? group?.size ?? 'md';
  const resolvedVariant = variant ?? group?.variant ?? 'surface';
  const resolvedColor = color ?? group?.color ?? 'primary';
  const resolvedError = error ?? group?.error ?? false;
  const resolvedDisabled = disabled ?? group?.disabled;
  const selected =
    group != null
      ? isValueSelected(
          group.value as T,
          value as T,
          group.isValueEqual,
        )
      : Boolean(checked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    if (value !== undefined) {
      group?.onSelect(event, value);
    }
  };

  return (
    <FormControl
      label={label}
      description={description}
      helperText={helperText}
      error={resolvedError}
      fullWidth={fullWidth}
      direction={direction}
      size={resolvedSize}
      variant={resolvedVariant}
      color={resolvedColor}
      disabled={resolvedDisabled}
      id={id}
      className={mergeClasses(
        radioButtonClasses.root,
        selected && radioButtonClasses.checked,
        resolvedDisabled && radioButtonClasses.disabled,
        resolvedError && radioButtonClasses.error,
        className,
      )}
    >
      <InputRadioButton
        ref={ref}
        {...props}
        name={name ?? group?.name}
        value={value}
        checked={group != null ? selected : checked}
        onChange={handleChange}
      />
    </FormControl>
  );
};

const RadioButton = forwardRef(RadioButtonInner) as <T = unknown>(
  props: TRadioButtonProps<T> & { ref?: Ref<HTMLInputElement> },
) => ReactElement | null;

(RadioButton as { displayName?: string }).displayName = 'RadioButton';

export type { TRadioButtonProps, TRadioButtonDirection } from './types';
export { radioButtonClasses } from './classes';
export { RadioButton };
export default RadioButton;
