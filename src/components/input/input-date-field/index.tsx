import React, {
  KeyboardEvent,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { inputDateFieldClasses } from './classes';
import {
  clampDate,
  isDateDisabled,
} from '../../../helpers/date-adapter';
import { getDropdownPosition } from '../../../helpers/get-dropdown-position';
import type { TDropdownPlacement } from '../../../helpers/get-dropdown-position';
import { ArrowBottomIcon, ArrowRightIcon } from '../../../icons';
import { useDateAdapter } from '../../../providers/date-adapter-provider';
import { Button } from '../../button';
import { IconButton } from '../../icon-button';
import { Portal } from '../../portal';
import {
  SInputDateField,
  SInputDateFieldActions,
  SInputDateFieldCalendar,
  SInputDateFieldChevron,
  SInputDateFieldDay,
  SInputDateFieldDays,
  SInputDateFieldDropdown,
  SInputDateFieldHeader,
  SInputDateFieldMonthLabel,
  SInputDateFieldPicker,
  SInputDateFieldPlaceholder,
  SInputDateFieldText,
  SInputDateFieldTime,
  SInputDateFieldTrigger,
  SInputDateFieldValue,
  SInputDateFieldWeekday,
  SInputDateFieldWeekdays,
} from './styles';
import { TimeWheel } from './time-wheel';
import { TInputDateFieldProps } from './types';

type TPickerStep = 'date' | 'time';

const HOURS_24 = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: String(i).padStart(2, '0'),
}));
const HOURS_12 = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: String(i + 1).padStart(2, '0'),
}));
const MINUTES = Array.from({ length: 60 }, (_, i) => ({
  value: i,
  label: String(i).padStart(2, '0'),
}));
const PERIODS = [
  { value: 'AM', label: 'AM' },
  { value: 'PM', label: 'PM' },
];

const InputDateField = forwardRef<HTMLDivElement, TInputDateFieldProps>(
  (
    {
      value,
      defaultValue = null,
      onChange,
      mode = 'date',
      datePickerDisplayType = 'wheel',
      timePickerDisplayType = 'wheel',
      minDate = null,
      maxDate = null,
      adapter: adapterProp,
      ampm: ampmProp,
      placeholder,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      name,
      disabled = false,
      variant = 'subtle',
      size = 'md',
      color = 'primary',
      id,
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const listId = useId();
    const adapter = useDateAdapter(adapterProp);
    const ampm = ampmProp ?? adapter.is12HourCycleInCurrentLocale();

    const isOpenControlled = openProp !== undefined;
    const isValueControlled = value !== undefined;

    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const open = isOpenControlled ? Boolean(openProp) : uncontrolledOpen;
    const [step, setStep] = useState<TPickerStep>(
      mode === 'time' ? 'time' : 'date',
    );
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState<{
      top: number;
      left: number;
      width: number;
      placement: TDropdownPlacement;
    }>({
      top: 0,
      left: 0,
      width: 300,
      placement: 'bottom',
    });

    const [uncontrolledValue, setUncontrolledValue] = useState<Date | null>(
      defaultValue,
    );
    const selectedValue = isValueControlled ? (value ?? null) : uncontrolledValue;

    const today = useMemo(() => adapter.date(null) as Date, [adapter]);
    const [viewMonth, setViewMonth] = useState<Date>(() =>
      adapter.startOfMonth(selectedValue ?? today),
    );

    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
      if (!open) {
        return;
      }
      setStep(mode === 'time' ? 'time' : 'date');
    }, [open, mode]);

    const showDateStep =
      mode === 'date' || (mode === 'datetime' && step === 'date');
    const showTimeStep =
      mode === 'time' || (mode === 'datetime' && step === 'time');
    const showCalendar =
      showDateStep && datePickerDisplayType === 'calendar';
    const showDateWheels =
      showDateStep && datePickerDisplayType === 'wheel';
    const showTimePanel =
      showTimeStep && timePickerDisplayType === 'wheel';
    const showDateActions = showDateWheels;
    const showTimeActions = showTimePanel;

    const commit = useCallback(
      (next: Date | null, close = false) => {
        const clamped = clampDate(adapter, next, minDate, maxDate);
        if (!isValueControlled) {
          setUncontrolledValue(clamped);
        }
        onChange?.(clamped);
        if (close) {
          setOpen(false);
        }
      },
      [adapter, isValueControlled, maxDate, minDate, onChange, setOpen],
    );

    useEffect(() => {
      if (!isValueControlled) {
        return;
      }
      if (selectedValue != null && adapter.isValid(selectedValue)) {
        setViewMonth(adapter.startOfMonth(selectedValue));
      }
    }, [adapter, isValueControlled, selectedValue]);

    const updatePosition = useCallback(() => {
      const trigger = triggerRef.current;
      if (!trigger) {
        return;
      }
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(320, Math.max(rect.width, 280));
      const dropdownHeight =
        dropdownRef.current?.offsetHeight ||
        Math.min(380, window.innerHeight * 0.6);

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
    }, [open, updatePosition, mode, viewMonth, step, datePickerDisplayType]);

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

    const displayValue = useMemo(() => {
      if (selectedValue == null || !adapter.isValid(selectedValue)) {
        return null;
      }
      if (mode === 'time') {
        return adapter.format(
          selectedValue,
          ampm ? 'fullTime12h' : 'fullTime24h',
        );
      }
      if (mode === 'datetime') {
        return adapter.format(
          selectedValue,
          ampm ? 'keyboardDateTime12h' : 'keyboardDateTime24h',
        );
      }
      return adapter.format(selectedValue, 'fullDate');
    }, [adapter, ampm, mode, selectedValue]);

    const resolvedPlaceholder =
      placeholder ??
      (mode === 'time'
        ? 'Select time…'
        : mode === 'datetime'
          ? 'Select date and time…'
          : 'Select date…');

    const weeks = useMemo(
      () => (showCalendar ? adapter.getWeekArray(viewMonth) : []),
      [adapter, showCalendar, viewMonth],
    );

    const weekdays = useMemo(() => {
      if (!showCalendar || weeks.length === 0) {
        return [];
      }
      return weeks[0].map((day) => adapter.format(day, 'weekdayShort'));
    }, [adapter, showCalendar, weeks]);

    const baseDate = selectedValue ?? today;

    const selectedYear = adapter.getYear(baseDate);
    const selectedMonth = adapter.getMonth(baseDate);
    const selectedDay = adapter.getDate(baseDate);
    const selectedHours = adapter.getHours(baseDate);
    const selectedMinutes = adapter.getMinutes(baseDate);
    const selectedPeriod = selectedHours >= 12 ? 'PM' : 'AM';
    const selectedHour12 = selectedHours % 12 || 12;

    const yearItems = useMemo(() => {
      const minYear = minDate != null && adapter.isValid(minDate)
        ? adapter.getYear(minDate)
        : adapter.getYear(today) - 100;
      const maxYear = maxDate != null && adapter.isValid(maxDate)
        ? adapter.getYear(maxDate)
        : adapter.getYear(today) + 50;
      const items: Array<{ value: number; label: string }> = [];
      for (let year = minYear; year <= maxYear; year += 1) {
        items.push({ value: year, label: String(year) });
      }
      return items;
    }, [adapter, maxDate, minDate, today]);

    const monthItems = useMemo(() => {
      return Array.from({ length: 12 }, (_, month) => {
        const sample = adapter.setMonth(adapter.setDate(today, 1), month);
        return {
          value: month,
          label: adapter.format(sample, 'monthShort'),
        };
      });
    }, [adapter, today]);

    const daysInMonth = useMemo(() => {
      const first = adapter.setDate(
        adapter.setMonth(adapter.setYear(today, selectedYear), selectedMonth),
        1,
      );
      const nextMonth = adapter.startOfMonth(adapter.addMonths(first, 1));
      return adapter.getDate(adapter.addDays(nextMonth, -1));
    }, [adapter, selectedMonth, selectedYear, today]);

    const dayItems = useMemo(
      () =>
        Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          return {
            value: day,
            label: String(day).padStart(2, '0'),
          };
        }),
      [daysInMonth],
    );

    const applyDateParts = (year: number, month: number, day: number) => {
      if (disabled) {
        return;
      }
      const firstOfMonth = adapter.setDate(
        adapter.setMonth(adapter.setYear(baseDate, year), month),
        1,
      );
      const nextMonth = adapter.startOfMonth(adapter.addMonths(firstOfMonth, 1));
      const maxDay = adapter.getDate(adapter.addDays(nextMonth, -1));
      let next = adapter.setDate(firstOfMonth, Math.min(day, maxDay));
      if (mode === 'date') {
        next = adapter.startOfDay(next);
      }
      commit(next, false);
    };

    const handleYearSelect = (year: number) => {
      applyDateParts(year, selectedMonth, selectedDay);
    };

    const handleMonthSelect = (month: number) => {
      applyDateParts(selectedYear, month, selectedDay);
    };

    const handleDateDaySelect = (day: number) => {
      applyDateParts(selectedYear, selectedMonth, day);
    };

    const handleDateConfirm = () => {
      if (selectedValue == null || !adapter.isValid(selectedValue)) {
        commit(mode === 'date' ? adapter.startOfDay(baseDate) : baseDate, false);
      }
      if (mode === 'datetime') {
        setStep('time');
        return;
      }
      setOpen(false);
    };

    const canGoPrev = (() => {
      if (minDate == null || !adapter.isValid(minDate)) {
        return true;
      }
      const prevMonthEnd = adapter.endOfDay(
        adapter.addDays(adapter.startOfMonth(viewMonth), -1),
      );
      return !adapter.isBefore(prevMonthEnd, adapter.startOfDay(minDate));
    })();

    const canGoNext = (() => {
      if (maxDate == null || !adapter.isValid(maxDate)) {
        return true;
      }
      const nextMonthStart = adapter.startOfMonth(adapter.addMonths(viewMonth, 1));
      return !adapter.isAfter(nextMonthStart, adapter.endOfDay(maxDate));
    })();

    const handleDaySelect = (day: Date) => {
      if (disabled || isDateDisabled(adapter, day, minDate, maxDate)) {
        return;
      }

      let next = adapter.setYear(
        adapter.setMonth(
          adapter.setDate(baseDate, adapter.getDate(day)),
          adapter.getMonth(day),
        ),
        adapter.getYear(day),
      );

      if (mode === 'date') {
        next = adapter.startOfDay(next);
        commit(next, true);
        return;
      }

      commit(next, false);
      if (mode === 'datetime') {
        setStep('time');
      }
    };

    const handleHourSelect = (hour: number) => {
      if (disabled) {
        return;
      }
      let hours = hour;
      if (ampm) {
        const isPm = selectedPeriod === 'PM';
        if (hour === 12) {
          hours = isPm ? 12 : 0;
        } else {
          hours = isPm ? hour + 12 : hour;
        }
      }
      commit(adapter.setHours(baseDate, hours), false);
    };

    const handleMinuteSelect = (minute: number) => {
      if (disabled) {
        return;
      }
      commit(adapter.setMinutes(baseDate, minute), false);
    };

    const handlePeriodSelect = (period: 'AM' | 'PM') => {
      if (disabled || period === selectedPeriod) {
        return;
      }
      const hours = adapter.getHours(baseDate);
      const nextHours =
        period === 'PM'
          ? hours < 12
            ? hours + 12
            : hours
          : hours >= 12
            ? hours - 12
            : hours;
      commit(adapter.setHours(baseDate, nextHours), false);
    };

    const handleTimeBack = () => {
      if (mode === 'datetime') {
        setStep('date');
      }
    };

    const handleTimeOk = () => {
      if (selectedValue == null || !adapter.isValid(selectedValue)) {
        commit(baseDate, true);
        return;
      }
      setOpen(false);
    };

    const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }

      if (
        event.key === 'ArrowDown' ||
        event.key === 'Enter' ||
        event.key === ' '
      ) {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === 'Escape' && open) {
        event.preventDefault();
        setOpen(false);
      }
    };

    const hiddenValue =
      selectedValue != null && adapter.isValid(selectedValue)
        ? selectedValue.toISOString()
        : '';

    return (
      <SInputDateField ref={setRefs} {...props}
        className={mergeClasses(
          inputDateFieldClasses.root,
          disabled && inputDateFieldClasses.disabled,
          open && inputDateFieldClasses.open,
          className,
        )}>
        {name != null ? (
          <input
            type="hidden"
            name={name}
            value={hiddenValue}
            disabled={disabled}
          />
        ) : null}

        <SInputDateFieldTrigger
          ref={triggerRef}
          type="button"
          id={id}
          disabled={disabled}
          variant={variant}
          size={size}
          color={color}
          open={open}
          data-open={open ? 'true' : undefined}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          onClick={() => setOpen(!open)}
          onKeyDown={handleTriggerKeyDown}
        >
          <SInputDateFieldValue>
            {displayValue != null ? (
              <SInputDateFieldText>{displayValue}</SInputDateFieldText>
            ) : (
              <SInputDateFieldPlaceholder>
                {resolvedPlaceholder}
              </SInputDateFieldPlaceholder>
            )}
          </SInputDateFieldValue>
          <SInputDateFieldChevron open={open} aria-hidden>
            <ArrowBottomIcon />
          </SInputDateFieldChevron>
        </SInputDateFieldTrigger>

        {open ? (
          <Portal>
            <SInputDateFieldDropdown
              ref={dropdownRef}
              id={listId}
              role="dialog"
              aria-label={
                mode === 'time'
                  ? 'Time picker'
                  : mode === 'datetime'
                    ? 'Date and time picker'
                    : 'Date picker'
              }
              top={coords.top}
              left={coords.left}
              width={coords.width}
              placement={coords.placement}
              visible={visible}
            >
              <SInputDateFieldPicker>
                {showCalendar ? (
                  <SInputDateFieldCalendar>
                    <SInputDateFieldHeader>
                      <IconButton
                        type="button"
                        variant="ghost"
                        size="sm"
                        color="default"
                        aria-label="Previous month"
                        disabled={!canGoPrev}
                        onClick={() =>
                          setViewMonth(adapter.addMonths(viewMonth, -1))
                        }
                      >
                        <span
                          aria-hidden
                          style={{ display: 'inline-flex', transform: 'scaleX(-1)' }}
                        >
                          <ArrowRightIcon />
                        </span>
                      </IconButton>
                      <SInputDateFieldMonthLabel>
                        {adapter.format(viewMonth, 'month')}
                      </SInputDateFieldMonthLabel>
                      <IconButton
                        type="button"
                        variant="ghost"
                        size="sm"
                        color="default"
                        aria-label="Next month"
                        disabled={!canGoNext}
                        onClick={() =>
                          setViewMonth(adapter.addMonths(viewMonth, 1))
                        }
                      >
                        <ArrowRightIcon />
                      </IconButton>
                    </SInputDateFieldHeader>

                    <SInputDateFieldWeekdays>
                      {weekdays.map((label, index) => (
                        <SInputDateFieldWeekday
                          key={`${label}-${index}`}
                          color={color}
                        >
                          {label}
                        </SInputDateFieldWeekday>
                      ))}
                    </SInputDateFieldWeekdays>

                    <SInputDateFieldDays>
                      {weeks.flat().map((day) => {
                        const outside = !adapter.isSameMonth(day, viewMonth);
                        const selected =
                          selectedValue != null &&
                          adapter.isValid(selectedValue) &&
                          adapter.isSameDay(day, selectedValue);
                        const isToday = adapter.isSameDay(day, today);
                        const dayDisabled = isDateDisabled(
                          adapter,
                          day,
                          minDate,
                          maxDate,
                        );

                        return (
                          <SInputDateFieldDay
                            key={day.toISOString()}
                            type="button"
                            selected={selected}
                            today={isToday}
                            outside={outside}
                            disabled={dayDisabled}
                            color={color}
                            variant={variant}
                            aria-label={adapter.format(day, 'fullDate')}
                            aria-pressed={selected}
                            onClick={() => handleDaySelect(day)}
                          >
                            {adapter.format(day, 'dayOfMonth')}
                          </SInputDateFieldDay>
                        );
                      })}
                    </SInputDateFieldDays>
                  </SInputDateFieldCalendar>
                ) : null}

                {showDateWheels ? (
                  <>
                    <SInputDateFieldTime>
                      <TimeWheel
                        aria-label="Month"
                        items={monthItems}
                        value={selectedMonth}
                        color={color}
                        variant={variant}
                        disabled={disabled}
                        onChange={(next) => handleMonthSelect(Number(next))}
                      />
                      <TimeWheel
                        aria-label="Day"
                        items={dayItems}
                        value={Math.min(selectedDay, daysInMonth)}
                        color={color}
                        variant={variant}
                        disabled={disabled}
                        onChange={(next) => handleDateDaySelect(Number(next))}
                      />
                      <TimeWheel
                        aria-label="Year"
                        items={yearItems}
                        value={selectedYear}
                        color={color}
                        variant={variant}
                        disabled={disabled}
                        infinite={false}
                        onChange={(next) => handleYearSelect(Number(next))}
                      />
                    </SInputDateFieldTime>

                    {showDateActions ? (
                      <SInputDateFieldActions>
                        <Button
                          type="button"
                          size="sm"
                          color={color}
                          onClick={handleDateConfirm}
                        >
                          {mode === 'datetime' ? 'Next' : 'Confirm'}
                        </Button>
                      </SInputDateFieldActions>
                    ) : null}
                  </>
                ) : null}

                {showTimePanel ? (
                  <>
                    <SInputDateFieldTime>
                      <TimeWheel
                        aria-label="Hours"
                        items={ampm ? HOURS_12 : HOURS_24}
                        value={ampm ? selectedHour12 : selectedHours}
                        color={color}
                        variant={variant}
                        disabled={disabled}
                        onChange={(next) => handleHourSelect(Number(next))}
                      />
                      <TimeWheel
                        aria-label="Minutes"
                        items={MINUTES}
                        value={selectedMinutes}
                        color={color}
                        variant={variant}
                        disabled={disabled}
                        onChange={(next) => handleMinuteSelect(Number(next))}
                      />
                      {ampm ? (
                        <TimeWheel
                          aria-label="AM/PM"
                          items={PERIODS}
                          value={selectedPeriod}
                          color={color}
                          variant={variant}
                          disabled={disabled}
                          infinite={false}
                          onChange={(next) =>
                            handlePeriodSelect(next as 'AM' | 'PM')
                          }
                        />
                      ) : null}
                    </SInputDateFieldTime>

                    {showTimeActions ? (
                      <SInputDateFieldActions>
                        {mode === 'datetime' ? (
                          <Button
                            type="button"
                            variant={variant}
                            size="sm"
                            color={color}
                            onClick={handleTimeBack}
                          >
                            Back
                          </Button>
                        ) : null}
                        <Button
                          type="button"
                          size="sm"
                          color={color}
                          onClick={handleTimeOk}
                        >
                          Confirm
                        </Button>
                      </SInputDateFieldActions>
                    ) : null}
                  </>
                ) : null}
              </SInputDateFieldPicker>
            </SInputDateFieldDropdown>
          </Portal>
        ) : null}
      </SInputDateField>
    );
  },
);

InputDateField.displayName = 'InputDateField';

export type { TInputDateFieldProps, TDatePickerMode } from './types';
export type {
  TDatePickerDisplayType,
  TTimePickerDisplayType,
} from './types';
export { inputDateFieldClasses } from './classes';
export { InputDateField };
export default InputDateField;
