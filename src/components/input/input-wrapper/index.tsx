import React, {
  forwardRef,
  MouseEvent,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { InputGroupContext } from '../../input-group/context';
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
      onMouseDown,
      ...props
    },
    forwardedRef,
  ) => {
    const group = useContext(InputGroupContext);
    const localRef = useRef<HTMLDivElement>(null);

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

      if (event.defaultPrevented || isInteractiveTarget(event.target)) {
        return;
      }

      const field = localRef.current?.querySelector<HTMLElement>(
        'input, textarea',
      );

      field?.focus();
    };

    return (
      <SInputWrapper
        ref={setRefs}
        variant={variant}
        size={size}
        color={color}
        {...props}
        onMouseDown={handleMouseDown}
      >
        {children}
      </SInputWrapper>
    );
  },
);

InputWrapper.displayName = 'InputWrapper';

export { InputWrapper };
export default InputWrapper;
