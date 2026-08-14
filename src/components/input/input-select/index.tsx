import React, {
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
import {
  SInputSelect,
  SInputSelectChevron,
  SInputSelectDropdown,
  SInputSelectEmpty,
  SInputSelectOptions,
  SInputSelectPlaceholder,
  SInputSelectTrigger,
  SInputSelectValue,
} from './styles';
import { TInputSelectProps } from './types';

const InputSelect = forwardRef<HTMLDivElement, TInputSelectProps>(
  (
    {
      children,
      renderValue,
      placeholder = 'Select…',
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
    const isControlled = openProp !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const open = isControlled ? Boolean(openProp) : uncontrolledOpen;
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
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

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
        if (!isControlled) {
          setUncontrolledOpen(next);
        }

        onOpenChange?.(next);
      },
      [isControlled, onOpenChange],
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

    const selectHighlighted = () => {
      if (highlightedIndex < 0) {
        return;
      }

      optionRefs.current[highlightedIndex]?.click();
    };

    const handleListKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
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
        default:
          break;
      }
    };

    const valueContent = renderValue?.();

    optionRefs.current = [];

    const options = optionChildren.map((child, index) => {
      const option = child as ReactElement<{
        id?: string;
        onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
      }>;

      return cloneElement(option as ReactElement<Record<string, unknown>>, {
        id: `${listId}-option-${index}`,
        ref: (node: HTMLButtonElement | null) => {
          optionRefs.current[index] = node;
        },
        'data-highlighted': highlightedIndex === index ? 'true' : undefined,
        onClick: (event: ReactMouseEvent<HTMLButtonElement>) => {
          option.props.onClick?.(event);

          if (closeOnSelect) {
            setOpen(false);
            triggerRef.current?.focus();
          }
        },
      });
    });

    const activeDescendant =
      open && highlightedIndex >= 0
        ? `${listId}-option-${highlightedIndex}`
        : undefined;

    return (
      <SInputSelect ref={setRefs} {...props}>
        <SInputSelectTrigger
          ref={triggerRef}
          type="button"
          variant={variant}
          size={size}
          color={color}
          open={open}
          disabled={disabled}
          data-open={open ? 'true' : 'false'}
          data-multiselect={multiSelect ? 'true' : 'false'}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-activedescendant={activeDescendant}
          onKeyDown={handleListKeyDown}
          onClick={() => {
            if (disabled) {
              return;
            }

            setOpen(!open);
          }}
        >
          <SInputSelectValue>
            {valueContent ?? (
              <SInputSelectPlaceholder>{placeholder}</SInputSelectPlaceholder>
            )}
          </SInputSelectValue>
          <SInputSelectChevron open={open} aria-hidden>
            <ArrowBottomIcon width="1em" height="1em" />
          </SInputSelectChevron>
        </SInputSelectTrigger>

        {open && typeof document !== 'undefined'
          ? createPortal(
              <SInputSelectDropdown
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
                <SInputSelectOptions>
                  {optionCount > 0 ? (
                    options
                  ) : (
                    <SInputSelectEmpty>{noOptionsText}</SInputSelectEmpty>
                  )}
                </SInputSelectOptions>
              </SInputSelectDropdown>,
              document.body,
            )
          : null}
      </SInputSelect>
    );
  },
);

InputSelect.displayName = 'InputSelect';

export { InputSelect };
export default InputSelect;
