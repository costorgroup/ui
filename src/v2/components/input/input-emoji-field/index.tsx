import React, {
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { getDropdownPosition } from '../../../../helpers/get-dropdown-position';
import type { TDropdownPlacement } from '../../../../helpers/get-dropdown-position';
import { getNextListIndex } from '../../../../helpers/get-next-list-index';
import { ArrowBottomIcon, CloseIcon, SearchIcon } from '../../../../icons';
import { Portal } from '../../../../components/portal';
import { IconButton } from '../../icon-button';
import { Tab, Tabs } from '../../tabs';
import { TextField } from '../../text-field';
import { InputWrapper } from '../input-wrapper';
import { inputEmojiFieldClasses } from './classes';
import {
  EMOJI_CATEGORIES,
  EMOJIS,
  filterEmojis,
  type TEmojiCategoryId,
} from './data';
import {
  SInputEmojiField,
  SInputEmojiFieldCategories,
  SInputEmojiFieldChevron,
  SInputEmojiFieldCustomTrigger,
  SInputEmojiFieldDropdown,
  SInputEmojiFieldEmpty,
  SInputEmojiFieldGlyph,
  SInputEmojiFieldGrid,
  SInputEmojiFieldOption,
  SInputEmojiFieldPlaceholder,
  SInputEmojiFieldText,
  SInputEmojiFieldTrigger,
  SInputEmojiFieldValue,
} from './styles';
import { TInputEmojiFieldProps } from './types';

const GRID_COLUMNS = 8;

const InputEmojiField = forwardRef<HTMLDivElement, TInputEmojiFieldProps>(
  (
    {
      value,
      defaultValue = '',
      onChange,
      placeholder = 'Pick emoji…',
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      name,
      disabled = false,
      variant = 'subtle',
      size = 'md',
      color = 'default',
      emojis = EMOJIS,
      categories = EMOJI_CATEGORIES,
      trigger,
      id,
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const listId = useId();
    const searchId = useId();
    const isOpenControlled = openProp !== undefined;
    const isValueControlled = value !== undefined;

    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const open = isOpenControlled ? Boolean(openProp) : uncontrolledOpen;
    const [visible, setVisible] = useState(false);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<TEmojiCategoryId>(
      categories[0]?.id ?? 'smileys',
    );
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const selected = isValueControlled ? (value ?? '') : uncontrolledValue;
    const [highlighted, setHighlighted] = useState(0);
    const [coords, setCoords] = useState<{
      top: number;
      left: number;
      width: number;
      placement: TDropdownPlacement;
    }>({
      top: 0,
      left: 0,
      width: 320,
      placement: 'bottom',
    });

    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const selectedItem = useMemo(
      () => emojis.find((item) => item.emoji === selected),
      [emojis, selected],
    );
    const searching = query.trim().length > 0;
    const visibleEmojis = useMemo(
      () => filterEmojis(emojis, query, searching ? undefined : category),
      [category, emojis, query, searching],
    );

    const focusSearch = useCallback(() => {
      dropdownRef.current?.querySelector('input')?.focus();
    }, []);

    useEffect(() => {
      const index = visibleEmojis.findIndex((item) => item.emoji === selected);
      setHighlighted(index >= 0 ? index : visibleEmojis.length > 0 ? 0 : -1);
    }, [category, query, selected, visibleEmojis]);

    useEffect(() => {
      if (highlighted < 0) {
        return;
      }

      const option = gridRef.current?.querySelector<HTMLElement>(
        `[data-emoji-index="${highlighted}"]`,
      );
      option?.scrollIntoView({ block: 'nearest' });
    }, [highlighted]);

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

    const commit = useCallback(
      (next: string) => {
        if (!isValueControlled) {
          setUncontrolledValue(next);
        }
        onChange?.(next);
        setOpen(false);
      },
      [isValueControlled, onChange, setOpen],
    );

    const updatePosition = useCallback(() => {
      const trigger = triggerRef.current;
      if (!trigger) {
        return;
      }
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(320, Math.max(rect.width, 260));
      const dropdownHeight =
        dropdownRef.current?.offsetHeight ||
        Math.min(360, window.innerHeight * 0.5);

      setCoords(
        getDropdownPosition({
          trigger: rect,
          dropdownHeight,
          width,
          align: 'end',
        }),
      );
    }, []);

    useEffect(() => {
      if (!open) {
        setVisible(false);
        setQuery('');
        return;
      }

      updatePosition();
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => {
          setVisible(true);
          focusSearch();
        });
      });

      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }, [focusSearch, open, updatePosition]);

    useLayoutEffect(() => {
      if (!open) {
        return;
      }

      const handleReposition = () => updatePosition();
      window.addEventListener('resize', handleReposition);
      window.addEventListener('scroll', handleReposition, true);
      const trigger = triggerRef.current;
      const dropdown = dropdownRef.current;
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
      return () => document.removeEventListener('mousedown', handlePointerDown);
    }, [open, setOpen]);

    const moveHighlight = (delta: number) => {
      setHighlighted((current) =>
        getNextListIndex(current, delta, visibleEmojis.length),
      );
    };

    const handlePickerKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (visibleEmojis.length === 0) {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveHighlight(1);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveHighlight(-1);
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveHighlight(GRID_COLUMNS);
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveHighlight(-GRID_COLUMNS);
        return;
      }

      if (event.key === 'Home') {
        event.preventDefault();
        setHighlighted(0);
        return;
      }

      if (event.key === 'End') {
        event.preventDefault();
        setHighlighted(visibleEmojis.length - 1);
        return;
      }

      if (event.key === 'Enter') {
        const item = visibleEmojis[highlighted];

        if (item != null) {
          event.preventDefault();
          commit(item.emoji);
        }
      }
    };

    const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === 'Escape' && open) {
        event.preventDefault();
        setOpen(false);
      }
    };

    const customTrigger =
      trigger != null && isValidElement<{
        disabled?: boolean;
        'aria-haspopup'?: string;
        'aria-expanded'?: boolean;
        'aria-controls'?: string;
        onClick?: (event: ReactMouseEvent<HTMLElement>) => void;
      }>(trigger)
        ? cloneElement(trigger, {
            'aria-haspopup': 'dialog',
            'aria-expanded': open,
            'aria-controls': open ? listId : undefined,
            disabled: disabled || trigger.props.disabled,
            onClick: (event: ReactMouseEvent<HTMLElement>) => {
              trigger.props.onClick?.(event);
              if (!event.defaultPrevented && !disabled) {
                setOpen(!open);
              }
            },
          })
        : trigger;

    return (
      <SInputEmojiField
        ref={setRefs}
        customTrigger={trigger != null}
        {...props}
        className={mergeClasses(
          inputEmojiFieldClasses.root,
          disabled && inputEmojiFieldClasses.disabled,
          open && inputEmojiFieldClasses.open,
          className,
        )}
      >
        {name != null ? (
          <input type="hidden" name={name} value={selected} disabled={disabled} />
        ) : null}

        {trigger != null ? (
          <SInputEmojiFieldCustomTrigger ref={triggerRef}>
            {customTrigger}
          </SInputEmojiFieldCustomTrigger>
        ) : (
        <InputWrapper
          open={open}
          variant={variant}
          size={size}
          color={color}
          disabled={disabled}
          trigger
        >
          <SInputEmojiFieldTrigger
            ref={triggerRef as React.Ref<HTMLButtonElement>}
            type="button"
            id={id}
            size={size}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            onClick={() => setOpen(!open)}
            onKeyDown={handleTriggerKeyDown}
          >
            <SInputEmojiFieldValue>
              {selected ? (
                <>
                  <SInputEmojiFieldGlyph aria-hidden>
                    {selected}
                  </SInputEmojiFieldGlyph>
                  <SInputEmojiFieldText>
                    {selectedItem?.name ?? selected}
                  </SInputEmojiFieldText>
                </>
              ) : (
                <SInputEmojiFieldPlaceholder>
                  {placeholder}
                </SInputEmojiFieldPlaceholder>
              )}
            </SInputEmojiFieldValue>
            <SInputEmojiFieldChevron open={open} aria-hidden>
              <ArrowBottomIcon />
            </SInputEmojiFieldChevron>
          </SInputEmojiFieldTrigger>
        </InputWrapper>
        )}

        {open ? (
          <Portal>
            <SInputEmojiFieldDropdown
              ref={dropdownRef}
              id={listId}
              role="dialog"
              aria-label="Emoji picker"
              top={coords.top}
              left={coords.left}
              width={coords.width}
              placement={coords.placement}
              visible={visible}
            >
              <TextField
                id={searchId}
                size="xs"
                variant="subtle"
                color="default"
                autoFocus
                autoComplete="off"
                placeholder="Search Emojis"
                aria-label="Search Emojis"
                aria-controls={listId}
                aria-activedescendant={
                  highlighted >= 0 ? `${listId}-emoji-${highlighted}` : undefined
                }
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handlePickerKeyDown}
                startIcon={<SearchIcon />}
                endIcon={
                  query.length > 0 ? (
                    <IconButton
                      type="button"
                      size="xs"
                      variant="plain"
                      aria-label="Clear search"
                      style={{ pointerEvents: 'auto' }}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        setQuery('');
                        focusSearch();
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  ) : null
                }
              />

              {!searching ? (
                <SInputEmojiFieldCategories>
                  <Tabs
                    variant="plain"
                    color="info"
                    fullWidth={false}
                    draggable={false}
                    value={category}
                    onChange={(next) => setCategory(next as TEmojiCategoryId)}
                  >
                    {categories.map((item) => (
                      <Tab
                        key={item.id}
                        value={item.id}
                        aria-label={item.label}
                        title={item.label}
                      >
                        {item.icon}
                      </Tab>
                    ))}
                  </Tabs>
                </SInputEmojiFieldCategories>
              ) : null}

              {visibleEmojis.length > 0 ? (
                <SInputEmojiFieldGrid
                  ref={gridRef}
                  role="listbox"
                  aria-label="Emojis"
                >
                  {visibleEmojis.map((item, index) => (
                    <SInputEmojiFieldOption
                      key={`${item.category}-${item.emoji}-${item.name}`}
                      id={`${listId}-emoji-${index}`}
                      type="button"
                      role="option"
                      data-emoji-index={index}
                      data-highlighted={highlighted === index || undefined}
                      aria-selected={item.emoji === selected}
                      aria-label={item.name}
                      title={item.name}
                      tabIndex={-1}
                      onMouseEnter={() => setHighlighted(index)}
                      onClick={() => commit(item.emoji)}
                    >
                      {item.emoji}
                    </SInputEmojiFieldOption>
                  ))}
                </SInputEmojiFieldGrid>
              ) : (
                <SInputEmojiFieldEmpty>No emoji found</SInputEmojiFieldEmpty>
              )}
            </SInputEmojiFieldDropdown>
          </Portal>
        ) : null}
      </SInputEmojiField>
    );
  },
);

InputEmojiField.displayName = 'InputEmojiField';

export type { TInputEmojiFieldProps } from './types';
export type { TEmojiCategory, TEmojiCategoryId, TEmojiItem } from './data';
export { EMOJI_CATEGORIES, EMOJIS, filterEmojis } from './data';
export { inputEmojiFieldClasses } from './classes';
export { InputEmojiField };
export default InputEmojiField;
