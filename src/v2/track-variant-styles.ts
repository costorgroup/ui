import type { TTheme } from '../theme/types';
import type { TThemeColorScale } from '../theme/theming/color/types';
import { CHROME_FILL, CHROME_HOVER } from './idle-variant-styles';
import { colorMixBase } from './surface';

export type TTrackVariant = 'solid' | 'subtle' | 'surface';

const chromeTrack = (theme: TTheme) =>
  colorMixBase(theme.surfaces.mixer, CHROME_FILL, theme.surfaces.background);

export const resolveTrackColor = (
  variant: TTrackVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'subtle':
    case 'surface':
      return chromeTrack(theme);
    case 'solid':
    default: {
      const tint =
        palette === theme.palette.default ? theme.surfaces.ink : palette.main;

      return colorMixBase(tint, CHROME_HOVER, theme.surfaces.background);
    }
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
      border: 1px solid ${theme.surfaces.border};
    `;
  }

  return `
    background-color: ${trackColor};
    border: 1px solid transparent;
  `;
};

export const trackSurfaceBorder = (theme: TTheme) =>
  `1px solid ${theme.surfaces.border}`;

export const isSurfaceTrackVariant = (variant: TTrackVariant) =>
  variant === 'surface';
