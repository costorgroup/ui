import type { TTheme } from '../../../theme/types';
import type { TThemeColorScale } from '../../../theme/theming/color/types';
import {
  accordionDetailsBackground,
  accordionShellVariantStyles,
  accordionSummaryDivider,
  accordionSummaryIdleColor,
} from '../accordion/variant-styles';
import type { TStaticVariant } from '../../variant-types';

export type TListVariant = TStaticVariant;

export const listShellVariantStyles = (
  variant: TListVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => accordionShellVariantStyles(variant, palette, theme);

export const listItemBackground = (
  variant: TListVariant,
  palette: TThemeColorScale,
  _theme?: TTheme,
) => accordionDetailsBackground(variant, palette);

export const listItemColor = (
  variant: TListVariant,
  palette: TThemeColorScale,
  _theme?: TTheme,
) => accordionSummaryIdleColor(variant, palette);

export const listItemDivider = (
  variant: TListVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => accordionSummaryDivider(variant, palette, theme);
