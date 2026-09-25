import React, {
  ChangeEvent,
  FocusEvent,
  ReactElement,
  Ref,
  forwardRef,
} from 'react';
import {
  isAriaInvalid,
  mergeClasses,
} from '../../../helpers/generate-utility-classes';
import { useFormControlState } from '../../form-control/context';
import { toHtmlValue } from '../../form-control/value';
import { inputRadioButtonClasses } from './classes';
import {
  SInputRadioButton,
  SInputRadioButtonControl,
  SInputRadioButtonDot,
  SInputRadioButtonInput,
} from './styles';
import { TInputRadioButtonProps } from './types';
import { mergeSlotProps } from '../../../helpers/slot-props';

const InputRadioButtonInner = <T,>(
  {
    variant: variantProp,
    size: sizeProp,
    color: colorProp,
    className,
    disabled: disabledProp,
    checked,
    defaultChecked,
    id,
    value,
    required: requiredProp,
    onChange,
    onFocus,
    onBlur,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedBy,
    slotProps,
    ...props
  }: TInputRadioButtonProps<T>,
  ref: Ref<HTMLInputElement>,
) => {
  const form = useFormControlState({
    variant: variantProp,
    size: sizeProp,
    color: colorProp,
    disabled: disabledProp,
    required: requiredProp,
    id,
  });
  const error = isAriaInvalid(ariaInvalid) || form.error;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    form.onChange?.(event, value as T);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    form.setFocused?.(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    form.setFocused?.(false);
    onBlur?.(event);
  };

  return (
    <SInputRadioButton
      {...mergeSlotProps(
        {
          className: mergeClasses(
            inputRadioButtonClasses.root,
            form.disabled && inputRadioButtonClasses.disabled,
            (checked ?? defaultChecked) && inputRadioButtonClasses.checked,
            error && inputRadioButtonClasses.error,
            className,
          ),
        },
        slotProps?.container,
      )}
    >
      <SInputRadioButtonInput
        ref={ref}
        {...props}
        id={id ?? form.id}
        type="radio"
        value={toHtmlValue(value)}
        disabled={form.disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        required={form.required}
        aria-invalid={error || undefined}
        aria-describedby={ariaDescribedBy ?? form.helperId}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={inputRadioButtonClasses.input}
      />
      <SInputRadioButtonControl
        {...mergeSlotProps(
          {
            className: inputRadioButtonClasses.control,
            variant: form.variant,
            size: form.size,
            color: form.color,
          },
          slotProps?.control,
        )}
      >
        <SInputRadioButtonDot
          {...mergeSlotProps(
            {
              className: inputRadioButtonClasses.dot,
              'aria-hidden': true,
            },
            slotProps?.dot,
          )}
        />
      </SInputRadioButtonControl>
    </SInputRadioButton>
  );
};

const InputRadioButton = forwardRef(InputRadioButtonInner) as <T = unknown>(
  props: TInputRadioButtonProps<T> & { ref?: Ref<HTMLInputElement> },
) => ReactElement | null;

(InputRadioButton as { displayName?: string }).displayName = 'InputRadioButton';

export type { TInputRadioButtonSlotProps } from './types';
export { inputRadioButtonClasses } from './classes';
export { InputRadioButton };
export default InputRadioButton;
