import React, { ChangeEvent, forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { ArrowBottomIcon } from '../../../icons';
import { FormControl } from '../form-control';
import { useFormControlState } from '../form-control/context';
import { InputWrapper } from '../input/input-wrapper';
import { nativeSelectClasses } from './classes';
import {
  SNativeSelectChevron,
  SNativeSelectField,
  SNativeSelectRoot,
} from './styles';
import { TNativeSelectOption, TNativeSelectProps } from './types';

const toOption = (option: string | TNativeSelectOption): TNativeSelectOption =>
  typeof option === 'string' ? { value: option, label: option } : option;

const NativeSelectField = forwardRef<HTMLSelectElement, TNativeSelectProps>(
  (
    {
      options,
      value: valueProp,
      defaultValue,
      onChange,
      placeholder,
      name,
      autoComplete,
      disabled: disabledProp,
      id,
      required,
      actionBar,
    },
    ref,
  ) => {
    const form = useFormControlState({
      disabled: disabledProp,
      id,
      required,
    });
    const items = options.map(toOption);
    const currentValue = String(
      (form.value as string | undefined) ?? valueProp ?? defaultValue ?? '',
    );

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const next = event.target.value;

      onChange?.(event, next);
      form.onChange?.(event, next);
    };

    return (
      <InputWrapper
        variant={form.variant}
        size={form.size}
        color={form.color}
        disabled={form.disabled}
        error={form.error}
        actionBar={actionBar}
      >
        <SNativeSelectRoot>
          <SNativeSelectField
            ref={ref}
            className={nativeSelectClasses.field}
            fieldSize={form.size}
            id={id ?? form.id}
            name={name}
            autoComplete={autoComplete}
            disabled={form.disabled}
            required={form.required}
            aria-invalid={form.error || undefined}
            aria-describedby={form.helperId}
            value={currentValue}
            onChange={handleChange}
            onFocus={() => form.setFocused?.(true)}
            onBlur={() => form.setFocused?.(false)}
          >
            {placeholder != null ? (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            ) : null}
            {items.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </SNativeSelectField>
          <SNativeSelectChevron aria-hidden>
            <ArrowBottomIcon width="1em" height="1em" />
          </SNativeSelectChevron>
        </SNativeSelectRoot>
      </InputWrapper>
    );
  },
);

NativeSelectField.displayName = 'NativeSelectField';

const NativeSelect = forwardRef<HTMLSelectElement, TNativeSelectProps>(
  (
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
      className,
      value,
      defaultValue,
      onChange,
      disabled,
      id,
      ...props
    },
    ref,
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
        onChange={onChange}
        className={mergeClasses(
          nativeSelectClasses.root,
          disabled && nativeSelectClasses.disabled,
          error && nativeSelectClasses.error,
          required && nativeSelectClasses.required,
          className,
        )}
      >
        <NativeSelectField
          ref={ref}
          {...props}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          id={id}
          required={required}
        />
      </FormControl>
    );
  },
);

NativeSelect.displayName = 'NativeSelect';

export type { TNativeSelectProps, TNativeSelectOption, TNativeSelectChangeHandler } from './types';
export { nativeSelectClasses } from './classes';
export { NativeSelect };
export default NativeSelect;
