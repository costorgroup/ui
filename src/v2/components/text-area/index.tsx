import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { FormControl } from '../form-control';
import { InputWrapper } from '../input/input-wrapper';
import { InputTextAreaField } from '../input/input-text-area-field';
import { textAreaClasses } from './classes';
import { TTextAreaProps } from './types';

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
      ...props
    },
    ref,
  ) => {
    return (
      <FormControl
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
          className,
        )}
      >
        <InputWrapper readOnly={readOnly} actionBar={actionBar}>
          <InputTextAreaField
            disabled={disabled}
            readOnly={readOnly}
            {...props}
          />
        </InputWrapper>
      </FormControl>
    );
  },
);

TextArea.displayName = 'TextArea';

export type { TTextAreaProps };
export { textAreaClasses } from './classes';
export { TextArea };
export default TextArea;
