import { DateTime } from 'luxon';
import type {
  TDateAdapter,
  TDateAdapterFormats,
} from '../helpers/date-adapter/types';

const DEFAULT_FORMATS: TDateAdapterFormats = {
  month: 'MMMM yyyy',
  monthShort: 'MMM',
  weekdayShort: 'ccc',
  dayOfMonth: 'd',
  fullDate: 'MMM d, yyyy',
  keyboardDate: 'MM/dd/yyyy',
  fullTime12h: 'hh:mm a',
  fullTime24h: 'HH:mm',
  keyboardDateTime12h: 'MM/dd/yyyy hh:mm a',
  keyboardDateTime24h: 'MM/dd/yyyy HH:mm',
};

export type TAdapterLuxonOptions = {
  locale?: string;
  formats?: Partial<TDateAdapterFormats>;
};

const toDateTime = (value: Date, locale?: string) =>
  DateTime.fromJSDate(value).setLocale(locale ?? DateTime.local().locale);

export const createAdapterLuxon = (
  options: TAdapterLuxonOptions = {},
): TDateAdapter => {
  const locale = options.locale;
  const formats: TDateAdapterFormats = {
    ...DEFAULT_FORMATS,
    ...options.formats,
  };

  const adapter: TDateAdapter = {
    formats,

    date: (value) => {
      if (value == null || value === '') {
        return DateTime.now().setLocale(locale ?? DateTime.local().locale).toJSDate();
      }
      const next =
        value instanceof Date
          ? DateTime.fromJSDate(value)
          : typeof value === 'number'
            ? DateTime.fromMillis(value)
            : DateTime.fromISO(String(value));
      const localized = locale ? next.setLocale(locale) : next;
      return localized.isValid ? localized.toJSDate() : null;
    },

    isValid: (value) =>
      value != null && DateTime.fromJSDate(value).isValid,

    toJsDate: (value) => toDateTime(value, locale).toJSDate(),

    format: (value, key) => toDateTime(value, locale).toFormat(formats[key]),

    formatByString: (value, format) =>
      toDateTime(value, locale).toFormat(format),

    isEqual: (a, b) => {
      if (a == null || b == null) {
        return a === b;
      }
      return toDateTime(a, locale).equals(toDateTime(b, locale));
    },

    isSameDay: (a, b) =>
      toDateTime(a, locale).hasSame(toDateTime(b, locale), 'day'),

    isSameMonth: (a, b) =>
      toDateTime(a, locale).hasSame(toDateTime(b, locale), 'month'),

    isBefore: (a, b) =>
      toDateTime(a, locale) < toDateTime(b, locale),

    isAfter: (a, b) =>
      toDateTime(a, locale) > toDateTime(b, locale),

    startOfMonth: (value) =>
      toDateTime(value, locale).startOf('month').toJSDate(),

    startOfWeek: (value) =>
      toDateTime(value, locale).startOf('week').toJSDate(),

    startOfDay: (value) =>
      toDateTime(value, locale).startOf('day').toJSDate(),

    endOfDay: (value) => toDateTime(value, locale).endOf('day').toJSDate(),

    addMonths: (value, amount) =>
      toDateTime(value, locale).plus({ months: amount }).toJSDate(),

    addDays: (value, amount) =>
      toDateTime(value, locale).plus({ days: amount }).toJSDate(),

    getWeekArray: (value) => {
      let current = toDateTime(value, locale).startOf('month').startOf('week');
      const end = toDateTime(value, locale).endOf('month').endOf('week');
      const weeks: Date[][] = [];

      while (current <= end) {
        const week: Date[] = [];
        for (let i = 0; i < 7; i += 1) {
          week.push(current.toJSDate());
          current = current.plus({ days: 1 });
        }
        weeks.push(week);
      }

      return weeks;
    },

    getYear: (value) => toDateTime(value, locale).year,
    getMonth: (value) => toDateTime(value, locale).month - 1,
    getDate: (value) => toDateTime(value, locale).day,
    getHours: (value) => toDateTime(value, locale).hour,
    getMinutes: (value) => toDateTime(value, locale).minute,

    setYear: (value, year) =>
      toDateTime(value, locale).set({ year }).toJSDate(),
    setMonth: (value, month) =>
      toDateTime(value, locale).set({ month: month + 1 }).toJSDate(),
    setDate: (value, date) =>
      toDateTime(value, locale).set({ day: date }).toJSDate(),
    setHours: (value, hours) =>
      toDateTime(value, locale).set({ hour: hours }).toJSDate(),
    setMinutes: (value, minutes) =>
      toDateTime(value, locale).set({ minute: minutes }).toJSDate(),

    getCurrentLocaleCode: () =>
      locale ?? DateTime.local().locale ?? 'en-US',

    is12HourCycleInCurrentLocale: () => {
      const sample = toDateTime(new Date(2020, 0, 1, 13), locale).toFormat('t');
      return /am|pm/i.test(sample);
    },
  };

  return adapter;
};

export const AdapterLuxon = createAdapterLuxon();
export default AdapterLuxon;
