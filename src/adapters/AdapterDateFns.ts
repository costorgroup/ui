import {
  addDays,
  addMonths,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format as formatDateFns,
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  isSameMonth,
  isValid,
  parseISO,
  setDate,
  setHours,
  setMinutes,
  setMonth,
  setYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import type { Locale } from 'date-fns';
import type {
  TDateAdapter,
  TDateAdapterFormats,
} from '../helpers/date-adapter/types';

const DEFAULT_FORMATS: TDateAdapterFormats = {
  month: 'MMMM yyyy',
  monthShort: 'MMM',
  weekdayShort: 'EEEEEE',
  dayOfMonth: 'd',
  fullDate: 'MMM d, yyyy',
  keyboardDate: 'MM/dd/yyyy',
  fullTime12h: 'hh:mm a',
  fullTime24h: 'HH:mm',
  keyboardDateTime12h: 'MM/dd/yyyy hh:mm a',
  keyboardDateTime24h: 'MM/dd/yyyy HH:mm',
};

export type TAdapterDateFnsOptions = {
  locale?: Locale;
  formats?: Partial<TDateAdapterFormats>;
};

export const createAdapterDateFns = (
  options: TAdapterDateFnsOptions = {},
): TDateAdapter => {
  const locale = options.locale;
  const formats: TDateAdapterFormats = {
    ...DEFAULT_FORMATS,
    ...options.formats,
  };

  const withLocale = { locale };

  const adapter: TDateAdapter = {
    formats,

    date: (value) => {
      if (value == null || value === '') {
        return new Date();
      }
      if (value instanceof Date) {
        return isValid(value) ? new Date(value.getTime()) : null;
      }
      if (typeof value === 'number') {
        const next = new Date(value);
        return isValid(next) ? next : null;
      }
      const next = parseISO(String(value));
      return isValid(next) ? next : null;
    },

    isValid: (value) => value != null && isValid(value),

    toJsDate: (value) => new Date(value.getTime()),

    format: (value, key) =>
      formatDateFns(value, formats[key], withLocale),

    formatByString: (value, format) =>
      formatDateFns(value, format, withLocale),

    isEqual: (a, b) => {
      if (a == null || b == null) {
        return a === b;
      }
      return isEqual(a, b);
    },

    isSameDay: (a, b) => isSameDay(a, b),

    isSameMonth: (a, b) => isSameMonth(a, b),

    isBefore: (a, b) => isBefore(a, b),

    isAfter: (a, b) => isAfter(a, b),

    startOfMonth: (value) => startOfMonth(value),

    startOfWeek: (value) => startOfWeek(value, withLocale),

    startOfDay: (value) => startOfDay(value),

    endOfDay: (value) => endOfDay(value),

    addMonths: (value, amount) => addMonths(value, amount),

    addDays: (value, amount) => addDays(value, amount),

    getWeekArray: (value) => {
      let current = startOfWeek(startOfMonth(value), withLocale);
      const end = endOfWeek(endOfMonth(value), withLocale);
      const weeks: Date[][] = [];

      while (isBefore(current, end) || isSameDay(current, end)) {
        const week: Date[] = [];
        for (let i = 0; i < 7; i += 1) {
          week.push(current);
          current = addDays(current, 1);
        }
        weeks.push(week);
      }

      return weeks;
    },

    getYear: (value) => getYear(value),
    getMonth: (value) => getMonth(value),
    getDate: (value) => getDate(value),
    getHours: (value) => getHours(value),
    getMinutes: (value) => getMinutes(value),

    setYear: (value, year) => setYear(value, year),
    setMonth: (value, month) => setMonth(value, month),
    setDate: (value, date) => setDate(value, date),
    setHours: (value, hours) => setHours(value, hours),
    setMinutes: (value, minutes) => setMinutes(value, minutes),

    getCurrentLocaleCode: () => locale?.code ?? 'en-US',

    is12HourCycleInCurrentLocale: () => {
      const sample = formatDateFns(new Date(2020, 0, 1, 13), 'p', withLocale);
      return /am|pm/i.test(sample);
    },
  };

  return adapter;
};

export const AdapterDateFns = createAdapterDateFns();
export default AdapterDateFns;
