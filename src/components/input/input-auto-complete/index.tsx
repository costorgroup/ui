import React, {
  ChangeEvent,
  Children,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
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
import { createPortal } from 'react-dom';
import { getDropdownPosition } from '../../../helpers/get-dropdown-position';
import type { TDropdownPlacement } from '../../../helpers/get-dropdown-position';
import { getNextListIndex } from '../../../helpers/get-next-list-index';
import { isSelectedOption } from '../../../helpers/is-selected-option';
import { ArrowBottomIcon } from '../../../icons';
import { IconButton } from '../../icon-button';
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

const InputAutoComplete = forwardRef<HTMLDivElement, TInputAutoCompleteProps>(
  (
    {
      children,
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
      variant = 'subtle',
      size = 'md',
      color = 'primary',
      disabled = false,
      ...props
    },
    forwardedRef,
  ) => {
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

    const optionChildren = Children.toArray(children)
      .filter(isValidElement)
      .filter(
        (child) =>
          !hideSelectedOptions ||
          !isSelectedOption(
            child as ReactElement<{ 'aria-selected'?: boolean | 'true' | 'false' }>,
          ),
      );
    const optionCount = optionChildren.length;

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
          return -1;
        }

        if (current >= optionCount) {
          return optionCount - 1;
        }

        return current;
      });
    }, [open, optionCount, children]);

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

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const next = event.target.value;

      if (!isInputControlled) {
        setUncontrolledInputValue(next);
      }

      onInputChange?.(next, event);

      if (!disabled && !open) {
        setOpen(true);
      }
    };

    const selectHighlighted = () => {
      if (highlightedIndex < 0) {
        return;
      }

      optionSelectHandlersRef.current[highlightedIndex]?.();
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (disabled) {
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
          if (!multiSelect || inputValue !== '' || !onRemoveLast) {
            return;
          }

          event.preventDefault();
          onRemoveLast();
          break;
        }
        default:
          break;
      }
    };

    optionSelectHandlersRef.current = [];

    const options = optionChildren.map((child, index) => {
      const option = child as ReactElement<{
        id?: string;
        onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
      }>;
      const optionId = `${listId}-option-${index}`;

      const finishSelect = () => {
        if (closeOnSelect) {
          setOpen(false);
        }

        inputRef.current?.focus();
      };

      optionSelectHandlersRef.current[index] = () => {
        option.props.onClick?.({
          preventDefault() {},
          stopPropagation() {},
        } as ReactMouseEvent<HTMLButtonElement>);
        finishSelect();
      };

      return cloneElement(option as ReactElement<Record<string, unknown>>, {
        id: optionId,
        ref: (node: HTMLButtonElement | null) => {
          optionRefs.current[index] = node;
        },
        'data-highlighted': highlightedIndex === index ? 'true' : undefined,
        onClick: (event: ReactMouseEvent<HTMLButtonElement>) => {
          option.props.onClick?.(event);
          finishSelect();
        },
      });
    });

    const activeDescendant =
      open && highlightedIndex >= 0
        ? `${listId}-option-${highlightedIndex}`
        : undefined;

    return (
      <SInputAutoComplete ref={setRefs} {...props}>
        <SInputAutoCompleteTrigger
          ref={triggerRef}
          variant={variant}
          size={size}
          color={color}
          open={open}
          data-open={open ? 'true' : 'false'}
          data-disabled={disabled ? 'true' : 'false'}
          data-multiselect={multiSelect ? 'true' : 'false'}
          onClick={() => {
            if (disabled) {
              return;
            }

            inputRef.current?.focus();
          }}
        >
          <SInputAutoCompleteValue>
            {renderValue?.()}
            <SInputAutoCompleteField
              ref={inputRef}
              type="text"
              value={inputValue}
              placeholder={placeholder}
              disabled={disabled}
              role="combobox"
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-autocomplete="list"
              aria-controls={open ? listId : undefined}
              aria-activedescendant={activeDescendant}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onFocus={() => {
                if (!disabled) {
                  setOpen(true);
                }
              }}
            />
          </SInputAutoCompleteValue>
          <IconButton
            type="button"
            variant="ghost"
            size={size}
            color={color}
            disabled={disabled}
            aria-label={open ? 'Close options' : 'Open options'}
            tabIndex={-1}
            onMouseDown={(event) => event.preventDefault()}
            onClick={(event) => {
              event.stopPropagation();

              if (disabled) {
                return;
              }

              setOpen(!open);
            }}
          >
            <SInputAutoCompleteChevron open={open} aria-hidden>
              <ArrowBottomIcon />
            </SInputAutoCompleteChevron>
          </IconButton>
        </SInputAutoCompleteTrigger>

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
  },
);

InputAutoComplete.displayName = 'InputAutoComplete';

export { InputAutoComplete };
export default InputAutoComplete;
