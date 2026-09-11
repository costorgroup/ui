import { TThemeRadius } from './types';

const scale = {
  none: '0',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '20px',
  xl: '28px',
  pill: '9999px',
  full: '50%',
} as const;

export const radius: TThemeRadius = {
  ...scale,
  small: scale.sm,
  medium: scale.md,
  large: scale.lg,
  circle: scale.full,
};

export const mergeRadius = (override?: Partial<TThemeRadius>): TThemeRadius => {
  const next = { ...radius, ...override };

  return {
    ...next,
    small: override?.small ?? next.sm,
    medium: override?.medium ?? next.md,
    large: override?.large ?? next.lg,
    circle: override?.circle ?? next.full,
    sm: override?.sm ?? override?.small ?? next.sm,
    md: override?.md ?? override?.medium ?? next.md,
    lg: override?.lg ?? override?.large ?? next.lg,
    full: override?.full ?? override?.circle ?? next.full,
  };
};

export type { TThemeRadius } from './types';
