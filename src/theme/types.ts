import type { SerializedStyles } from '@emotion/react';
import type {
  TThemeBreakpoints,
  TThemeColors,
  TThemeGap,
  TThemeRadius,
  TThemeSizeScale,
  TThemeSpacing,
  TThemeTypography,
  TThemeZIndex,
  TThemeConfig,
} from './theming';

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
  TThemeZIndex,
  TThemeConfig,
  TCreateColorScaleSteps,
  TCreateColorScaleOptions,
} from './theming';

export type TThemeGlobalStyles = SerializedStyles | ((theme: TTheme) => SerializedStyles);

export type TTheme = {
  fontFamily: string;
  colors: TThemeColors;
  breakpoints: TThemeBreakpoints;
  gap: TThemeGap;
  radius: TThemeRadius;
  sizeScale: TThemeSizeScale;
  spacing: TThemeSpacing;
  typography: TThemeTypography;
  zIndex: TThemeZIndex;
  config: TThemeConfig;
  globalStyles?: TThemeGlobalStyles;
};
