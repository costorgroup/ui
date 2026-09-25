import React, {
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
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { inputSelectClasses } from './classes';
import { createPortal } from 'react-dom';
import { getDropdownPosition } from '../../../helpers/get-dropdown-position';
import type { TDropdownPlacement } from '../../../helpers/get-dropdown-position';
import { getNextListIndex } from '../../../helpers/get-next-list-index';
import { isSelectedOption } from '../../../helpers/is-selected-option';
import { ArrowBottomIcon } from '../../../icons';
import { useFormControlState } from '../../form-control/context';
import {
  defaultIsValueEqual,
  isValueSelected,
  toggleSelectedValue,
} from '../../form-control/value';
import { InputWrapper } from '../input-wrapper';
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
import { TInputSelectOptionProps } from '../input-select-option/types';
import { InputSelectOption } from '../input-select-option';
import {
  defaultGetOptionKey,
  defaultGetOptionLabel,
  labelsForValue,
} from '../list-options';
import { mergeSlotProps } from '../../../helpers/slot-props';

type TOptionElement<T> = ReactElement<TInputSelectOptionProps<T>>;

const InputSelectInner = <T,>(
  {
    children,
    options: optionsProp,
    getOptionLabel: getOptionLabelProp,
    getOptionKey: getOptionKeyProp,
    renderOption,
    value: valueProp,
    defaultValue,
    onChange,
    isValueEqual = defaultIsValueEqual,
    renderValue,
    placeholder = 'Select…',
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
    slotProps,
    ...props
  }: TInputSelectProps<T>,
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
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = isOpenControlled ? Boolean(openProp) : uncontrolledOpen;
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

  const allOptions = useOptions
    ? []
    : (Children.toArray(children).filter(isValidElement) as TOptionElement<T>[]);

  const isChildOptionSelected = (option: TOptionElement<T>) => {
    if (option.props['aria-selected'] != null) {
      return isSelectedOption(
        option as ReactElement<{ 'aria-selected'?: boolean | 'true' | 'false' }>,
      );
    }

    if (option.props.value === undefined) {
      return false;
    }

    return isValueSelected(
      currentValue,
      option.props.value,
      isValueEqual,
      multiSelect,
    );
  };

  const selectedChildOptions = allOptions.filter(isChildOptionSelected);
  const visibleChildOptions = allOptions.filter(
    (child) => !hideSelectedOptions || !isChildOptionSelected(child),
  );
  const visibleDataOptions = (optionsProp ?? []).filter(
    (option) =>
      !hideSelectedOptions ||
      !isValueSelected(currentValue, option, isValueEqual, multiSelect),
  );
  const optionCount = useOptions
    ? visibleDataOptions.length
    : visibleChildOptions.length;

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

  const commitValue = (
    event: ReactMouseEvent<HTMLButtonElement>,
    optionValue: T,
  ) => {
    const next = toggleSelectedValue(
      currentValue,
      optionValue,
      isValueEqual,
      multiSelect,
    );

    if (!isValueControlled && form.value === undefined) {
      setUncontrolledValue(next);
    }

    onChange?.(event, next);
    form.onChange?.(event, next);

    if (closeOnSelect) {
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const selectChildOption = (
    event: ReactMouseEvent<HTMLButtonElement>,
    option: TOptionElement<T>,
  ) => {
    option.props.onClick?.(event);

    if (event.defaultPrevented || option.props.value === undefined) {
      if (closeOnSelect) {
        setOpen(false);
        triggerRef.current?.focus();
      }

      return;
    }

    commitValue(event, option.props.value);
  };

  const selectHighlighted = () => {
    if (highlightedIndex < 0) {
      return;
    }

    optionRefs.current[highlightedIndex]?.click();
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
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
      default:
        break;
    }
  };

  const renderedValue = renderValue?.(currentValue);
  const fallbackValue = useOptions
    ? labelsForValue(currentValue, getOptionLabel)
    : selectedChildOptions.length > 0
      ? selectedChildOptions.map((option) => option.props.children)
      : null;
  const valueContent = renderedValue ?? fallbackValue;

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
    ? visibleDataOptions.map((option, index) => {
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
            {...mergeSlotProps(
              {
                id: `${listId}-option-${index}`,
                ref: (node: HTMLButtonElement | null) => {
                  optionRefs.current[index] = node;
                },
                value: option,
                'aria-selected': selected,
                'data-highlighted': highlighted ? 'true' : undefined,
                ...highlightHandlers(index),
                onClick: (event: ReactMouseEvent<HTMLButtonElement>) => {
                  commitValue(event, option);
                },
              },
              slotProps?.option,
            )}
          >
            {renderOption?.(option, { selected, highlighted }) ??
              getOptionLabel(option)}
          </InputSelectOption>
        );
      })
    : visibleChildOptions.map((option, index) =>
        cloneElement(option as ReactElement<Record<string, unknown>>, {
          id: `${listId}-option-${index}`,
          ref: (node: HTMLButtonElement | null) => {
            optionRefs.current[index] = node;
          },
          'aria-selected': isChildOptionSelected(option),
          'data-highlighted': highlightedIndex === index ? 'true' : undefined,
          ...highlightHandlers(index),
          onClick: (event: ReactMouseEvent<HTMLButtonElement>) => {
            selectChildOption(event, option);
          },
        }),
      );

  const activeDescendant =
    open && highlightedIndex >= 0
      ? `${listId}-option-${highlightedIndex}`
      : undefined;

  return (
    <SInputSelect
      ref={setRefs}
      {...props}
      className={mergeClasses(
        inputSelectClasses.root,
        form.disabled && inputSelectClasses.disabled,
        open && inputSelectClasses.open,
        className,
      )}
    >
      <InputWrapper
        {...mergeSlotProps(
          {
            open,
            variant: form.variant,
            size: form.size,
            color: form.color,
            disabled: form.disabled,
            error: form.error,
            trigger: true,
            actionBar,
          },
          slotProps?.wrapper,
        )}
      >
        <SInputSelectTrigger
          {...mergeSlotProps(
            {
              ref: triggerRef,
              type: 'button',
              id: id ?? form.id,
              size: form.size,
              disabled: form.disabled,
              'data-multiselect': multiSelect ? 'true' : 'false',
              'aria-haspopup': 'listbox',
              'aria-expanded': open,
              'aria-invalid': form.error || undefined,
              'aria-describedby': form.helperId,
              'aria-controls': open ? listId : undefined,
              'aria-activedescendant': activeDescendant,
              onKeyDown: handleListKeyDown,
              onClick: () => {
                if (form.disabled) {
                  return;
                }

                setOpen(!open);
              },
            },
            slotProps?.trigger,
          )}
        >
          <SInputSelectValue {...slotProps?.value}>
            {valueContent ?? (
              <SInputSelectPlaceholder {...slotProps?.placeholder}>
                {placeholder}
              </SInputSelectPlaceholder>
            )}
          </SInputSelectValue>
          <SInputSelectChevron
            {...mergeSlotProps(
              {
                open,
                'aria-hidden': true,
              },
              slotProps?.chevron,
            )}
          >
            <ArrowBottomIcon width="1em" height="1em" />
          </SInputSelectChevron>
        </SInputSelectTrigger>
      </InputWrapper>

      {open && typeof document !== 'undefined'
        ? createPortal(
            <SInputSelectDropdown
              {...mergeSlotProps(
                {
                  ref: dropdownRef,
                  id: listId,
                  top: coords.top,
                  left: coords.left,
                  width: coords.width,
                  placement: coords.placement,
                  visible,
                  color: form.color,
                  variant: form.variant,
                  role: 'listbox',
                  'aria-multiselectable': multiSelect || undefined,
                },
                slotProps?.dropdown,
              )}
            >
              <SInputSelectOptions {...slotProps?.listbox}>
                {optionCount > 0 ? (
                  options
                ) : (
                  <SInputSelectEmpty {...slotProps?.empty}>
                    {noOptionsText}
                  </SInputSelectEmpty>
                )}
              </SInputSelectOptions>
            </SInputSelectDropdown>,
            document.body,
          )
        : null}
    </SInputSelect>
  );
};

const InputSelect = forwardRef(InputSelectInner) as <T = unknown>(
  props: TInputSelectProps<T> & { ref?: Ref<HTMLDivElement> },
) => ReactElement | null;

(InputSelect as { displayName?: string }).displayName = 'InputSelect';

export type { TInputSelectSlotProps } from './types';
export { inputSelectClasses } from './classes';
export { InputSelect };
export default InputSelect;
