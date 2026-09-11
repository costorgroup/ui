import type { SerializedStyles } from '@emotion/react';
import type { TThemeAppearance, TThemeMode } from './appearance';
import type { TThemeAccent } from './palettes';
import type { TThemeStorageKind } from './storage';
import type {
  TThemeBreakpoints,
  TThemeColors,
  TThemeColorsOptions,
  TThemeComponents,
  TThemeConfig,
  TThemeDensity,
  TThemeGap,
  TThemeRadius,
  TThemeShadows,
  TThemeSizes,
  TThemeSizeScale,
  TThemeSpacing,
  TThemeSurfaceTokens,
  TThemeTypography,
  TThemeZIndex,
} from './theming';

export type { TThemeAppearance, TThemeMode } from './appearance';
export type {
  TThemeAccent,
  TThemeAccentColor,
  TThemeAccentPalette,
} from './palettes';
export type { TThemePrefs, TThemeStorageKind } from './storage';

export type {
  TThemeColorScale,
  TThemePaletteColors,
  TThemeCommonColors,
  TThemeGreyScale,
  TThemeColors,
  TThemeColorsOptions,
  TPaletteColor,
  TBreakpoint,
  TThemeBreakpointValues,
  TThemeBreakpoints,
  TThemeBreakpointsOptions,
  TThemeGap,
  TGap,
  TThemeRadius,
  TThemeSizeScale,
  TThemeSizeScaleKey,
  TThemeSpacing,
  TThemeTypography,
  TThemeTypographyHeading,
  TThemeTypographyText,
  TThemeTypographyVariant,
  TThemeTypographyOptions,
  TThemeFontWeightScale,
  TThemeZIndex,
  TThemeConfig,
  TThemeComponents,
  TThemeComponentsOptions,
  TThemeSnackbarConfig,
  TThemeDensity,
  TThemeSizeKey,
  TThemeSizeStep,
  TThemeSizes,
  TThemeSizesOptions,
  TThemeSurfaceTokens,
  TThemeSurfacesByMode,
  TThemeSurfacesOptions,
  TThemeShadows,
  TCreateColorScaleSteps,
  TCreateColorScaleOptions,
} from './theming';

export type TThemePalette = TThemeColors;
export type TThemePaletteOptions = TThemeColorsOptions;

export type TThemeGlobalStyles = SerializedStyles | ((theme: TTheme) => SerializedStyles);

export type TTheme = {
  fontFamily: string;
  appearance: TThemeAppearance;
  mode: TThemeMode;
  accent: string;
  accents: TThemeAccent[];
  /** @deprecated use `accents` */
  palettes: TThemeAccent[];
  allowedAppearances: TThemeAppearance[];
  /** @deprecated use `allowedAppearances` */
  allowedModes: TThemeAppearance[];
  palette: TThemePalette;
  /** @deprecated use `palette` */
  colors: TThemePalette;
  surfaces: TThemeSurfaceTokens;
  breakpoints: TThemeBreakpoints;
  gap: TThemeGap;
  radius: TThemeRadius;
  density: TThemeDensity;
  sizes: TThemeSizes;
  sizeScale: TThemeSizeScale;
  spacing: TThemeSpacing;
  typography: TThemeTypography;
  zIndex: TThemeZIndex;
  shadows: TThemeShadows;
  components: TThemeComponents;
  /** @deprecated use `components.snackbar` */
  config: TThemeConfig;
  storageKey: string;
  storage: TThemeStorageKind;
  globalStyles?: TThemeGlobalStyles;
};
