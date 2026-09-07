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
import { SActionFieldBar } from './styles';
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
      variant = 'subtle',
      color = 'default',
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
    const hasActions = children != null;

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
          stacked
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
          {hasActions ? (
            <SActionFieldBar
              size={size}
              className={actionFieldClasses.actions}
            >
              {children}
            </SActionFieldBar>
          ) : null}
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
