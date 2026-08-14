import React, { forwardRef, useId } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { checkBoxClasses } from './classes';
import { InputFieldLayout } from '../input/input-base';
import { InputCheckBox } from '../input/input-check-box';
import { InputHelperText } from '../input/input-helper-text';
import { Text } from '../text';
import { inputDescriptionTextSize } from '../input/input-description-text-size';
import { InputLabel } from '../input/input-label';
import { TCheckBoxProps } from './types';

const CheckBox = forwardRef<HTMLInputElement, TCheckBoxProps>(
  (
    {
      label,
      description,
      helperText,
      error = false,
      fullWidth = true,
      direction = 'ltr',
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
        fullWidth={fullWidth}
        direction={direction}
        align="flex-start"
        label={
          label != null ? (
            <InputLabel htmlFor={fieldId} size={size} style={{ lineHeight: 1 }}>
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
        <InputCheckBox
          ref={ref}
          id={fieldId}
          size={size}
          variant={variant}
          color={tone}
          aria-invalid={error || undefined}
          {...props}
        className={mergeClasses(
          checkBoxClasses.root,
          error && checkBoxClasses.error,
          className,
        )}
        />
      </InputFieldLayout>
    );
  },
);

CheckBox.displayName = 'CheckBox';

export type { TCheckBoxProps, TCheckBoxDirection } from './types';
export { checkBoxClasses } from './classes';
export { CheckBox };
export default CheckBox;
