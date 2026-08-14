import { formatDateByString } from './format-by-string';
import type { TDateAdapter, TDateAdapterFormats } from './types';

const DEFAULT_FORMATS: TDateAdapterFormats = {
  month: 'MMMM yyyy',
  monthShort: 'MMM',
  weekdayShort: 'EEE',
  dayOfMonth: 'd',
  fullDate: 'MMM d, yyyy',
  keyboardDate: 'MM/dd/yyyy',
  fullTime12h: 'hh:mm a',
  fullTime24h: 'HH:mm',
  keyboardDateTime12h: 'MM/dd/yyyy hh:mm a',
  keyboardDateTime24h: 'MM/dd/yyyy HH:mm',
};

const clone = (value: Date) => new Date(value.getTime());

const getWeekStartsOn = (locale: string): number => {
  try {
    const loc = new Intl.Locale(locale) as Intl.Locale & {
      weekInfo?: { firstDay?: number };
    };
    const firstDay = loc.weekInfo?.firstDay;
    if (typeof firstDay === 'number') {
      // Intl: 1=Monday … 7=Sunday → JS: 0=Sunday … 6=Saturday
      return firstDay === 7 ? 0 : firstDay;
    }
  } catch {
    // ignore
  }
  return 0;
};

export type TAdapterDateOptions = {
  locale?: string;
  formats?: Partial<TDateAdapterFormats>;
};

export const createAdapterDate = (
  options: TAdapterDateOptions = {},
): TDateAdapter => {
  const locale = options.locale ?? 'en-US';
  const formats: TDateAdapterFormats = {
    ...DEFAULT_FORMATS,
    ...options.formats,
  };

  const adapter: TDateAdapter = {
    formats,

    date: (value) => {
      if (value == null || value === '') {
        return new Date();
      }
      const next = value instanceof Date ? clone(value) : new Date(value);
      return Number.isNaN(next.getTime()) ? null : next;
    },

    isValid: (value) => value != null && !Number.isNaN(value.getTime()),

    toJsDate: (value) => clone(value),

    format: (value, key) => adapter.formatByString(value, formats[key]),

    formatByString: (value, format) => formatDateByString(value, format),

    isEqual: (a, b) => {
      if (a == null || b == null) {
        return a === b;
      }
      return a.getTime() === b.getTime();
    },

    isSameDay: (a, b) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate(),

    isSameMonth: (a, b) =>
      a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth(),

    isBefore: (a, b) => a.getTime() < b.getTime(),

    isAfter: (a, b) => a.getTime() > b.getTime(),

    startOfMonth: (value) => {
      const next = clone(value);
      next.setDate(1);
      next.setHours(0, 0, 0, 0);
      return next;
    },

    startOfWeek: (value) => {
      const next = adapter.startOfDay(value);
      const weekStartsOn = getWeekStartsOn(locale);
      const day = next.getDay();
      const diff = (day - weekStartsOn + 7) % 7;
      next.setDate(next.getDate() - diff);
      return next;
    },

    startOfDay: (value) => {
      const next = clone(value);
      next.setHours(0, 0, 0, 0);
      return next;
    },

    endOfDay: (value) => {
      const next = clone(value);
      next.setHours(23, 59, 59, 999);
      return next;
    },

    addMonths: (value, amount) => {
      const next = clone(value);
      const day = next.getDate();
      next.setDate(1);
      next.setMonth(next.getMonth() + amount);
      const daysInMonth = new Date(
        next.getFullYear(),
        next.getMonth() + 1,
        0,
      ).getDate();
      next.setDate(Math.min(day, daysInMonth));
      return next;
    },

    addDays: (value, amount) => {
      const next = clone(value);
      next.setDate(next.getDate() + amount);
      return next;
    },

    getWeekArray: (value) => {
      const start = adapter.startOfWeek(adapter.startOfMonth(value));
      const lastDayOfMonth = adapter.addDays(
        adapter.startOfMonth(adapter.addMonths(value, 1)),
        -1,
      );
      const end = adapter.addDays(adapter.startOfWeek(lastDayOfMonth), 6);
      const weeks: Date[][] = [];
      let current = start;

      while (adapter.isBefore(current, end) || adapter.isSameDay(current, end)) {
        const week: Date[] = [];
        for (let i = 0; i < 7; i += 1) {
          week.push(current);
          current = adapter.addDays(current, 1);
        }
        weeks.push(week);
      }

      return weeks;
    },

    getYear: (value) => value.getFullYear(),
    getMonth: (value) => value.getMonth(),
    getDate: (value) => value.getDate(),
    getHours: (value) => value.getHours(),
    getMinutes: (value) => value.getMinutes(),

    setYear: (value, year) => {
      const next = clone(value);
      next.setFullYear(year);
      return next;
    },

    setMonth: (value, month) => {
      const next = clone(value);
      next.setMonth(month);
      return next;
    },

    setDate: (value, date) => {
      const next = clone(value);
      next.setDate(date);
      return next;
    },

    setHours: (value, hours) => {
      const next = clone(value);
      next.setHours(hours);
      return next;
    },

    setMinutes: (value, minutes) => {
      const next = clone(value);
      next.setMinutes(minutes);
      return next;
    },

    getCurrentLocaleCode: () => locale,

    is12HourCycleInCurrentLocale: () => {
      try {
        const parts = new Intl.DateTimeFormat(locale, {
          hour: 'numeric',
        }).formatToParts(new Date(2020, 0, 1, 13));
        return parts.some((part) => part.type === 'dayPeriod');
      } catch {
        return true;
      }
    },
  };

  return adapter;
};

export const AdapterDate = createAdapterDate();
