import type { TTheme } from '../theme/types';
import type { TThemeColorScale } from '../theme/theming/color/types';
import { SURFACE_BORDER_IDLE, CHROME_IDLE, CHROME_HOVER } from './idle-variant-styles';
import { chromeOpaqueFill, chromeTransparentFill, colorMix } from './surface';

export type TTrackVariant = 'solid' | 'subtle' | 'surface';

export const resolveTrackColor = (
  variant: TTrackVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'subtle':
    case 'surface':
      return chromeOpaqueFill(theme, CHROME_IDLE);
    case 'solid':
    default:
      return colorMix(palette.main, CHROME_HOVER);
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
