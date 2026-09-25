import React, { ChangeEvent, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { ArrowBottomIcon } from '../../icons';
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
import { mergeSlotProps } from '../../helpers/slot-props';

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
      slotProps,
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
        {...mergeSlotProps(
          {
            variant: form.variant,
            size: form.size,
            color: form.color,
            disabled: form.disabled,
            error: form.error,
            actionBar,
          },
          slotProps?.wrapper,
        )}
      >
        <SNativeSelectRoot {...slotProps?.container}>
          <SNativeSelectField
            {...mergeSlotProps(
              {
                ref,
                className: nativeSelectClasses.field,
                fieldSize: form.size,
                id: id ?? form.id,
                name,
                autoComplete,
                disabled: form.disabled,
                required: form.required,
                'aria-invalid': form.error || undefined,
                'aria-describedby': form.helperId,
                value: currentValue,
                onChange: handleChange,
                onFocus: () => form.setFocused?.(true),
                onBlur: () => form.setFocused?.(false),
              },
              slotProps?.select,
            )}
          >
            {placeholder != null ? (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            ) : null}
            {items.map((option) => (
              <option
                key={option.value}
                {...mergeSlotProps(
                  {
                    value: option.value,
                    disabled: option.disabled,
                  },
                  slotProps?.option,
                )}
              >
                {option.label}
              </option>
            ))}
          </SNativeSelectField>
          <SNativeSelectChevron
            {...mergeSlotProps(
              {
                'aria-hidden': true,
              },
              slotProps?.chevron,
            )}
          >
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
      options,
      placeholder,
      name,
      autoComplete,
      actionBar,
      slotProps,
      ...props
    },
    ref,
  ) => {
    return (
      <FormControl
        {...slotProps?.root}
        {...props}
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
          slotProps?.root?.className,
          className,
        )}
        slotProps={slotProps}
      >
        <NativeSelectField
          ref={ref}
          options={options}
          placeholder={placeholder}
          name={name}
          autoComplete={autoComplete}
          actionBar={actionBar}
          slotProps={slotProps}
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

export type {
  TNativeSelectProps,
  TNativeSelectSlotProps,
  TNativeSelectOption,
  TNativeSelectChangeHandler,
} from './types';
export { nativeSelectClasses } from './classes';
export { NativeSelect };
export default NativeSelect;
