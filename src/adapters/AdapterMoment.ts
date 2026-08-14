import moment, { type MomentInput } from 'moment';
import type {
  TDateAdapter,
  TDateAdapterFormats,
} from '../helpers/date-adapter/types';

const DEFAULT_FORMATS: TDateAdapterFormats = {
  month: 'MMMM YYYY',
  monthShort: 'MMM',
  weekdayShort: 'dd',
  dayOfMonth: 'D',
  fullDate: 'MMM D, YYYY',
  keyboardDate: 'MM/DD/YYYY',
  fullTime12h: 'hh:mm A',
  fullTime24h: 'HH:mm',
  keyboardDateTime12h: 'MM/DD/YYYY hh:mm A',
  keyboardDateTime24h: 'MM/DD/YYYY HH:mm',
};

export type TAdapterMomentOptions = {
  locale?: string;
  formats?: Partial<TDateAdapterFormats>;
};

const toMoment = (value: Date, locale?: string) => {
  const next = moment(value);
  return locale ? next.locale(locale) : next;
};

export const createAdapterMoment = (
  options: TAdapterMomentOptions = {},
): TDateAdapter => {
  const locale = options.locale;
  if (locale) {
    moment.locale(locale);
  }

  const formats: TDateAdapterFormats = {
    ...DEFAULT_FORMATS,
    ...options.formats,
  };

  const adapter: TDateAdapter = {
    formats,

    date: (value) => {
      if (value == null || value === '') {
        return moment().toDate();
      }
      const next = moment(value as MomentInput);
      return next.isValid() ? next.toDate() : null;
    },

    isValid: (value) => value != null && moment(value).isValid(),

    toJsDate: (value) => toMoment(value, locale).toDate(),

    format: (value, key) => toMoment(value, locale).format(formats[key]),

    formatByString: (value, format) =>
      toMoment(value, locale).format(format),

    isEqual: (a, b) => {
      if (a == null || b == null) {
        return a === b;
      }
      return toMoment(a, locale).isSame(toMoment(b, locale));
    },

    isSameDay: (a, b) =>
      toMoment(a, locale).isSame(toMoment(b, locale), 'day'),

    isSameMonth: (a, b) =>
      toMoment(a, locale).isSame(toMoment(b, locale), 'month'),

    isBefore: (a, b) =>
      toMoment(a, locale).isBefore(toMoment(b, locale)),

    isAfter: (a, b) => toMoment(a, locale).isAfter(toMoment(b, locale)),

    startOfMonth: (value) =>
      toMoment(value, locale).startOf('month').toDate(),

    startOfWeek: (value) =>
      toMoment(value, locale).startOf('week').toDate(),

    startOfDay: (value) => toMoment(value, locale).startOf('day').toDate(),

    endOfDay: (value) => toMoment(value, locale).endOf('day').toDate(),

    addMonths: (value, amount) =>
      toMoment(value, locale).add(amount, 'months').toDate(),

    addDays: (value, amount) =>
      toMoment(value, locale).add(amount, 'days').toDate(),

    getWeekArray: (value) => {
      let current = toMoment(value, locale).startOf('month').startOf('week');
      const end = toMoment(value, locale).endOf('month').endOf('week');
      const weeks: Date[][] = [];

      while (current.isBefore(end) || current.isSame(end, 'day')) {
        const week: Date[] = [];
        for (let i = 0; i < 7; i += 1) {
          week.push(current.toDate());
          current = current.clone().add(1, 'day');
        }
        weeks.push(week);
      }

      return weeks;
    },

    getYear: (value) => toMoment(value, locale).year(),
    getMonth: (value) => toMoment(value, locale).month(),
    getDate: (value) => toMoment(value, locale).date(),
    getHours: (value) => toMoment(value, locale).hours(),
    getMinutes: (value) => toMoment(value, locale).minutes(),

    setYear: (value, year) =>
      toMoment(value, locale).year(year).toDate(),
    setMonth: (value, month) =>
      toMoment(value, locale).month(month).toDate(),
    setDate: (value, date) =>
      toMoment(value, locale).date(date).toDate(),
    setHours: (value, hours) =>
      toMoment(value, locale).hours(hours).toDate(),
    setMinutes: (value, minutes) =>
      toMoment(value, locale).minutes(minutes).toDate(),

    getCurrentLocaleCode: () => moment.locale(),

    is12HourCycleInCurrentLocale: () => {
      const sample = moment().hours(13).format('LT');
      return /am|pm/i.test(sample);
    },
  };

  return adapter;
};

export const AdapterMoment = createAdapterMoment();
export default AdapterMoment;
