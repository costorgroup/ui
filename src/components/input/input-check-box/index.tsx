import React, { ChangeEvent, FocusEvent, forwardRef } from 'react';
import {
  isAriaInvalid,
  mergeClasses,
} from '../../../helpers/generate-utility-classes';
import { CheckIcon } from '../../../icons';
import { useFormControlState } from '../../form-control/context';
import { inputCheckBoxClasses } from './classes';
import {
  SInputCheckBox,
  SInputCheckBoxControl,
  SInputCheckBoxInput,
} from './styles';
import { TInputCheckBoxProps } from './types';

const InputCheckBox = forwardRef<HTMLInputElement, TInputCheckBoxProps>(
  (
    {
      variant: variantProp,
      size: sizeProp,
      color: colorProp,
      className,
      disabled: disabledProp,
      checked,
      defaultChecked,
      id,
      required: requiredProp,
      onChange,
      onFocus,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref,
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
      form.onChange?.(event, event.target.checked);
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      form.setFocused?.(true);
      onFocus?.(event);
    };

    const handleBlur = () => {
      form.setFocused?.(false);
    };

    return (
      <SInputCheckBox
        className={mergeClasses(
          inputCheckBoxClasses.root,
          form.disabled && inputCheckBoxClasses.disabled,
          (checked ?? defaultChecked) && inputCheckBoxClasses.checked,
          error && inputCheckBoxClasses.error,
          className,
        )}
      >
        <SInputCheckBoxInput
          ref={ref}
          {...props}
          id={id ?? form.id}
          type="checkbox"
          disabled={form.disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          required={form.required}
          aria-invalid={error || undefined}
          aria-describedby={ariaDescribedBy ?? form.helperId}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputCheckBoxClasses.input}
        />
        <SInputCheckBoxControl
          className={inputCheckBoxClasses.control}
          variant={form.variant}
          size={form.size}
          color={form.color}
        >
          <CheckIcon aria-hidden />
        </SInputCheckBoxControl>
      </SInputCheckBox>
    );
  },
);

InputCheckBox.displayName = 'InputCheckBox';

export { inputCheckBoxClasses } from './classes';
export { InputCheckBox };
export default InputCheckBox;
