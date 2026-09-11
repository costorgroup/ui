import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { InputFieldLayout } from '../input/input-base';
import { InputLabel } from '../input/input-label';
import { InputWrapper } from '../input/input-wrapper';
import { InputTextAreaField } from '../input/input-text-area-field';
import { InputHelperText } from '../input/input-helper-text';
import { Text } from '../text';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { actionFieldClasses } from './classes';
import { TActionFieldProps } from './types';

const ActionField = forwardRef<HTMLDivElement, TActionFieldProps>(
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
      children,
      id,
      className,
      disabled,
      readOnly,
      autoGrow = true,
      rows = 1,
      ...props
    },
    ref,
  ) => {
    const tone = error ? 'error' : color;

    return (
      <InputFieldLayout
        ref={ref}
        fullWidth={fullWidth}
        className={mergeClasses(
          actionFieldClasses.root,
          disabled && actionFieldClasses.disabled,
          error && actionFieldClasses.error,
          required && actionFieldClasses.required,
          className,
        )}
        label={
          label != null ? (
            <InputLabel
              htmlFor={id}
              required={required}
              error={error}
              disabled={disabled}
              size={size}
            >
              {label}
            </InputLabel>
          ) : null
        }
        description={
          description != null ? (
            <Text size={inputDescriptionTextSize[size]}>{description}</Text>
          ) : null
        }
        helperText={
          helperText != null ? (
            <InputHelperText size={size} error={error}>
              {helperText}
            </InputHelperText>
          ) : null
        }
      >
        <InputWrapper
          size={size}
          variant={variant}
          color={tone}
          error={error}
          disabled={disabled}
          readOnly={readOnly}
          actionBar={
            children != null ? (
              <div className={actionFieldClasses.actions}>{children}</div>
            ) : undefined
          }
        >
          <InputTextAreaField
            id={id}
            aria-invalid={error || undefined}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            autoGrow={autoGrow}
            rows={rows}
            {...props}
          />
        </InputWrapper>
      </InputFieldLayout>
    );
  },
);

ActionField.displayName = 'ActionField';

export type { TActionFieldProps } from './types';
export { actionFieldClasses } from './classes';
export { ActionField };
export default ActionField;
