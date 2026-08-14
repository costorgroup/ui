export type TDateAdapterFormatKey =
  | 'month'
  | 'monthShort'
  | 'weekdayShort'
  | 'dayOfMonth'
  | 'fullDate'
  | 'keyboardDate'
  | 'fullTime12h'
  | 'fullTime24h'
  | 'keyboardDateTime12h'
  | 'keyboardDateTime24h';

export type TDateAdapterFormats = Record<TDateAdapterFormatKey, string>;

export type TDateAdapter = {
  formats: TDateAdapterFormats;
  date: (value?: string | number | Date | null) => Date | null;
  isValid: (value: Date | null) => boolean;
  toJsDate: (value: Date) => Date;
  format: (value: Date, key: TDateAdapterFormatKey) => string;
  formatByString: (value: Date, format: string) => string;
  isEqual: (a: Date | null, b: Date | null) => boolean;
  isSameDay: (a: Date, b: Date) => boolean;
  isSameMonth: (a: Date, b: Date) => boolean;
  isBefore: (a: Date, b: Date) => boolean;
  isAfter: (a: Date, b: Date) => boolean;
  startOfMonth: (value: Date) => Date;
  startOfWeek: (value: Date) => Date;
  startOfDay: (value: Date) => Date;
  endOfDay: (value: Date) => Date;
  addMonths: (value: Date, amount: number) => Date;
  addDays: (value: Date, amount: number) => Date;
  getWeekArray: (value: Date) => Date[][];
  getYear: (value: Date) => number;
  getMonth: (value: Date) => number;
  getDate: (value: Date) => number;
  getHours: (value: Date) => number;
  getMinutes: (value: Date) => number;
  setYear: (value: Date, year: number) => Date;
  setMonth: (value: Date, month: number) => Date;
  setDate: (value: Date, date: number) => Date;
  setHours: (value: Date, hours: number) => Date;
  setMinutes: (value: Date, minutes: number) => Date;
  getCurrentLocaleCode: () => string;
  is12HourCycleInCurrentLocale: () => boolean;
};
