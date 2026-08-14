import React, {
  FocusEvent,
  forwardRef,
  MouseEvent,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { InputGroupContext } from '../../input-group/context';
import { inputWrapperClasses } from './classes';
import { SInputWrapper } from './styles';
import { TInputWrapperProps, TInputVariant } from './types';

const isInteractiveTarget = (target: EventTarget | null) => {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(
    target.closest(
      'button, a, input, textarea, select, [role="button"], [contenteditable="true"]',
    ),
  );
};

const isInputVariant = (value: string): value is TInputVariant =>
  value === 'subtle' || value === 'surface' || value === 'outline';

const InputWrapper = forwardRef<HTMLDivElement, TInputWrapperProps>(
  (
    {
      children,
      variant: variantProp,
      size = 'md',
      color: colorProp,
      error = false,
      disabled = false,
      readOnly = false,
      onMouseDown,
      onFocus,
      onBlur,
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const group = useContext(InputGroupContext);
    const localRef = useRef<HTMLDivElement>(null);
    const [focused, setFocused] = useState(false);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        localRef.current = node;

        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    const variant =
      variantProp ??
      (group?.variant && isInputVariant(group.variant)
        ? group.variant
        : undefined) ??
      'subtle';
    const color = colorProp ?? group?.color ?? 'primary';

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
      onMouseDown?.(event);

      if (
        disabled ||
        event.defaultPrevented ||
        isInteractiveTarget(event.target)
      ) {
        return;
      }

      const field = localRef.current?.querySelector<HTMLElement>(
        'input, textarea',
      );

      field?.focus();
    };

    const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
      setFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setFocused(false);
      }

      onBlur?.(event);
    };

    return (
      <SInputWrapper
        ref={setRefs}
        variant={variant}
        size={size}
        color={color}
        {...props}
        className={mergeClasses(
          inputWrapperClasses.root,
          className,
        )}
        onMouseDown={handleMouseDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </SInputWrapper>
    );
  },
);

InputWrapper.displayName = 'InputWrapper';

export { inputWrapperClasses } from './classes';
export { InputWrapper };
export default InputWrapper;
