import { TGetInitials } from './types';

export const getInitials: TGetInitials = (value, options = {}) => {
  const { max = 2 } = options;

  if (!value) {
    return '';
  }

  const parts = value
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return '';
  }

  if (parts.length === 1) {
    return parts[0].slice(0, Math.max(max, 1)).toUpperCase();
  }

  return parts
    .slice(0, max)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
};

export type { TGetInitials, TGetInitialsOptions } from './types';
