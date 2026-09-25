import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { mergeSlotProps } from '../../helpers/slot-props';
import { FormControl } from '../form-control';
import { InputWrapper } from '../input/input-wrapper';
import { InputTextAreaField } from '../input/input-text-area-field';
import { textAreaClasses } from './classes';
import { TTextAreaProps, TTextAreaSlotProps } from './types';

const TextArea = forwardRef<HTMLDivElement, TTextAreaProps>(
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
      id,
      className,
      disabled,
      readOnly,
      actionBar,
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
          textAreaClasses.root,
          disabled && textAreaClasses.disabled,
          error && textAreaClasses.error,
          required && textAreaClasses.required,
          slotProps?.root?.className,
          className,
        )}
        slotProps={slotProps}
      >
        <InputWrapper
          {...mergeSlotProps({ readOnly, actionBar }, slotProps?.wrapper)}
        >
          <InputTextAreaField
            {...mergeSlotProps(
              { disabled, readOnly, ...props },
              slotProps?.input,
            )}
          />
        </InputWrapper>
      </FormControl>
    );
  },
);

TextArea.displayName = 'TextArea';

export type { TTextAreaProps, TTextAreaSlotProps };
export { textAreaClasses } from './classes';
export { TextArea };
export default TextArea;
