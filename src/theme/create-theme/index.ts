import { clampAppearance, DEFAULT_ALLOWED_APPEARANCES, resolveMode } from '../appearance';
import { defaultAccents, resolveAccent, resolveAccentPalette } from '../palettes';
import { mergeColors } from '../helpers';
import { defaultGlobalStyles } from '../global-styles';
import { DEFAULT_STORAGE_KEY } from '../storage';
import {
  breakpoints,
  colors,
  createBreakpoints,
  createModeColors,
  gap,
  mergeComponents,
  mergeRadius,
  mergeTypography,
  resolveSizes,
  resolveSurfaces,
  shadows,
  sizeScale,
  spacing,
  zIndex,
} from '../theming';
import { TTheme } from '../types';
import { TCreateTheme, TThemeOptions } from './types';

const DEFAULT_APPEARANCE = 'dark';
const DEFAULT_DENSITY = 'comfortable';
const DEFAULT_STORAGE_KIND = 'localStorage';

const configFromComponents = (components: TTheme['components']) => ({
  snackbarMinWidth: components.snackbar.minWidth,
  snackbarMaxWidth: components.snackbar.maxWidth,
});

export const createTheme: TCreateTheme = (options: TThemeOptions = {}): TTheme => {
  const allowedAppearances =
    options.allowedAppearances ??
    options.allowedModes ??
    DEFAULT_ALLOWED_APPEARANCES;
  const accents = options.accents ?? options.palettes ?? defaultAccents;
  const appearance = clampAppearance(
    options.appearance ?? options.defaultAppearance ?? DEFAULT_APPEARANCE,
    allowedAppearances,
  );
  const mode = options.mode ?? resolveMode(appearance, allowedAppearances);
  const activeAccent = resolveAccent(options.accent ?? options.defaultAccent, accents);
  const components = mergeComponents({
    snackbar: {
      ...options.config && {
        minWidth: options.config.snackbarMinWidth,
        maxWidth: options.config.snackbarMaxWidth,
      },
      ...options.components?.snackbar,
    },
  });
  const density = options.density ?? DEFAULT_DENSITY;
  const typography = mergeTypography({
    ...options.typography,
    fontFamily: options.fontFamily ?? options.typography?.fontFamily,
  });
  const palette = mergeColors(
    mergeColors(
      mergeColors(
        mergeColors(colors, createModeColors(mode)),
        resolveAccentPalette(activeAccent, mode),
      ),
      options.colors,
    ),
    options.palette,
  );

  return {
    fontFamily: typography.fontFamily,
    appearance,
    mode,
    accent: activeAccent.id,
    accents,
    palettes: accents,
    allowedAppearances,
    allowedModes: allowedAppearances,
    palette,
    colors: palette,
    breakpoints: createBreakpoints({
      unit: options.breakpoints?.unit ?? breakpoints.unit,
      step: options.breakpoints?.step ?? breakpoints.step,
      values: {
        ...breakpoints.values,
        ...options.breakpoints?.values,
      },
    }),
    surfaces: resolveSurfaces(mode, options.surfaces),
    gap: {
      ...gap,
      ...options.gap,
    },
    radius: mergeRadius(options.radius),
    density,
    sizes: resolveSizes(density, options.sizes),
    sizeScale: {
      ...sizeScale,
      ...options.sizeScale,
    },
    spacing: options.spacing ?? spacing,
    typography,
    zIndex: {
      ...zIndex,
      ...options.zIndex,
    },
    shadows: options.shadows ?? shadows,
    components,
    config: configFromComponents(components),
    storageKey: options.storageKey ?? DEFAULT_STORAGE_KEY,
    storage: options.storage ?? DEFAULT_STORAGE_KIND,
    globalStyles: options.globalStyles ?? defaultGlobalStyles,
  };
};

export type { TCreateTheme, TThemeOptions } from './types';
