import React, {
  ReactElement,
  ReactNode,
  Ref,
  forwardRef,
  useId,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { mergeSlotProps } from '../../helpers/slot-props';
import { radioButtonGroupClasses } from './classes';
import { FormControl, useFormControl } from '../form-control';
import { InputBase } from '../input/input-base';
import type { TInputBaseProps } from '../input/input-base/types';
import { RadioButtonGroupContext } from './context';
import { TRadioButtonGroupProps } from './types';
import { defaultIsValueEqual } from '../form-control/value';

const RadioButtonGroupBody = ({
  name,
  direction,
  fullWidth,
  children,
  groupProps,
}: {
  name?: string;
  direction: 'vertical' | 'horizontal';
  fullWidth: boolean;
  children?: ReactNode;
  groupProps?: Partial<TInputBaseProps>;
}) => {
  const form = useFormControl();
  const generatedName = useId();
  const groupName = name ?? generatedName;

  return (
    <RadioButtonGroupContext.Provider
      value={{
        name: groupName,
        value: form?.value,
        onSelect: form?.onChange ?? (() => undefined),
        isValueEqual: form?.isValueEqual ?? defaultIsValueEqual,
        size: form?.size,
        variant: form?.variant,
        color: form?.color,
        error: form?.error,
        disabled: form?.disabled,
      }}
    >
      <InputBase
        {...mergeSlotProps(
          {
            direction,
            fullWidth,
            role: 'radiogroup',
            'aria-invalid': form?.error || undefined,
          },
          groupProps,
        )}
      >
        {children}
      </InputBase>
    </RadioButtonGroupContext.Provider>
  );
};

const RadioButtonGroupInner = <T,>(
  {
    children,
    label,
    description,
    helperText,
    name,
    value,
    defaultValue,
    onChange,
    isValueEqual,
    error = false,
    fullWidth = true,
    direction = 'vertical',
    size = 'md',
    variant = 'surface',
    color = 'primary',
    disabled,
    className,
    slotProps,
    ...props
  }: TRadioButtonGroupProps<T>,
  ref: Ref<HTMLDivElement>,
) => {
  return (
    <FormControl
      {...slotProps?.root}
      ref={ref}
      label={label}
      description={description}
      helperText={helperText}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      isValueEqual={isValueEqual}
      error={error}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      color={color}
      disabled={disabled}
      {...props}
      className={mergeClasses(
        radioButtonGroupClasses.root,
        disabled && radioButtonGroupClasses.disabled,
        error && radioButtonGroupClasses.error,
        slotProps?.root?.className,
        className,
      )}
      slotProps={slotProps}
    >
      <RadioButtonGroupBody
        name={name}
        direction={direction}
        fullWidth={fullWidth}
        groupProps={slotProps?.group}
      >
        {children}
      </RadioButtonGroupBody>
    </FormControl>
  );
};

const RadioButtonGroup = forwardRef(RadioButtonGroupInner) as <T = unknown>(
  props: TRadioButtonGroupProps<T> & { ref?: Ref<HTMLDivElement> },
) => ReactElement | null;

(RadioButtonGroup as { displayName?: string }).displayName = 'RadioButtonGroup';

export type {
  TRadioButtonGroupProps,
  TRadioButtonGroupSlotProps,
} from './types';
export { radioButtonGroupClasses } from './classes';
export { RadioButtonGroup };
export default RadioButtonGroup;
