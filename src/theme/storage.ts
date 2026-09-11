import type { TThemeAppearance } from './appearance';

export type TThemeStorageKind = 'localStorage' | 'cookie';

export type TThemePrefs = {
  appearance?: TThemeAppearance;
  accent?: string;
};

export const DEFAULT_STORAGE_KEY = 'cui-theme';

const isBrowser = () => typeof window !== 'undefined';

const readCookie = (key: string) => {
  if (!isBrowser()) {
    return null;
  }

  const encoded = encodeURIComponent(key);
  const match = document.cookie
    .split('; ')
    .find((part) => part.startsWith(`${encoded}=`));

  if (!match) {
    return null;
  }

  return decodeURIComponent(match.slice(encoded.length + 1));
};

const writeCookie = (key: string, value: string) => {
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)};path=/;max-age=31536000;SameSite=Lax`;
};

export const readThemePrefs = (
  storage: TThemeStorageKind,
  key: string,
): TThemePrefs | null => {
  if (!isBrowser()) {
    return null;
  }

  try {
    const raw =
      storage === 'cookie' ? readCookie(key) : window.localStorage.getItem(key);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as TThemePrefs;

    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
};

export const writeThemePrefs = (
  storage: TThemeStorageKind,
  key: string,
  prefs: TThemePrefs,
) => {
  if (!isBrowser()) {
    return;
  }

  const next = JSON.stringify(prefs);

  try {
    if (storage === 'cookie') {
      writeCookie(key, next);
      return;
    }

    window.localStorage.setItem(key, next);
  } catch {
    return;
  }
};
