import type {
  TThemeDensity,
  TThemeSizeKey,
  TThemeSizeStep,
  TThemeSizes,
  TThemeSizesOptions,
} from './types';

const COMFORTABLE: TThemeSizes = {
  xs: {
    height: '28px',
    padX: '10px',
    padY: '4px',
    gap: '4px',
    fontSize: '11px',
    icon: '14px',
  },
  sm: {
    height: '32px',
    padX: '12px',
    padY: '6px',
    gap: '6px',
    fontSize: '12px',
    icon: '16px',
  },
  md: {
    height: '36px',
    padX: '16px',
    padY: '8px',
    gap: '6px',
    fontSize: '13px',
    icon: '18px',
  },
  lg: {
    height: '40px',
    padX: '18px',
    padY: '10px',
    gap: '8px',
    fontSize: '14px',
    icon: '20px',
  },
  xl: {
    height: '48px',
    padX: '20px',
    padY: '12px',
    gap: '8px',
    fontSize: '15px',
    icon: '24px',
  },
};

const COMPACT: TThemeSizes = {
  xs: {
    height: '24px',
    padX: '8px',
    padY: '2px',
    gap: '4px',
    fontSize: '11px',
    icon: '12px',
  },
  sm: {
    height: '28px',
    padX: '10px',
    padY: '4px',
    gap: '4px',
    fontSize: '12px',
    icon: '14px',
  },
  md: {
    height: '32px',
    padX: '12px',
    padY: '6px',
    gap: '6px',
    fontSize: '13px',
    icon: '16px',
  },
  lg: {
    height: '36px',
    padX: '14px',
    padY: '8px',
    gap: '6px',
    fontSize: '13px',
    icon: '18px',
  },
  xl: {
    height: '40px',
    padX: '16px',
    padY: '10px',
    gap: '8px',
    fontSize: '14px',
    icon: '20px',
  },
};

const KEYS: TThemeSizeKey[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const resolveSizes = (
  density: TThemeDensity = 'comfortable',
  override?: TThemeSizesOptions,
): TThemeSizes => {
  const base = density === 'compact' ? COMPACT : COMFORTABLE;

  return KEYS.reduce((acc, key) => {
    acc[key] = { ...base[key], ...override?.[key] };
    return acc;
  }, {} as TThemeSizes);
};

export const sizes = resolveSizes();

export type {
  TThemeDensity,
  TThemeSizeKey,
  TThemeSizeStep,
  TThemeSizes,
  TThemeSizesOptions,
} from './types';
