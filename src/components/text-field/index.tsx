import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { mergeSlotProps } from '../../helpers/slot-props';
import { FormControl } from '../form-control';
import { InputWrapper } from '../input/input-wrapper';
import { InputTextField } from '../input/input-text-field';
import { InputIcon } from '../input/input-icon';
import { textFieldClasses } from './classes';
import { TTextFieldProps, TTextFieldSlotProps } from './types';

const TextField = forwardRef<HTMLDivElement, TTextFieldProps>(
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
      startIcon,
      endIcon,
      actionBar,
      id,
      className,
      disabled,
      readOnly,
      slotProps,
      ...props
    },
    ref,
  ) => {
    return (
      <FormControl
        {...slotProps?.root}
        ref={ref}
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
        className={mergeClasses(
          textFieldClasses.root,
          disabled && textFieldClasses.disabled,
          error && textFieldClasses.error,
          required && textFieldClasses.required,
          slotProps?.root?.className,
          className,
        )}
        slotProps={slotProps}
      >
        <InputWrapper
          {...mergeSlotProps({ readOnly, actionBar }, slotProps?.wrapper)}
        >
          {startIcon != null ? (
            <InputIcon {...slotProps?.startIcon}>{startIcon}</InputIcon>
          ) : null}
          <InputTextField
            {...mergeSlotProps(
              { disabled, readOnly, ...props },
              slotProps?.input,
            )}
          />
          {endIcon != null ? (
            <InputIcon {...slotProps?.endIcon}>{endIcon}</InputIcon>
          ) : null}
        </InputWrapper>
      </FormControl>
    );
  },
);

TextField.displayName = 'TextField';

export type { TTextFieldProps, TTextFieldSlotProps };
export { textFieldClasses } from './classes';
export { TextField };
export default TextField;
