import React, {
  ChangeEvent,
  Children,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  Ref,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { inputAutoCompleteClasses } from './classes';
import { createPortal } from 'react-dom';
import { getDropdownPosition } from '../../../../helpers/get-dropdown-position';
import type { TDropdownPlacement } from '../../../../helpers/get-dropdown-position';
import { getNextListIndex } from '../../../../helpers/get-next-list-index';
import { isSelectedOption } from '../../../../helpers/is-selected-option';
import { ArrowBottomIcon } from '../../../../icons';
import { useFormControlState } from '../../form-control/context';
import {
  defaultIsValueEqual,
  isValueSelected,
  toggleSelectedValue,
} from '../../form-control/value';
import { InputWrapper } from '../input-wrapper';
import { InputSelectOption } from '../input-select-option';
import {
  defaultFilterOptions,
  defaultGetOptionKey,
  defaultGetOptionLabel,
} from '../list-options';
import {
  SInputAutoComplete,
  SInputAutoCompleteChevron,
  SInputAutoCompleteDropdown,
  SInputAutoCompleteEmpty,
  SInputAutoCompleteField,
  SInputAutoCompleteOptions,
  SInputAutoCompleteTrigger,
  SInputAutoCompleteValue,
} from './styles';
import { TInputAutoCompleteProps } from './types';

const InputAutoCompleteInner = <T,>(
  {
    children,
    options: optionsProp,
    getOptionLabel: getOptionLabelProp,
    getOptionKey: getOptionKeyProp,
    renderOption,
    filterOptions = defaultFilterOptions,
    value: valueProp,
    defaultValue,
    onChange,
    isValueEqual = defaultIsValueEqual,
    renderValue,
    inputValue: inputValueProp,
    defaultInputValue = '',
    onInputChange,
    onRemoveLast,
    placeholder = 'Type to search…',
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    multiSelect = false,
    closeOnSelect: closeOnSelectProp,
    hideSelectedOptions = false,
    noOptionsText = 'No results',
    variant: variantProp,
    size: sizeProp,
    color: colorProp,
    disabled: disabledProp,
    actionBar,
    id,
    className,
    ...props
  }: TInputAutoCompleteProps<T>,
  forwardedRef: Ref<HTMLDivElement>,
) => {
  const form = useFormControlState({
    variant: variantProp,
    size: sizeProp,
    color: colorProp,
    disabled: disabledProp,
    id,
  });
  const listId = useId();
  const closeOnSelect = closeOnSelectProp ?? !multiSelect;
  const isOpenControlled = openProp !== undefined;
  const isInputControlled = inputValueProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [uncontrolledInputValue, setUncontrolledInputValue] =
    useState(defaultInputValue);
  const open = isOpenControlled ? Boolean(openProp) : uncontrolledOpen;
  const inputValue = isInputControlled
    ? inputValueProp
    : uncontrolledInputValue;
  const [visible, setVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    width: number;
    placement: TDropdownPlacement;
  }>({
    top: 0,
    left: 0,
    width: 0,
    placement: 'bottom',
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const optionSelectHandlersRef = useRef<Array<(() => void) | null>>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const isValueControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<
    T | T[] | undefined
  >(defaultValue ?? (form.value as T | T[] | undefined));
  const currentValue = isValueControlled
    ? valueProp
    : form.value !== undefined
      ? (form.value as T | T[])
      : uncontrolledValue;

  const getOptionLabel = getOptionLabelProp ?? defaultGetOptionLabel<T>;
  const getOptionKey = (option: T, index: number) =>
    getOptionKeyProp?.(option, index) ??
    defaultGetOptionKey(option, index, getOptionLabel);
  const useOptions = optionsProp != null;

  const filteredOptions = useOptions
    ? filterOptions(optionsProp ?? [], {
        inputValue,
        getOptionLabel,
      }).filter(
        (option) =>
          !hideSelectedOptions ||
          !isValueSelected(currentValue, option, isValueEqual, multiSelect),
      )
    : [];

  const optionChildren = useOptions
    ? []
    : Children.toArray(children)
        .filter(isValidElement)
        .filter(
          (child) =>
            !hideSelectedOptions ||
            !isSelectedOption(
              child as ReactElement<{
                'aria-selected'?: boolean | 'true' | 'false';
              }>,
            ),
        );
  const optionCount = useOptions
    ? filteredOptions.length
    : optionChildren.length;

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;

      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef],
  );

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isOpenControlled) {
        setUncontrolledOpen(next);
      }

      onOpenChange?.(next);
    },
    [isOpenControlled, onOpenChange],
  );

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;

    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const dropdownHeight =
      dropdownRef.current?.offsetHeight ||
      Math.min(288, window.innerHeight * 0.4);

    setCoords(
      getDropdownPosition({
        trigger: rect,
        dropdownHeight,
        width: rect.width,
      }),
    );
  }, []);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      setHighlightedIndex(-1);
      return;
    }

    updatePosition();

    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setVisible(true));
    });

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setHighlightedIndex((current) => {
      if (optionCount <= 0) {
        return -1;
      }

      if (current < 0) {
        return current;
      }

      if (current >= optionCount) {
        return optionCount - 1;
      }

      return current;
    });
  }, [open, optionCount]);

  useEffect(() => {
    if (!open || highlightedIndex < 0) {
      return;
    }

    optionRefs.current[highlightedIndex]?.scrollIntoView({
      block: 'nearest',
    });
  }, [highlightedIndex, open]);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const trigger = triggerRef.current;
    const dropdown = dropdownRef.current;
    const handleReposition = () => updatePosition();

    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(handleReposition)
        : null;

    if (trigger) {
      resizeObserver?.observe(trigger);
    }

    if (dropdown) {
      resizeObserver?.observe(dropdown);
    }

    updatePosition();

    return () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
      resizeObserver?.disconnect();
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        rootRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [open, setOpen]);

  const setInputValue = (next: string, event?: ChangeEvent<HTMLInputElement>) => {
    if (!isInputControlled) {
      setUncontrolledInputValue(next);
    }

    if (event) {
      onInputChange?.(next, event);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value, event);
    setHighlightedIndex(0);

    if (!form.disabled && !open) {
      setOpen(true);
    }
  };

  const commitValue = (
    event: ReactMouseEvent<HTMLButtonElement> | unknown,
    option: T,
  ) => {
    const next = toggleSelectedValue(
      currentValue,
      option,
      isValueEqual,
      multiSelect,
    );

    if (!isValueControlled && form.value === undefined) {
      setUncontrolledValue(next);
    }

    onChange?.(event, next);
    form.onChange?.(event, next);

    if (multiSelect) {
      setInputValue('');
    } else {
      setInputValue(getOptionLabel(option));
    }

    if (closeOnSelect) {
      setOpen(false);
    }

    inputRef.current?.focus();
  };

  const finishChildSelect = () => {
    if (closeOnSelect) {
      setOpen(false);
    }

    inputRef.current?.focus();
  };

  const handleRemoveLast = () => {
    if (onRemoveLast) {
      onRemoveLast();
      return;
    }

    if (!multiSelect || !Array.isArray(currentValue) || currentValue.length === 0) {
      return;
    }

    const next = currentValue.slice(0, -1);

    if (!isValueControlled && form.value === undefined) {
      setUncontrolledValue(next);
    }

    onChange?.(null, next);
    form.onChange?.(null, next);
  };

  const selectHighlighted = () => {
    if (highlightedIndex < 0) {
      return;
    }

    if (useOptions) {
      const option = filteredOptions[highlightedIndex];

      if (option !== undefined) {
        commitValue(null, option);
      }

      return;
    }

    optionSelectHandlersRef.current[highlightedIndex]?.();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (form.disabled) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();

        if (!open) {
          setOpen(true);
          setHighlightedIndex(optionCount > 0 ? 0 : -1);
          return;
        }

        setHighlightedIndex((current) =>
          getNextListIndex(current, 1, optionCount),
        );
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();

        if (!open) {
          setOpen(true);
          setHighlightedIndex(optionCount > 0 ? optionCount - 1 : -1);
          return;
        }

        setHighlightedIndex((current) =>
          getNextListIndex(current, -1, optionCount),
        );
        break;
      }
      case 'Home': {
        if (!open || optionCount <= 0) {
          return;
        }

        event.preventDefault();
        setHighlightedIndex(0);
        break;
      }
      case 'End': {
        if (!open || optionCount <= 0) {
          return;
        }

        event.preventDefault();
        setHighlightedIndex(optionCount - 1);
        break;
      }
      case 'Enter': {
        if (!open || highlightedIndex < 0) {
          return;
        }

        event.preventDefault();
        selectHighlighted();
        break;
      }
      case 'Escape': {
        if (!open) {
          return;
        }

        event.preventDefault();
        setOpen(false);
        break;
      }
      case 'Backspace': {
        if (!multiSelect || inputValue !== '') {
          return;
        }

        event.preventDefault();
        handleRemoveLast();
        break;
      }
      default:
        break;
    }
  };

  optionSelectHandlersRef.current = [];
  optionRefs.current = [];

  const highlightHandlers = (index: number) => ({
    onMouseMove: (event: ReactMouseEvent<HTMLButtonElement>) => {
      if (
        event.clientX === pointer.current.x &&
        event.clientY === pointer.current.y
      ) {
        return;
      }

      pointer.current = { x: event.clientX, y: event.clientY };
      setHighlightedIndex(index);
    },
  });

  const options = useOptions
    ? filteredOptions.map((option, index) => {
        const selected = isValueSelected(
          currentValue,
          option,
          isValueEqual,
          multiSelect,
        );
        const highlighted = highlightedIndex === index;

        return (
          <InputSelectOption
            key={getOptionKey(option, index)}
            id={`${listId}-option-${index}`}
            ref={(node: HTMLButtonElement | null) => {
              optionRefs.current[index] = node;
            }}
            value={option}
            aria-selected={selected}
            data-highlighted={highlighted ? 'true' : undefined}
            {...highlightHandlers(index)}
            onClick={(event: ReactMouseEvent<HTMLButtonElement>) => {
              commitValue(event, option);
            }}
          >
            {renderOption?.(option, { selected, highlighted }) ??
              getOptionLabel(option)}
          </InputSelectOption>
        );
      })
    : optionChildren.map((child, index) => {
        const option = child as ReactElement<{
          id?: string;
          onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
        }>;
        const optionId = `${listId}-option-${index}`;

        optionSelectHandlersRef.current[index] = () => {
          option.props.onClick?.({
            preventDefault() {},
            stopPropagation() {},
          } as ReactMouseEvent<HTMLButtonElement>);
          finishChildSelect();
        };

        return cloneElement(option as ReactElement<Record<string, unknown>>, {
          id: optionId,
          ref: (node: HTMLButtonElement | null) => {
            optionRefs.current[index] = node;
          },
          'data-highlighted': highlightedIndex === index ? 'true' : undefined,
          ...highlightHandlers(index),
          onClick: (event: ReactMouseEvent<HTMLButtonElement>) => {
            option.props.onClick?.(event);
            finishChildSelect();
          },
        });
      });

  const activeDescendant =
    open && highlightedIndex >= 0
      ? `${listId}-option-${highlightedIndex}`
      : undefined;

  return (
    <SInputAutoComplete
      ref={setRefs}
      {...props}
      className={mergeClasses(
        inputAutoCompleteClasses.root,
        form.disabled && inputAutoCompleteClasses.disabled,
        open && inputAutoCompleteClasses.open,
        className,
      )}
    >
      <InputWrapper
        open={open}
        variant={form.variant}
        size={form.size}
        color={form.color}
        disabled={form.disabled}
        error={form.error}
        actionBar={actionBar}
      >
        <SInputAutoCompleteTrigger
          ref={triggerRef}
          size={form.size}
          data-multiselect={multiSelect ? 'true' : 'false'}
          onClick={() => {
            if (form.disabled) {
              return;
            }

            inputRef.current?.focus();
          }}
        >
          <SInputAutoCompleteValue>
            {renderValue?.(currentValue)}
            <SInputAutoCompleteField
              ref={inputRef}
              type="text"
              id={id ?? form.id}
              value={inputValue}
              placeholder={placeholder}
              disabled={form.disabled}
              role="combobox"
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-autocomplete="list"
              aria-invalid={form.error || undefined}
              aria-describedby={form.helperId}
              aria-controls={open ? listId : undefined}
              aria-activedescendant={activeDescendant}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onFocus={() => {
                if (!form.disabled) {
                  form.setFocused?.(true);
                  setOpen(true);
                }
              }}
              onBlur={() => form.setFocused?.(false)}
            />
          </SInputAutoCompleteValue>
          <SInputAutoCompleteChevron open={open} aria-hidden>
            <ArrowBottomIcon width="1em" height="1em" />
          </SInputAutoCompleteChevron>
        </SInputAutoCompleteTrigger>
      </InputWrapper>

      {open && typeof document !== 'undefined'
        ? createPortal(
            <SInputAutoCompleteDropdown
              ref={dropdownRef}
              id={listId}
              top={coords.top}
              left={coords.left}
              width={coords.width}
              placement={coords.placement}
              visible={visible}
              color={form.color}
              variant={form.variant}
              role="listbox"
              aria-multiselectable={multiSelect || undefined}
            >
              <SInputAutoCompleteOptions>
                {optionCount > 0 ? (
                  options
                ) : (
                  <SInputAutoCompleteEmpty>
                    {noOptionsText}
                  </SInputAutoCompleteEmpty>
                )}
              </SInputAutoCompleteOptions>
            </SInputAutoCompleteDropdown>,
            document.body,
          )
        : null}
    </SInputAutoComplete>
  );
};

const InputAutoComplete = forwardRef(InputAutoCompleteInner) as <T = unknown>(
  props: TInputAutoCompleteProps<T> & { ref?: Ref<HTMLDivElement> },
) => ReactElement | null;

(InputAutoComplete as { displayName?: string }).displayName = 'InputAutoComplete';

export { inputAutoCompleteClasses } from './classes';
export { InputAutoComplete };
export default InputAutoComplete;
