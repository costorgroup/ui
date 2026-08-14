import React, { forwardRef, useId } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { rangeFieldClasses } from './classes';
import { InputFieldLayout } from '../input/input-base';
import { InputHelperText } from '../input/input-helper-text';
import { Text } from '../text';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { InputLabel } from '../input/input-label';
import { InputRangeField } from '../input/input-range-field';
import { TRangeFieldProps } from './types';

const RangeField = forwardRef<HTMLDivElement, TRangeFieldProps>(
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
      id,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const tone = error ? 'error' : color;

    return (
      <InputFieldLayout
        ref={ref}
        fullWidth={fullWidth}
        label={
          label != null ? (
            <InputLabel htmlFor={fieldId} required={required} size={size}>
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
        <InputRangeField
          id={fieldId}
          size={size}
          variant={variant}
          color={tone}
          aria-invalid={error || undefined}
          {...props}
        className={mergeClasses(
          rangeFieldClasses.root,
          error && rangeFieldClasses.error,
          required && rangeFieldClasses.required,
          className,
        )}
        />
      </InputFieldLayout>
    );
  },
);

RangeField.displayName = 'RangeField';

export type { TRangeFieldProps } from './types';
export { rangeFieldClasses } from './classes';
export { RangeField };
export default RangeField;
