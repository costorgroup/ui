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
import { useFormControlState } from '../../form-control/context';
import { inputWrapperClasses } from './classes';
import { SInputWrapper, SInputWrapperActionBar, SInputWrapperBody } from './styles';
import { INPUT_VARIANTS, TInputWrapperProps, TInputVariant } from './types';
import { mergeSlotProps } from '../../../helpers/slot-props';

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
  INPUT_VARIANTS.includes(value as TInputVariant);

const InputWrapper = forwardRef<HTMLDivElement, TInputWrapperProps>(
  (
    {
      children,
      variant: variantProp,
      size: sizeProp,
      color: colorProp,
      error: errorProp,
      disabled: disabledProp,
      readOnly = false,
      open = false,
      trigger = false,
      stacked = false,
      actionBar,
      onMouseDown,
      onFocus,
      onBlur,
      className,
      slotProps,
      ...props
    },
    forwardedRef,
  ) => {
    const group = useContext(InputGroupContext);
    const form = useFormControlState({
      variant: variantProp,
      size: sizeProp,
      color: colorProp,
      error: errorProp,
      disabled: disabledProp,
    });
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
      form.variant;
    const color = colorProp ?? group?.color ?? form.color;
    const error = errorProp ?? form.error;
    const disabled = disabledProp ?? form.disabled;
    const size = sizeProp ?? form.size;
    const hasActionBar = actionBar != null;
    const isStacked = stacked || hasActionBar;

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
      onMouseDown?.(event);

      if (
        disabled ||
        event.defaultPrevented ||
        isInteractiveTarget(event.target)
      ) {
        return;
      }

      const root = localRef.current;
      const scope =
        root?.querySelector<HTMLElement>(`.${inputWrapperClasses.body}`) ??
        root;
      const field = scope?.querySelector<HTMLElement>(
        'input:not([type="hidden"]), textarea, select, button[aria-haspopup="listbox"], button[aria-haspopup="dialog"], [contenteditable="true"]',
      );

      field?.focus();
    };

    const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
      setFocused(true);
      form.setFocused?.(true);
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setFocused(false);
        form.setFocused?.(false);
      }

      onBlur?.(event);
    };

    return (
      <SInputWrapper
        ref={setRefs}
        variant={variant}
        size={size}
        color={color}
        error={error}
        disabled={disabled}
        open={open}
        trigger={trigger}
        stacked={isStacked}
        data-open={open ? 'true' : undefined}
        data-focused={focused ? 'true' : undefined}
        {...props}
        className={mergeClasses(
          inputWrapperClasses.root,
          error && inputWrapperClasses.error,
          className,
        )}
        onMouseDown={handleMouseDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {hasActionBar ? (
          <SInputWrapperBody
            {...mergeSlotProps(
              {
                className: inputWrapperClasses.body,
              },
              slotProps?.body,
            )}
          >
            {children}
          </SInputWrapperBody>
        ) : (
          children
        )}
        {hasActionBar ? (
          <SInputWrapperActionBar
            {...mergeSlotProps(
              {
                size,
                className: inputWrapperClasses.actionBar,
              },
              slotProps?.actionBar,
            )}
          >
            {actionBar}
          </SInputWrapperActionBar>
        ) : null}
      </SInputWrapper>
    );
  },
);

InputWrapper.displayName = 'InputWrapper';

export type { TInputWrapperSlotProps } from './types';
export { inputWrapperClasses } from './classes';
export { InputWrapper };
export default InputWrapper;
