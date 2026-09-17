import { ReactNode } from 'react';

export type TOptionRenderState = {
  selected: boolean;
  highlighted: boolean;
};

export type TFilterOptionsState<T> = {
  inputValue: string;
  getOptionLabel: (option: T) => string;
};

export type TFilterOptions<T> = (
  options: T[],
  state: TFilterOptionsState<T>,
) => T[];

export const defaultGetOptionLabel = <T,>(option: T) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return String(option);
  }

  return String(option);
};

export const defaultGetOptionKey = <T,>(
  option: T,
  index: number,
  getOptionLabel: (option: T) => string,
) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return String(option);
  }

  return `${getOptionLabel(option)}-${index}`;
};

export const defaultFilterOptions = <T,>(
  options: T[],
  { inputValue, getOptionLabel }: TFilterOptionsState<T>,
) => {
  const query = inputValue.trim().toLowerCase();

  if (!query) {
    return options;
  }

  return options.filter((option) =>
    getOptionLabel(option).toLowerCase().includes(query),
  );
};

export const labelsForValue = <T,>(
  value: T | T[] | undefined,
  getOptionLabel: (option: T) => string,
): ReactNode => {
  if (value == null) {
    return null;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return null;
    }

    return value.map(getOptionLabel).join(', ');
  }

  return getOptionLabel(value);
};
