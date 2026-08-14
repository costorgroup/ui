import React, {
  ChangeEvent,
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import { SInputTextAreaField } from './styles';
import { TInputTextAreaFieldProps } from './types';

const syncHeight = (element: HTMLTextAreaElement) => {
  element.style.height = 'auto';
  element.style.height = `${element.scrollHeight}px`;
};

const InputTextAreaField = forwardRef<
  HTMLTextAreaElement,
  TInputTextAreaFieldProps
>(({ autoGrow = false, rows = 3, onChange, ...props }, forwardedRef) => {
  const localRef = useRef<HTMLTextAreaElement>(null);

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
  };

  return (
    <SInputTextAreaField
      ref={setRefs}
      rows={rows}
      autoGrow={autoGrow}
      onChange={handleChange}
      {...props}
    />
  );
});

InputTextAreaField.displayName = 'InputTextAreaField';

export { InputTextAreaField };
export default InputTextAreaField;
