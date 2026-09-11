import type { TTheme } from '../theme/types';
import type { TThemeColorScale } from '../theme/theming/color/types';
import {
  PALETTE_TINT,
  staticChromeVariantStyles,
} from './idle-variant-styles';
import { colorMixBase } from './surface';
import type { TStaticVariant } from './variant-types';

/** Static chrome for typography — tints mix onto the page, not `palette.base`. */
export const typographyChromeStyles = (
  variant: TStaticVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  const chrome = staticChromeVariantStyles(variant, palette, theme);

  if (variant !== 'subtle' && variant !== 'surface') {
    return chrome;
  }

  return `
    ${chrome}
    background-color: ${colorMixBase(
      palette.main,
      PALETTE_TINT,
      theme.surfaces.background,
    )};
  `;
};
