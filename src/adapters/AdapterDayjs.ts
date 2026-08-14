import dayjs, { type ConfigType, type Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import type {
  TDateAdapter,
  TDateAdapterFormats,
} from '../helpers/date-adapter/types';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(localeData);

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

export type TAdapterDayjsOptions = {
  locale?: string;
  formats?: Partial<TDateAdapterFormats>;
};

const toDayjs = (value: Date): Dayjs => dayjs(value);

export const createAdapterDayjs = (
  options: TAdapterDayjsOptions = {},
): TDateAdapter => {
  const locale = options.locale;
  if (locale) {
    dayjs.locale(locale);
  }

  const formats: TDateAdapterFormats = {
    ...DEFAULT_FORMATS,
    ...options.formats,
  };

  const adapter: TDateAdapter = {
    formats,

    date: (value) => {
      if (value == null || value === '') {
        return dayjs().toDate();
      }
      const next = dayjs(value as ConfigType);
      return next.isValid() ? next.toDate() : null;
    },

    isValid: (value) => value != null && dayjs(value).isValid(),

    toJsDate: (value) => toDayjs(value).toDate(),

    format: (value, key) => toDayjs(value).format(formats[key]),

    formatByString: (value, format) => toDayjs(value).format(format),

    isEqual: (a, b) => {
      if (a == null || b == null) {
        return a === b;
      }
      return toDayjs(a).isSame(toDayjs(b));
    },

    isSameDay: (a, b) => toDayjs(a).isSame(toDayjs(b), 'day'),

    isSameMonth: (a, b) => toDayjs(a).isSame(toDayjs(b), 'month'),

    isBefore: (a, b) => toDayjs(a).isBefore(toDayjs(b)),

    isAfter: (a, b) => toDayjs(a).isAfter(toDayjs(b)),

    startOfMonth: (value) => toDayjs(value).startOf('month').toDate(),

    startOfWeek: (value) => toDayjs(value).startOf('week').toDate(),

    startOfDay: (value) => toDayjs(value).startOf('day').toDate(),

    endOfDay: (value) => toDayjs(value).endOf('day').toDate(),

    addMonths: (value, amount) => toDayjs(value).add(amount, 'month').toDate(),

    addDays: (value, amount) => toDayjs(value).add(amount, 'day').toDate(),

    getWeekArray: (value) => {
      const start = toDayjs(value).startOf('month').startOf('week');
      const end = toDayjs(value).endOf('month').endOf('week');
      const weeks: Date[][] = [];
      let current = start;

      while (current.isBefore(end) || current.isSame(end, 'day')) {
        const week: Date[] = [];
        for (let i = 0; i < 7; i += 1) {
          week.push(current.toDate());
          current = current.add(1, 'day');
        }
        weeks.push(week);
      }

      return weeks;
    },

    getYear: (value) => toDayjs(value).year(),
    getMonth: (value) => toDayjs(value).month(),
    getDate: (value) => toDayjs(value).date(),
    getHours: (value) => toDayjs(value).hour(),
    getMinutes: (value) => toDayjs(value).minute(),

    setYear: (value, year) => toDayjs(value).year(year).toDate(),
    setMonth: (value, month) => toDayjs(value).month(month).toDate(),
    setDate: (value, date) => toDayjs(value).date(date).toDate(),
    setHours: (value, hours) => toDayjs(value).hour(hours).toDate(),
    setMinutes: (value, minutes) => toDayjs(value).minute(minutes).toDate(),

    getCurrentLocaleCode: () => dayjs.locale(),

    is12HourCycleInCurrentLocale: () => {
      const sample = dayjs().hour(13).format('LT');
      return /am|pm/i.test(sample);
    },
  };

  return adapter;
};

export const AdapterDayjs = createAdapterDayjs();
export default AdapterDayjs;
