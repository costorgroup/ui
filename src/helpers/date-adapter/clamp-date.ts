import type { TDateAdapter } from './types';

export const clampDate = (
  adapter: TDateAdapter,
  value: Date | null,
  minDate?: Date | null,
  maxDate?: Date | null,
): Date | null => {
  if (value == null || !adapter.isValid(value)) {
    return null;
  }

  let next = value;

  if (minDate != null && adapter.isValid(minDate) && adapter.isBefore(next, minDate)) {
    next = minDate;
  }

  if (maxDate != null && adapter.isValid(maxDate) && adapter.isAfter(next, maxDate)) {
    next = maxDate;
  }

  return next;
};

export const isDateDisabled = (
  adapter: TDateAdapter,
  value: Date,
  minDate?: Date | null,
  maxDate?: Date | null,
): boolean => {
  if (minDate != null && adapter.isValid(minDate)) {
    if (adapter.isBefore(adapter.endOfDay(value), adapter.startOfDay(minDate))) {
      return true;
    }
  }

  if (maxDate != null && adapter.isValid(maxDate)) {
    if (adapter.isAfter(adapter.startOfDay(value), adapter.endOfDay(maxDate))) {
      return true;
    }
  }

  return false;
};
