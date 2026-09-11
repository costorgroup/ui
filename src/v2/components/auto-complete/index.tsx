import React, { ReactElement, Ref, forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { autoCompleteClasses } from './classes';
import { FormControl } from '../form-control';
import type { TFormControlChangeHandler } from '../form-control/types';
import { InputAutoComplete } from '../input/input-auto-complete';
import { TAutoCompleteProps } from './types';

const AutoCompleteInner = <T,>(
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
  }: TAutoCompleteProps<T>,
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
      isValueEqual={
        isValueEqual as ((a: T | T[], b: T | T[]) => boolean) | undefined
      }
      className={mergeClasses(
        autoCompleteClasses.root,
        error && autoCompleteClasses.error,
        required && autoCompleteClasses.required,
        className,
      )}
    >
      <InputAutoComplete ref={ref} {...props}>
        {children}
      </InputAutoComplete>
    </FormControl>
  );
};

const AutoComplete = forwardRef(AutoCompleteInner) as <T = unknown>(
  props: TAutoCompleteProps<T> & { ref?: Ref<HTMLDivElement> },
) => ReactElement | null;

(AutoComplete as { displayName?: string }).displayName = 'AutoComplete';

export type { TAutoCompleteProps };
export { autoCompleteClasses } from './classes';
export { AutoComplete };
export default AutoComplete;
