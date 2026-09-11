import { clampAppearance, resolveMode } from '../appearance';
import { resolveAccent, resolveAccentPalette } from '../palettes';
import { DDefaultTheme } from '../data';
import { mergeColors } from '../helpers';
import { DEFAULT_STORAGE_KEY } from '../storage';
import {
  createBreakpoints,
  createModeColors,
  mergeComponents,
  mergeRadius,
  mergeTypography,
  resolveSizes,
  resolveSurfaces,
} from '../theming';
import { TTheme } from '../types';
import { TCreateTheme, TThemeOptions } from './types';

const configFromComponents = (components: TTheme['components']) => ({
  snackbarMinWidth: components.snackbar.minWidth,
  snackbarMaxWidth: components.snackbar.maxWidth,
});

export const createTheme: TCreateTheme = (options: TThemeOptions = {}): TTheme => {
  const allowedAppearances =
    options.allowedAppearances ??
    options.allowedModes ??
    DDefaultTheme.allowedAppearances;
  const accents = options.accents ?? options.palettes ?? DDefaultTheme.accents;
  const appearance = clampAppearance(
    options.appearance ?? options.defaultAppearance ?? DDefaultTheme.appearance,
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
  const density = options.density ?? DDefaultTheme.density;
  const typography = mergeTypography({
    ...options.typography,
    fontFamily: options.fontFamily ?? options.typography?.fontFamily,
  });
  const palette = mergeColors(
    mergeColors(
      mergeColors(
        mergeColors(DDefaultTheme.palette, createModeColors(mode)),
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
      unit: options.breakpoints?.unit ?? DDefaultTheme.breakpoints.unit,
      step: options.breakpoints?.step ?? DDefaultTheme.breakpoints.step,
      values: {
        ...DDefaultTheme.breakpoints.values,
        ...options.breakpoints?.values,
      },
    }),
    surfaces: resolveSurfaces(mode, options.surfaces),
    gap: {
      ...DDefaultTheme.gap,
      ...options.gap,
    },
    radius: mergeRadius(options.radius),
    density,
    sizes: resolveSizes(density, options.sizes),
    sizeScale: {
      ...DDefaultTheme.sizeScale,
      ...options.sizeScale,
    },
    spacing: options.spacing ?? DDefaultTheme.spacing,
    typography,
    zIndex: {
      ...DDefaultTheme.zIndex,
      ...options.zIndex,
    },
    shadows: options.shadows ?? DDefaultTheme.shadows,
    components,
    config: configFromComponents(components),
    storageKey: options.storageKey ?? DDefaultTheme.storageKey ?? DEFAULT_STORAGE_KEY,
    storage: options.storage ?? DDefaultTheme.storage,
    globalStyles: options.globalStyles ?? DDefaultTheme.globalStyles,
  };
};

export type { TCreateTheme, TThemeOptions } from './types';
