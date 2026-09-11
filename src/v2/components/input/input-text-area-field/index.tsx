import React, {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import {
  isAriaInvalid,
  mergeClasses,
} from '../../../../helpers/generate-utility-classes';
import { useFormControlState } from '../../form-control/context';
import { inputTextAreaFieldClasses } from './classes';
import { SInputTextAreaField } from './styles';
import { TInputTextAreaFieldProps } from './types';

const syncHeight = (element: HTMLTextAreaElement) => {
  element.style.height = 'auto';
  element.style.height = `${element.scrollHeight}px`;
};

const InputTextAreaField = forwardRef<
  HTMLTextAreaElement,
  TInputTextAreaFieldProps
>(
  (
    {
      autoGrow = false,
      rows = 3,
      onChange,
      onFocus,
      className,
      disabled: disabledProp,
      readOnly,
      required: requiredProp,
      id,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    forwardedRef,
  ) => {
    const form = useFormControlState({
      disabled: disabledProp,
      required: requiredProp,
      id,
    });
    const localRef = useRef<HTMLTextAreaElement>(null);
    const error = isAriaInvalid(ariaInvalid) || form.error;

    const setRefs = useCallback(
      (node: HTMLTextAreaElement | null) => {
        localRef.current = node;

        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    useLayoutEffect(() => {
      if (!autoGrow || !localRef.current) {
        return;
      }

      syncHeight(localRef.current);
    }, [autoGrow, props.value, props.defaultValue, rows]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (autoGrow) {
        syncHeight(event.currentTarget);
      }

      onChange?.(event);
      form.onChange?.(event, event.target.value);
    };

    const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
      form.setFocused?.(true);
      onFocus?.(event);
    };

    return (
      <SInputTextAreaField
        ref={setRefs}
        {...props}
        id={id ?? form.id}
        rows={rows}
        autoGrow={autoGrow}
        onChange={handleChange}
        onFocus={handleFocus}
        disabled={form.disabled}
        readOnly={readOnly}
        required={form.required}
        aria-invalid={error || undefined}
        aria-describedby={ariaDescribedBy ?? form.helperId}
        className={mergeClasses(
          inputTextAreaFieldClasses.root,
          form.disabled && inputTextAreaFieldClasses.disabled,
          error && inputTextAreaFieldClasses.error,
          readOnly && inputTextAreaFieldClasses.readOnly,
          form.required && inputTextAreaFieldClasses.required,
          className,
        )}
      />
    );
  },
);

InputTextAreaField.displayName = 'InputTextAreaField';

export { inputTextAreaFieldClasses } from './classes';
export { InputTextAreaField };
export default InputTextAreaField;
