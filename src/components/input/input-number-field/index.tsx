import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  WheelEvent,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  ArrowBottomIcon,
  ArrowRightIcon,
  ArrowTopIcon,
} from '../../../icons';
import { InputActions } from '../input-actions';
import { InputButton } from '../input-button';
import { InputIcon } from '../input-icon';
import { InputWrapper } from '../input-wrapper';
import {
  isAriaInvalid,
  mergeClasses,
} from '../../../helpers/generate-utility-classes';
import { useFormControlState } from '../../form-control/context';
import { inputNumberFieldClasses } from './classes';
import {
  SInputNumberFieldFlipIcon,
  SInputNumberFieldInput,
} from './styles';
import { TInputNumberFieldProps } from './types';

const toFiniteNumber = (value: unknown): number | undefined => {
  if (value == null || value === '') {
    return undefined;
  }

  const parsed = typeof value === 'number' ? value : Number(value);

  return Number.isFinite(parsed) ? parsed : undefined;
};

const countDecimals = (value: number) => {
  if (!Number.isFinite(value)) {
    return 0;
  }

  const text = String(value);

  if (text.includes('e-')) {
    const [base = '', exp = '0'] = text.split('e-');
    const baseDecimals = base.split('.')[1]?.length ?? 0;

    return baseDecimals + Number(exp);
  }

  const index = text.indexOf('.');

  return index === -1 ? 0 : text.length - index - 1;
};

const roundToPrecision = (value: number, precision: number) =>
  Number(value.toFixed(precision));

const sanitizeNumberInput = (value: string) => {
  let next = value.replace(/,/g, '.');
  const negative = next.startsWith('-');

  if (negative) {
    next = next.slice(1);
  }

  next = next.replace(/[^\d.]/g, '');
  const dot = next.indexOf('.');

  if (dot !== -1) {
    next = `${next.slice(0, dot + 1)}${next.slice(dot + 1).replace(/\./g, '')}`;
  }

  return negative ? `-${next}` : next;
};

const InputNumberField = forwardRef<HTMLInputElement, TInputNumberFieldProps>(
  (
    {
      size: sizeProp,
      variant: variantProp,
      color: colorProp,
      startIcon,
      endIcon,
      actionBar,
      spinner = false,
      step = 1,
      min,
      max,
      id,
      value,
      defaultValue,
      disabled: disabledProp,
      readOnly,
      required: requiredProp,
      name,
      onChange,
      onBlur,
      onKeyDown,
      onWheel,
      className,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    forwardedRef,
  ) => {
    const form = useFormControlState({
      size: sizeProp,
      variant: variantProp,
      color: colorProp,
      disabled: disabledProp,
      required: requiredProp,
      id,
    });
    const size = form.size;
    const variant = form.variant;
    const color = form.color;
    const disabled = form.disabled;
    const required = form.required;
    const fieldId = id ?? form.id;
    const error = isAriaInvalid(ariaInvalid) || form.error;
    const localRef = useRef<HTMLInputElement>(null);
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue == null ? '' : String(defaultValue),
    );
    const displayValue = isControlled
      ? value == null
        ? ''
        : String(value)
      : uncontrolledValue;
    const stepAmount = toFiniteNumber(step) ?? 1;
    const minAmount = toFiniteNumber(min);
    const maxAmount = toFiniteNumber(max);
    const currentNumber = toFiniteNumber(displayValue);
    const canStep = !disabled && !readOnly;
    const canDecrement =
      canStep &&
      (currentNumber == null || minAmount == null || currentNumber > minAmount);
    const canIncrement =
      canStep &&
      (currentNumber == null || maxAmount == null || currentNumber < maxAmount);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        localRef.current = node;

        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    const emitValue = useCallback(
      (next: string) => {
        if (!isControlled) {
          setUncontrolledValue(next);
        }

        const input = localRef.current;

        const event = {
          target: {
            ...(input ?? {}),
            value: next,
            name,
            id: fieldId,
          },
          currentTarget: {
            ...(input ?? {}),
            value: next,
            name,
            id: fieldId,
          },
        } as ChangeEvent<HTMLInputElement>;

        onChange?.(event);
        form.onChange?.(event, next);
      },
      [fieldId, form, isControlled, name, onChange],
    );

    const applyStep = useCallback(
      (direction: 1 | -1) => {
        if (!canStep) {
          return;
        }

        const precision = Math.max(
          countDecimals(stepAmount),
          currentNumber == null ? 0 : countDecimals(currentNumber),
        );
        const base = currentNumber ?? 0;
        const next = roundToPrecision(base + direction * stepAmount, precision);
        const clamped = Math.min(
          maxAmount ?? next,
          Math.max(minAmount ?? next, next),
        );

        emitValue(String(clamped));
      },
      [canStep, currentNumber, emitValue, maxAmount, minAmount, stepAmount],
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const next = sanitizeNumberInput(event.target.value);

      if (next === displayValue) {
        event.target.value = displayValue;
        return;
      }

      emitValue(next);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);

      const parsed = toFiniteNumber(event.target.value);

      if (parsed == null) {
        if (event.target.value !== '') {
          emitValue('');
        }

        return;
      }

      const clamped = Math.min(
        maxAmount ?? parsed,
        Math.max(minAmount ?? parsed, parsed),
      );

      if (clamped !== parsed) {
        emitValue(String(clamped));
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'e' || event.key === 'E' || event.key === '+') {
        event.preventDefault();
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        applyStep(1);
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        applyStep(-1);
      }
    };

    const handleWheel = (event: WheelEvent<HTMLInputElement>) => {
      onWheel?.(event);

      if (event.defaultPrevented || document.activeElement !== event.currentTarget) {
        return;
      }

      event.preventDefault();
      applyStep(event.deltaY < 0 ? 1 : -1);
    };

    const incrementButton = (
      <InputButton
        tabIndex={-1}
        disabled={!canIncrement}
        aria-label="Increase value"
        onClick={() => applyStep(1)}
      >
        {spinner ? (
          <ArrowRightIcon width="1em" height="1em" />
        ) : (
          <ArrowTopIcon width="1em" height="1em" />
        )}
      </InputButton>
    );

    const decrementButton = (
      <InputButton
        tabIndex={-1}
        disabled={!canDecrement}
        aria-label="Decrease value"
        onClick={() => applyStep(-1)}
      >
        {spinner ? (
          <SInputNumberFieldFlipIcon aria-hidden>
            <ArrowRightIcon width="1em" height="1em" />
          </SInputNumberFieldFlipIcon>
        ) : (
          <ArrowBottomIcon width="1em" height="1em" />
        )}
      </InputButton>
    );

    return (
      <InputWrapper
        size={size}
        variant={variant}
        color={color}
        disabled={disabled}
        readOnly={readOnly}
        error={error}
        actionBar={actionBar}
      >
        {spinner ? decrementButton : startIcon != null ? <InputIcon>{startIcon}</InputIcon> : null}
        <SInputNumberFieldInput
          ref={setRefs}
          {...props}
          className={mergeClasses(
            inputNumberFieldClasses.root,
            error && inputNumberFieldClasses.error,
            className,
          )}
          id={fieldId}
          aria-describedby={ariaDescribedBy ?? form.helperId}
          name={name}
          type="number"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          step={stepAmount}
          min={minAmount}
          max={maxAmount}
          value={displayValue}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={error || undefined}
          $center={spinner}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
        />
        {spinner ? (
          incrementButton
        ) : (
          <>
            {endIcon != null ? <InputIcon>{endIcon}</InputIcon> : null}
            <InputActions orientation="vertical">
              {incrementButton}
              {decrementButton}
            </InputActions>
          </>
        )}
      </InputWrapper>
    );
  },
);

InputNumberField.displayName = 'InputNumberField';

export type { TInputNumberFieldProps } from './types';
export { inputNumberFieldClasses } from './classes';
export { InputNumberField };
export default InputNumberField;
