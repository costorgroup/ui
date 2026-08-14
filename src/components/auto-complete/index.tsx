import React, { forwardRef } from 'react';
import { InputFieldLayout } from '../input/input-base';
import { InputAutoComplete } from '../input/input-auto-complete';
import { InputHelperText } from '../input/input-helper-text';
import { Text } from '../text';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { InputLabel } from '../input/input-label';
import { TAutoCompleteProps } from './types';

const AutoComplete = forwardRef<HTMLDivElement, TAutoCompleteProps>(
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
      color = 'primary',
      children,
      ...props
    },
    ref,
  ) => {
    const tone = error ? 'error' : color;

    return (
      <InputFieldLayout
        fullWidth={fullWidth}
        label={
          label != null ? (
            <InputLabel required={required} size={size}>
              {label}
            </InputLabel>
          ) : null
        }
        description={
          description != null ? (
            <Text size={inputDescriptionTextSize[size]} color="default">{description}</Text>
          ) : null
        }
        helperText={
          helperText != null ? (
            <InputHelperText size={size} color={tone}>
              {helperText}
            </InputHelperText>
          ) : null
        }
      >
        <InputAutoComplete
          ref={ref}
          size={size}
          variant={variant}
          color={tone}
          aria-invalid={error || undefined}
          {...props}
        >
          {children}
        </InputAutoComplete>
      </InputFieldLayout>
    );
  },
);

AutoComplete.displayName = 'AutoComplete';

export type { TAutoCompleteProps };
export { AutoComplete };
export default AutoComplete;
