import type {
  TThemeBreakpointsOptions,
  TThemeColorsOptions,
  TThemeGap,
  TThemeRadius,
  TThemeSizeScale,
  TThemeSpacing,
  TThemeTypography,
  TThemeZIndex,
} from '../theming';
import type { TTheme, TThemeGlobalStyles } from '../types';

export type TThemeOptions = {
  fontFamily?: string;
  colors?: TThemeColorsOptions;
  breakpoints?: TThemeBreakpointsOptions;
  gap?: Partial<TThemeGap>;
  radius?: Partial<TThemeRadius>;
  sizeScale?: Partial<TThemeSizeScale>;
  spacing?: TThemeSpacing;
  typography?: {
    heading?: Partial<TThemeTypography['heading']>;
    text?: Partial<TThemeTypography['text']>;
    fontWeight?: Partial<TThemeTypography['fontWeight']>;
    lineHeight?: Partial<TThemeTypography['lineHeight']>;
  };
  zIndex?: Partial<TThemeZIndex>;
  globalStyles?: TThemeGlobalStyles;
};

export type TCreateTheme = (options?: TThemeOptions) => TTheme;
