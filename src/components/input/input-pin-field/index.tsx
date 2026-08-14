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
  SInputPinField,
  SInputPinFieldCell,
  SInputPinFieldInput,
} from './styles';
import { TInputPinFieldProps, TInputPinFieldType } from './types';

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
      disabled = false,
      readOnly = false,
      autoFocus = false,
      blurOnComplete = false,
      attached = false,
      variant = 'subtle',
      size = 'md',
      color = 'primary',
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref,
  ) => {
    const reactId = useId();
    const fieldId = id ?? reactId;
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
      (nextCells: string[]) => {
        cellsRef.current = nextCells;
        const next = nextCells.join('');

        if (!isControlled) {
          setUncontrolledValue(next);
        }

        onChange?.(next);

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
      [blurOnComplete, isControlled, length, onChange, onComplete],
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
          syncValue(next);
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

      syncValue(next);
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
            syncValue(next);
            return;
          }

          if (index > 0) {
            next[index - 1] = '';
            syncValue(next);
            focusIndex(index - 1);
          }
          break;
        }
        case 'Delete': {
          event.preventDefault();
          const next = [...cellsRef.current];
          next[index] = '';
          syncValue(next);
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

      syncValue(next);
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

    return (
      <SInputPinField
        ref={ref}
        attached={attached}
        size={size}
        role="group"
        aria-disabled={disabled || undefined}
        {...props}
      >
        {name ? (
          <input
            type="hidden"
            name={name}
            value={cells.join('')}
            disabled={disabled}
          />
        ) : null}
        {cells.map((cell, index) => {
          const inputId = `${fieldId}-pin-${index}`;
          const locked = index > firstEmptyIndex;

          return (
            <SInputPinFieldCell
              key={inputId}
              variant={variant}
              size={size}
              color={color}
              attached={attached}
              data-disabled={disabled ? 'true' : 'false'}
            >
              <SInputPinFieldInput
                ref={(node) => {
                  inputRefs.current[index] = node;
                }}
                id={inputId}
                value={cell}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                tabIndex={disabled || locked ? -1 : 0}
                inputMode={INPUT_MODE[type]}
                autoComplete={otp ? 'one-time-code' : 'off'}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label={`Pin character ${index + 1} of ${length}`}
                aria-invalid={ariaInvalid}
                data-mask={mask ? 'true' : undefined}
                type="text"
                onChange={(event) => handleChange(index, event)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={(event) => handlePaste(index, event)}
                onFocus={(event) => handleFocus(index, event)}
              />
            </SInputPinFieldCell>
          );
        })}
      </SInputPinField>
    );
  },
);

InputPinField.displayName = 'InputPinField';

export { InputPinField };
export default InputPinField;
