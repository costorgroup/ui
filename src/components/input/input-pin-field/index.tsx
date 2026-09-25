import React, {
  ClipboardEvent,
  FocusEvent,
  KeyboardEvent,
  ChangeEvent,
  forwardRef,
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  isAriaInvalid,
  mergeClasses,
} from '../../../helpers/generate-utility-classes';
import { useFormControlState } from '../../form-control/context';
import { inputPinFieldClasses } from './classes';
import {
  SInputPinField,
  SInputPinFieldCell,
  SInputPinFieldInput,
  SInputPinFieldStack,
} from './styles';
import { TInputPinFieldProps, TInputPinFieldType } from './types';
import { mergeSlotProps } from '../../../helpers/slot-props';

const CHAR_PATTERN: Record<TInputPinFieldType, RegExp> = {
  numeric: /^[0-9]$/,
  alphabetic: /^[a-zA-Z]$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
};

const INPUT_MODE: Record<
  TInputPinFieldType,
  'numeric' | 'text' | 'decimal' | 'tel' | 'search' | 'email' | 'url'
> = {
  numeric: 'numeric',
  alphabetic: 'text',
  alphanumeric: 'text',
};

const toCells = (value: string | undefined, length: number) => {
  const chars = (value ?? '').slice(0, length).split('');
  return Array.from({ length }, (_, index) => chars[index] ?? '');
};

const getFirstEmptyIndex = (cells: string[], length: number) => {
  const index = cells.findIndex((cell) => cell === '');
  return index === -1 ? length : index;
};

const isCharAllowed = (
  char: string,
  type: TInputPinFieldType,
  pattern?: string,
) => {
  if (!char) {
    return false;
  }

  if (pattern) {
    try {
      return new RegExp(pattern).test(char);
    } catch {
      return false;
    }
  }

  return CHAR_PATTERN[type].test(char);
};

const filterChars = (
  text: string,
  type: TInputPinFieldType,
  pattern?: string,
) =>
  text
    .split('')
    .filter((char) => isCharAllowed(char, type, pattern))
    .join('');

const InputPinField = forwardRef<HTMLDivElement, TInputPinFieldProps>(
  (
    {
      length = 4,
      value: valueProp,
      defaultValue = '',
      onChange,
      onComplete,
      type = 'numeric',
      pattern,
      mask = false,
      placeholder = '○',
      otp = false,
      name,
      id,
      disabled: disabledProp,
      readOnly = false,
      autoFocus = false,
      blurOnComplete = false,
      attached = false,
      variant: variantProp,
      size: sizeProp,
      color: colorProp,
      actionBar,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      onFocus,
      onBlur,
      className,
      slotProps,
      ...props
    },
    ref,
  ) => {
    const form = useFormControlState({
      disabled: disabledProp,
      variant: variantProp,
      size: sizeProp,
      color: colorProp,
      id,
    });
    const disabled = form.disabled;
    const variant = form.variant;
    const size = form.size;
    const color = form.color;
    const error = isAriaInvalid(ariaInvalid) || form.error;
    const reactId = useId();
    const fieldId = id ?? form.id ?? reactId;
    const isControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const value = isControlled ? valueProp : uncontrolledValue;
    const cells = toCells(value, length);
    const cellsRef = useRef(cells);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const completedRef = useRef(false);
    const didAutoFocus = useRef(false);

    cellsRef.current = cells;

    const firstEmptyIndex = getFirstEmptyIndex(cells, length);

    const syncValue = useCallback(
      (nextCells: string[], event?: unknown) => {
        cellsRef.current = nextCells;
        const next = nextCells.join('');

        if (!isControlled) {
          setUncontrolledValue(next);
        }

        onChange?.(next);
        form.onChange?.(event, next);

        const isComplete =
          nextCells.length === length && nextCells.every((cell) => cell !== '');

        if (isComplete) {
          if (!completedRef.current) {
            completedRef.current = true;
            onComplete?.(next);
          }

          if (blurOnComplete) {
            inputRefs.current[length - 1]?.blur();
          }
        } else {
          completedRef.current = false;
        }
      },
      [blurOnComplete, form.onChange, isControlled, length, onChange, onComplete],
    );

    const focusIndex = (index: number) => {
      const next = Math.max(0, Math.min(index, length - 1));
      const node = inputRefs.current[next];

      if (!node) {
        return;
      }

      node.focus();
      node.select();
    };

    const resolveFocusIndex = (index: number) => {
      const firstEmpty = getFirstEmptyIndex(cellsRef.current, length);

      if (index <= firstEmpty) {
        return index;
      }

      return Math.min(firstEmpty, length - 1);
    };

    useLayoutEffect(() => {
      if (!autoFocus || disabled || didAutoFocus.current) {
        return;
      }

      didAutoFocus.current = true;
      inputRefs.current[0]?.focus();
      inputRefs.current[0]?.select();
    }, [autoFocus, disabled]);

    const handleChange = (
      index: number,
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      if (disabled || readOnly) {
        return;
      }

      if (index > getFirstEmptyIndex(cellsRef.current, length)) {
        focusIndex(resolveFocusIndex(index));
        return;
      }

      const raw = event.target.value;
      const chars = filterChars(raw, type, pattern);

      if (!chars) {
        if (raw === '') {
          const next = [...cellsRef.current];
          next[index] = '';
          syncValue(next, event);
        }
        return;
      }

      const next = [...cellsRef.current];
      let cursor = index;

      for (const char of chars) {
        if (cursor >= length) {
          break;
        }

        next[cursor] = char;
        cursor += 1;
      }

      syncValue(next, event);
      focusIndex(Math.min(cursor, length - 1));
    };

    const handleKeyDown = (
      index: number,
      event: KeyboardEvent<HTMLInputElement>,
    ) => {
      if (disabled || readOnly) {
        return;
      }

      switch (event.key) {
        case 'Backspace': {
          event.preventDefault();

          const next = [...cellsRef.current];

          if (next[index]) {
            next[index] = '';
            syncValue(next, event);
            return;
          }

          if (index > 0) {
            next[index - 1] = '';
            syncValue(next, event);
            focusIndex(index - 1);
          }
          break;
        }
        case 'Delete': {
          event.preventDefault();
          const next = [...cellsRef.current];
          next[index] = '';
          syncValue(next, event);
          break;
        }
        case 'ArrowLeft': {
          event.preventDefault();
          if (index > 0) {
            focusIndex(index - 1);
          }
          break;
        }
        case 'ArrowRight': {
          event.preventDefault();
          const firstEmpty = getFirstEmptyIndex(cellsRef.current, length);
          focusIndex(Math.min(index + 1, firstEmpty, length - 1));
          break;
        }
        case 'Home': {
          event.preventDefault();
          focusIndex(0);
          break;
        }
        case 'End': {
          event.preventDefault();
          focusIndex(
            Math.min(getFirstEmptyIndex(cellsRef.current, length), length - 1),
          );
          break;
        }
        default:
          break;
      }
    };

    const handlePaste = (
      index: number,
      event: ClipboardEvent<HTMLInputElement>,
    ) => {
      if (disabled || readOnly) {
        return;
      }

      event.preventDefault();

      const pasted = filterChars(
        event.clipboardData.getData('text'),
        type,
        pattern,
      );

      if (!pasted) {
        return;
      }

      const start = pasted.length >= length ? 0 : resolveFocusIndex(index);
      const next = [...cellsRef.current];
      let cursor = start;

      for (const char of pasted) {
        if (cursor >= length) {
          break;
        }

        next[cursor] = char;
        cursor += 1;
      }

      syncValue(next, event);
      focusIndex(Math.min(cursor, length - 1));
    };

    const handleFocus = (index: number, event: FocusEvent<HTMLInputElement>) => {
      const allowed = resolveFocusIndex(index);

      if (allowed !== index) {
        focusIndex(allowed);
        return;
      }

      event.target.select();
    };

    const handleGroupFocus = (event: FocusEvent<HTMLDivElement>) => {
      form.setFocused?.(true);
      onFocus?.(event);
    };

    const handleGroupBlur = (event: FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        form.setFocused?.(false);
      }

      onBlur?.(event);
    };

    const pinChildren = (
      <>
        {name ? (
          <input
            {...mergeSlotProps(
              {
                type: 'hidden',
                name,
                value: cells.join(''),
                disabled,
              },
              slotProps?.hiddenInput,
            )}
          />
        ) : null}
        {cells.map((cell, index) => {
          const inputId = index === 0 ? fieldId : `${fieldId}-pin-${index}`;
          const locked = index > firstEmptyIndex;

          return (
            <SInputPinFieldCell
              key={inputId}
              {...mergeSlotProps(
                {
                  variant,
                  size,
                  color,
                  attached,
                  'data-disabled': disabled ? 'true' : 'false',
                },
                slotProps?.cell,
              )}
            >
              <SInputPinFieldInput
                {...mergeSlotProps(
                  {
                    ref: (node) => {
                      inputRefs.current[index] = node;
                    },
                    id: inputId,
                    value: cell,
                    placeholder,
                    disabled,
                    readOnly,
                    tabIndex: disabled || locked ? -1 : 0,
                    inputMode: INPUT_MODE[type],
                    autoComplete: otp ? 'one-time-code' : 'off',
                    autoCapitalize: 'off',
                    autoCorrect: 'off',
                    spellCheck: false,
                    'aria-label': `Pin character ${index + 1} of ${length}`,
                    'aria-invalid': error || undefined,
                    'aria-describedby': index === 0 ? (ariaDescribedBy ?? form.helperId) : undefined,
                    'data-mask': mask ? 'true' : undefined,
                    type: 'text',
                    onChange: (event) => handleChange(index, event),
                    onKeyDown: (event) => handleKeyDown(index, event),
                    onPaste: (event) => handlePaste(index, event),
                    onFocus: (event) => handleFocus(index, event),
                  },
                  slotProps?.input,
                )}
              />
            </SInputPinFieldCell>
          );
        })}
      </>
    );

    if (actionBar == null) {
      return (
        <SInputPinField
          ref={ref}
          attached={attached}
          size={size}
          role="group"
          aria-disabled={disabled || undefined}
          {...props}
          className={mergeClasses(inputPinFieldClasses.root, className)}
          onFocus={handleGroupFocus}
          onBlur={handleGroupBlur}
        >
          {pinChildren}
        </SInputPinField>
      );
    }

    return (
      <SInputPinFieldStack
        ref={ref}
        role="group"
        aria-disabled={disabled || undefined}
        {...props}
        className={mergeClasses(inputPinFieldClasses.root, className)}
        onFocus={handleGroupFocus}
        onBlur={handleGroupBlur}
      >
        <SInputPinField
          {...mergeSlotProps(
            {
              attached,
              size,
            },
            slotProps?.group,
          )}
        >
          {pinChildren}
        </SInputPinField>
        {actionBar}
      </SInputPinFieldStack>
    );
  },
);

InputPinField.displayName = 'InputPinField';

export type { TInputPinFieldSlotProps } from './types';
export { inputPinFieldClasses } from './classes';
export { InputPinField };
export default InputPinField;
