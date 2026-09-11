export type TThemeMode = 'light' | 'dark';
export type TThemeAppearance = TThemeMode | 'auto';

export const THEME_APPEARANCES: TThemeAppearance[] = [
  'light',
  'dark',
  'auto',
];

export const DEFAULT_ALLOWED_MODES: TThemeAppearance[] = [
  'light',
  'dark',
  'auto',
];

export const DEFAULT_ALLOWED_APPEARANCES = DEFAULT_ALLOWED_MODES;

export const clampAppearance = (
  appearance: TThemeAppearance,
  allowedModes: readonly TThemeAppearance[],
): TThemeAppearance => {
  if (allowedModes.includes(appearance)) {
    return appearance;
  }

  return (
    allowedModes.find((item) => item !== 'auto') ?? allowedModes[0] ?? 'dark'
  );
};

export const prefersDarkMode = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const resolveMode = (
  appearance: TThemeAppearance,
  allowedModes: readonly TThemeAppearance[],
  systemDark = prefersDarkMode(),
): TThemeMode => {
  const next = clampAppearance(appearance, allowedModes);

  if (next !== 'auto') {
    return next;
  }

  return systemDark ? 'dark' : 'light';
};
