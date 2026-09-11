import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import {
  clampAppearance,
  DEFAULT_ALLOWED_APPEARANCES,
  prefersDarkMode,
  resolveMode,
  TThemeAppearance,
} from './appearance';
import { ThemeControllerContext } from './context';
import { createTheme } from './create-theme';
import type { TThemeOptions } from './create-theme/types';
import {
  defaultAccents,
  resolveAccent,
  TThemeAccent,
} from './palettes';
import {
  DEFAULT_STORAGE_KEY,
  readThemePrefs,
  TThemeStorageKind,
  writeThemePrefs,
} from './storage';

export type TThemeProviderProps = {
  children?: ReactNode;
  appearance?: TThemeAppearance;
  defaultAppearance?: TThemeAppearance;
  accent?: string;
  defaultAccent?: string;
  /** @deprecated use `accent` */
  palette?: string;
  /** @deprecated use `defaultAccent` */
  defaultPalette?: string;
  allowedAppearances?: TThemeAppearance[];
  /** @deprecated use `allowedAppearances` */
  allowedModes?: TThemeAppearance[];
  accents?: TThemeAccent[];
  /** @deprecated use `accents` */
  palettes?: TThemeAccent[];
  theme?: TThemeOptions;
  storageKey?: string;
  storage?: TThemeStorageKind;
  onAppearanceChange?: (appearance: TThemeAppearance) => void;
  onAccentChange?: (id: string) => void;
  /** @deprecated use `onAccentChange` */
  onPaletteChange?: (id: string) => void;
};

const ThemeProvider = ({
  children,
  appearance: appearanceProp,
  defaultAppearance,
  accent: accentProp,
  defaultAccent,
  palette: paletteProp,
  defaultPalette,
  allowedAppearances,
  allowedModes,
  accents: accentsProp,
  palettes,
  theme: themeOptions,
  storageKey: storageKeyProp,
  storage: storageProp,
  onAppearanceChange,
  onAccentChange,
  onPaletteChange,
}: TThemeProviderProps) => {
  const allowed =
    allowedAppearances ??
    allowedModes ??
    themeOptions?.allowedAppearances ??
    themeOptions?.allowedModes ??
    DEFAULT_ALLOWED_APPEARANCES;
  const accentList =
    accentsProp ?? palettes ?? themeOptions?.accents ?? themeOptions?.palettes ?? defaultAccents;
  const storageKey =
    storageKeyProp ?? themeOptions?.storageKey ?? DEFAULT_STORAGE_KEY;
  const storageKind = storageProp ?? themeOptions?.storage ?? 'localStorage';
  const resolvedDefaultAppearance =
    defaultAppearance ?? themeOptions?.defaultAppearance ?? 'dark';
  const resolvedDefaultAccent =
    defaultAccent ??
    defaultPalette ??
    themeOptions?.defaultAccent ??
    themeOptions?.accent;
  const controlledAccent = accentProp ?? paletteProp;

  const [appearanceState, setAppearanceState] = useState(() => {
    const stored = readThemePrefs(storageKind, storageKey)?.appearance;

    return clampAppearance(
      stored ?? resolvedDefaultAppearance,
      allowed,
    );
  });
  const [accentState, setAccentState] = useState(() => {
    const stored = readThemePrefs(storageKind, storageKey)?.accent;

    return resolveAccent(stored ?? resolvedDefaultAccent, accentList).id;
  });
  const [systemDark, setSystemDark] = useState(prefersDarkMode);

  const appearance = clampAppearance(
    appearanceProp ?? appearanceState,
    allowed,
  );
  const accent = resolveAccent(controlledAccent ?? accentState, accentList).id;

  useEffect(() => {
    if (appearance !== 'auto') {
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => setSystemDark(media.matches);

    sync();
    media.addEventListener('change', sync);

    return () => media.removeEventListener('change', sync);
  }, [appearance]);

  const mode = resolveMode(appearance, allowed, systemDark);

  const value = useMemo(
    () =>
      createTheme({
        ...themeOptions,
        appearance,
        mode,
        accent,
        accents: accentList,
        allowedAppearances: allowed,
        storageKey,
        storage: storageKind,
      }),
    [accent, accentList, allowed, appearance, mode, storageKey, storageKind, themeOptions],
  );

  const persist = useCallback(
    (next: { appearance?: TThemeAppearance; accent?: string }) => {
      writeThemePrefs(storageKind, storageKey, {
        appearance: next.appearance ?? appearance,
        accent: next.accent ?? accent,
      });
    },
    [accent, appearance, storageKey, storageKind],
  );

  const setAppearance = useCallback(
    (next: TThemeAppearance) => {
      const clamped = clampAppearance(next, allowed);

      if (appearanceProp === undefined) {
        setAppearanceState(clamped);
      }

      persist({ appearance: clamped });
      onAppearanceChange?.(clamped);
    },
    [allowed, appearanceProp, onAppearanceChange, persist],
  );

  const setAccent = useCallback(
    (id: string) => {
      const next = resolveAccent(id, accentList).id;

      if (controlledAccent === undefined) {
        setAccentState(next);
      }

      persist({ accent: next });
      onAccentChange?.(next);
      onPaletteChange?.(next);
    },
    [accentList, controlledAccent, onAccentChange, onPaletteChange, persist],
  );

  const controller = useMemo(
    () => ({ setAppearance, setAccent, setPalette: setAccent }),
    [setAccent, setAppearance],
  );

  return (
    <ThemeControllerContext.Provider value={controller}>
      <EmotionThemeProvider theme={value}>{children}</EmotionThemeProvider>
    </ThemeControllerContext.Provider>
  );
};

export default ThemeProvider;
export { ThemeProvider };
