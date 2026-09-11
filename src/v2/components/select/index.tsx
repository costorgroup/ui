import React, { ReactElement, Ref, forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { selectClasses } from './classes';
import { FormControl } from '../form-control';
import type { TFormControlChangeHandler } from '../form-control/types';
import { InputSelect } from '../input/input-select';
import { TSelectProps } from './types';

const SelectInner = <T,>(
  {
    label,
    description,
    helperText,
    required,
    error = false,
    fullWidth = true,
    size = 'md',
    variant = 'surface',
    color = 'primary',
    children,
    className,
    value,
    defaultValue,
    onChange,
    isValueEqual,
    disabled,
    id,
    ...props
  }: TSelectProps<T>,
  ref: Ref<HTMLDivElement>,
) => {
  return (
    <FormControl
      label={label}
      description={description}
      helperText={helperText}
      required={required}
      error={error}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      color={color}
      disabled={disabled}
      id={id}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange as TFormControlChangeHandler<T | T[]> | undefined}
      isValueEqual={isValueEqual as ((a: T | T[], b: T | T[]) => boolean) | undefined}
      className={mergeClasses(
        selectClasses.root,
        error && selectClasses.error,
        required && selectClasses.required,
        className,
      )}
    >
      <InputSelect ref={ref} {...props}>
        {children}
      </InputSelect>
    </FormControl>
  );
};

const Select = forwardRef(SelectInner) as <T = unknown>(
  props: TSelectProps<T> & { ref?: Ref<HTMLDivElement> },
) => ReactElement | null;

(Select as { displayName?: string }).displayName = 'Select';

export type { TSelectProps };
export { selectClasses } from './classes';
export { Select };
export default Select;
