import type { TThemeAppearance, TThemeMode } from '../appearance';
import type { TThemeAccent } from '../palettes';
import type { TThemeStorageKind } from '../storage';
import type {
  TThemeBreakpointsOptions,
  TThemeColorsOptions,
  TThemeComponentsOptions,
  TThemeConfigOptions,
  TThemeDensity,
  TThemeGap,
  TThemeRadius,
  TThemeShadows,
  TThemeSizesOptions,
  TThemeSizeScale,
  TThemeSpacing,
  TThemeSurfacesOptions,
  TThemeTypographyOptions,
  TThemeZIndex,
} from '../theming';
import type { TTheme, TThemeGlobalStyles } from '../types';

export type TThemeOptions = {
  fontFamily?: string;
  appearance?: TThemeAppearance;
  mode?: TThemeMode;
  accent?: string;
  defaultAccent?: string;
  defaultAppearance?: TThemeAppearance;
  accents?: TThemeAccent[];
  /** @deprecated use `accents` */
  palettes?: TThemeAccent[];
  allowedAppearances?: TThemeAppearance[];
  /** @deprecated use `allowedAppearances` */
  allowedModes?: TThemeAppearance[];
  palette?: TThemeColorsOptions;
  /** @deprecated use `palette` */
  colors?: TThemeColorsOptions;
  surfaces?: TThemeSurfacesOptions;
  breakpoints?: TThemeBreakpointsOptions;
  gap?: Partial<TThemeGap>;
  radius?: Partial<TThemeRadius>;
  density?: TThemeDensity;
  sizes?: TThemeSizesOptions;
  sizeScale?: Partial<TThemeSizeScale>;
  spacing?: TThemeSpacing;
  typography?: TThemeTypographyOptions;
  zIndex?: Partial<TThemeZIndex>;
  shadows?: TThemeShadows;
  components?: TThemeComponentsOptions;
  /** @deprecated use `components.snackbar` */
  config?: TThemeConfigOptions;
  storageKey?: string;
  storage?: TThemeStorageKind;
  globalStyles?: TThemeGlobalStyles;
};

export type TCreateTheme = (options?: TThemeOptions) => TTheme;
