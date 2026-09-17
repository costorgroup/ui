import React, { ChangeEvent, FocusEvent, forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useFormControlState } from '../../form-control/context';
import { inputSwitchClasses } from './classes';
import {
  SInputSwitch,
  SInputSwitchControl,
  SInputSwitchInput,
  SInputSwitchThumb,
} from './styles';
import { TInputSwitchProps } from './types';

const InputSwitch = forwardRef<HTMLInputElement, TInputSwitchProps>(
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
      <SInputSwitch
        className={mergeClasses(
          inputSwitchClasses.root,
          form.disabled && inputSwitchClasses.disabled,
          (checked ?? defaultChecked) && inputSwitchClasses.checked,
          className,
        )}
      >
        <SInputSwitchInput
          ref={ref}
          {...props}
          id={id ?? form.id}
          type="checkbox"
          role="switch"
          disabled={form.disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          required={form.required}
          aria-invalid={ariaInvalid ?? (form.error || undefined)}
          aria-describedby={ariaDescribedBy ?? form.helperId}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputSwitchClasses.input}
        />
        <SInputSwitchControl
          className={inputSwitchClasses.control}
          variant={form.variant}
          size={form.size}
          color={form.color}
        >
          <SInputSwitchThumb className={inputSwitchClasses.thumb} />
        </SInputSwitchControl>
      </SInputSwitch>
    );
  },
);

InputSwitch.displayName = 'InputSwitch';

export { inputSwitchClasses } from './classes';
export { InputSwitch };
export default InputSwitch;
