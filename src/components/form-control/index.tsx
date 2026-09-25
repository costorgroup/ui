import React, {
  ReactElement,
  Ref,
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { mergeSlotProps } from '../../helpers/slot-props';
import { InputFieldLayout } from '../input/input-base';
import { InputHelperText } from '../input/input-helper-text';
import { InputLabel } from '../input/input-label';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { Text } from '../text';
import { formControlClasses } from './classes';
import {
  FormControlContext,
  TFormControlContextValue,
} from './context';
import { TFormControlProps } from './types';
import { defaultIsValueEqual, isFilledValue } from './value';

const FormControlInner = <T,>(
  {
    children,
    label,
    description,
    helperText,
    direction = 'vertical',
    value,
    defaultValue,
    onChange,
    isValueEqual = defaultIsValueEqual,
    error = false,
    disabled = false,
    required = false,
    focused: focusedProp,
    fullWidth = true,
    size = 'md',
    color = 'primary',
    variant = 'surface',
    id: idProp,
    className,
    slotProps,
    ...props
  }: TFormControlProps<T>,
  ref: Ref<HTMLDivElement>,
) => {
  const reactId = useId();
  const id = idProp ?? reactId;
  const labelId = `${id}-label`;
  const helperId = `${id}-helper`;
  const isValueControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = isValueControlled ? value : uncontrolledValue;
  const isFocusedControlled = focusedProp !== undefined;
  const [uncontrolledFocused, setUncontrolledFocused] = useState(false);
  const focused = isFocusedControlled ? Boolean(focusedProp) : uncontrolledFocused;

  const setFocused = useCallback(
    (next: boolean) => {
      if (!isFocusedControlled) {
        setUncontrolledFocused(next);
      }
    },
    [isFocusedControlled],
  );

  const handleChange = useCallback(
    (event: unknown, next: T) => {
      if (!isValueControlled) {
        setUncontrolledValue(next);
      }

      onChange?.(event, next);
    },
    [isValueControlled, onChange],
  );

  const contextValue = useMemo<TFormControlContextValue<T>>(
    () => ({
      error,
      disabled,
      required,
      focused,
      filled: isFilledValue(currentValue),
      fullWidth,
      size,
      color,
      variant,
      id,
      labelId,
      helperId,
      value: currentValue,
      setFocused,
      onChange: handleChange,
      isValueEqual,
    }),
    [
      color,
      currentValue,
      disabled,
      error,
      focused,
      fullWidth,
      handleChange,
      helperId,
      id,
      isValueEqual,
      labelId,
      required,
      setFocused,
      size,
      variant,
    ],
  );

  return (
    <FormControlContext.Provider
      value={contextValue as TFormControlContextValue}
    >
      <InputFieldLayout
        ref={ref}
        direction={direction}
        fullWidth={fullWidth}
        label={
          label != null ? (
            <InputLabel
              {...mergeSlotProps(
                {
                  id: labelId,
                  htmlFor: id,
                  required,
                  disabled,
                  size,
                  style:
                    direction !== 'vertical' ? { lineHeight: 1 } : undefined,
                },
                slotProps?.label,
              )}
            >
              {label}
            </InputLabel>
          ) : null
        }
        description={
          description != null ? (
            <Text
              {...mergeSlotProps(
                { size: inputDescriptionTextSize[size] },
                slotProps?.description,
              )}
            >
              {description}
            </Text>
          ) : null
        }
        helperText={
          helperText != null ? (
            <InputHelperText
              {...mergeSlotProps(
                { id: helperId, size, error },
                slotProps?.helperText,
              )}
            >
              {helperText}
            </InputHelperText>
          ) : null
        }
        {...props}
        className={mergeClasses(
          formControlClasses.root,
          disabled && formControlClasses.disabled,
          error && formControlClasses.error,
          required && formControlClasses.required,
          focused && formControlClasses.focused,
          isFilledValue(currentValue) && formControlClasses.filled,
          fullWidth && formControlClasses.fullWidth,
          className,
        )}
      >
        {children}
      </InputFieldLayout>
    </FormControlContext.Provider>
  );
};

const FormControl = forwardRef(FormControlInner) as <T = unknown>(
  props: TFormControlProps<T> & { ref?: Ref<HTMLDivElement> },
) => ReactElement | null;

(FormControl as { displayName?: string }).displayName = 'FormControl';

export type {
  TFormControlProps,
  TFormControlChangeHandler,
  TFormControlSlotProps,
  TFieldSlotProps,
} from './types';
export type { TFormControlContextValue } from './context';
export { formControlClasses } from './classes';
export { FormControlContext, useFormControl, useFormControlState } from './context';
export {
  defaultIsValueEqual,
  isFilledValue,
  isValueSelected,
  toggleSelectedValue,
  toHtmlValue,
} from './value';
export { FormControl };
export default FormControl;
