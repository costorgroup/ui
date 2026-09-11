export const defaultIsValueEqual = <T>(a: T, b: T) => Object.is(a, b);

export const isFilledValue = (value: unknown) => {
  if (value == null || value === '') {
    return false;
  }

  if (Array.isArray(value) && value.length === 0) {
    return false;
  }

  return true;
};

export const isValueSelected = <T>(
  selected: T | T[] | undefined,
  option: T,
  eq: (a: T, b: T) => boolean,
  multi = false,
) => {
  if (selected == null) {
    return false;
  }

  if (multi) {
    return Array.isArray(selected) && selected.some((item) => eq(item, option));
  }

  return eq(selected as T, option);
};

export const toggleSelectedValue = <T>(
  selected: T | T[] | undefined,
  option: T,
  eq: (a: T, b: T) => boolean,
  multi = false,
): T | T[] => {
  if (!multi) {
    return option;
  }

  const current = Array.isArray(selected) ? selected : [];
  const exists = current.some((item) => eq(item, option));

  return exists
    ? current.filter((item) => !eq(item, option))
    : [...current, option];
};

export const toHtmlValue = (value: unknown): string | number | undefined => {
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  return undefined;
};
