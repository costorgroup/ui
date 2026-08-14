export type TThemeColorScale = {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export type TThemePaletteColors = {
  default: TThemeColorScale;
  primary: TThemeColorScale;
  secondary: TThemeColorScale;
  success: TThemeColorScale;
  error: TThemeColorScale;
  warning: TThemeColorScale;
  info: TThemeColorScale;
  dark: TThemeColorScale;
  light: TThemeColorScale;
};

export type TThemeGreyScale = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export type TThemeCommonColors = {
  white: string;
  black: string;
  grey: TThemeGreyScale;
};

export type TThemeColors = TThemePaletteColors & {
  common: TThemeCommonColors;
};

export type TPaletteColor = keyof TThemePaletteColors;

export type TThemeColorsOptions = {
  [K in TPaletteColor]?: Partial<TThemeColorScale>;
} & {
  common?: Partial<TThemeCommonColors>;
};
