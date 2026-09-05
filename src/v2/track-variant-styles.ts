import type { TTheme } from '../theme/types';
import type { TThemeColorScale } from '../theme/theming/color/types';
import { SURFACE_BORDER_IDLE } from './idle-variant-styles';
import { chromeTransparentFill } from './surface';

export type TTrackVariant = 'solid' | 'subtle' | 'surface';

export const resolveTrackColor = (
  variant: TTrackVariant,
  palette: TThemeColorScale,
  _theme: TTheme,
) => {
  switch (variant) {
    case 'subtle':
    case 'surface':
      return palette.subtle;
    case 'solid':
    default:
      return palette.muted;
  }
};

export const trackVariantStyles = (
  variant: TTrackVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  const trackColor = resolveTrackColor(variant, palette, theme);

  if (variant === 'surface') {
    return `
      background-color: ${trackColor};
      border: 1px solid ${chromeTransparentFill(theme, SURFACE_BORDER_IDLE)};
    `;
  }

  return `
    background-color: ${trackColor};
    border-color: transparent;
  `;
};

export const trackSurfaceBorder = (theme: TTheme) =>
  `1px solid ${chromeTransparentFill(theme, SURFACE_BORDER_IDLE)}`;

export const isSurfaceTrackVariant = (variant: TTrackVariant) =>
  variant === 'surface';
