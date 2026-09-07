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
) => accordionDetailsBackground(variant, palette);

export const listItemColor = (
  variant: TListVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => accordionSummaryIdleColor(variant, palette, theme);

export const listItemDivider = (
  variant: TListVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => accordionSummaryDivider(variant, palette, theme);
