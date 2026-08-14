import { TThemeColors, TThemeColorsOptions } from '../theming';

export type TMergeColors = (
  base: TThemeColors,
  override?: TThemeColorsOptions,
) => TThemeColors;
