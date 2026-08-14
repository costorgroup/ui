const pad = (value: number, length = 2) => String(value).padStart(length, '0');

const monthNamesLong = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const monthNamesShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const weekdayNamesShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/** Longer tokens first so `MMMM` wins over `MM`, `dd` over `d`, etc. */
const FORMAT_TOKEN =
  /yyyy|MMMM|MMM|MM|EEE|dd|HH|hh|mm|d|a/g;

/** Token formatter for native Date (yyyy, MM, dd, HH, hh, mm, a, MMMM, MMM, EEE, d). */
export const formatDateByString = (value: Date, format: string): string => {
  const year = value.getFullYear();
  const month = value.getMonth();
  const date = value.getDate();
  const hours24 = value.getHours();
  const minutes = value.getMinutes();
  const hours12 = hours24 % 12 || 12;
  const ampm = hours24 < 12 ? 'AM' : 'PM';

  return format.replace(FORMAT_TOKEN, (token) => {
    switch (token) {
      case 'yyyy':
        return String(year);
      case 'MMMM':
        return monthNamesLong[month];
      case 'MMM':
        return monthNamesShort[month];
      case 'MM':
        return pad(month + 1);
      case 'EEE':
        return weekdayNamesShort[value.getDay()];
      case 'dd':
        return pad(date);
      case 'd':
        return String(date);
      case 'HH':
        return pad(hours24);
      case 'hh':
        return pad(hours12);
      case 'mm':
        return pad(minutes);
      case 'a':
        return ampm;
      default:
        return token;
    }
  });
};
