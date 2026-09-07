import type { TStaticVariant } from './variant-types';
import type { TTheme } from '../theme/types';
import type { TThemeColorScale } from '../theme/theming/color/types';
import { paletteTint } from './surface';

/** Soft track / shell fill. */
export const CHROME_FILL = 10;
/** Opaque chrome: mix `base.contrastText` onto `base.main`. */
export const CHROME_IDLE = 5;
/** Hover / expanded chrome mix. */
export const CHROME_HOVER = 10;
/** Focus / pressed chrome mix. */
export const CHROME_FOCUS = 15;
/** Picked-color fill mix for subtle / surface. */
export const PALETTE_TINT = 15;
/** Chrome border mix on idle. */
export const SURFACE_BORDER_IDLE = 30;
/** Chrome border mix on hover. */
export const SURFACE_BORDER_HOVER = 50;

export type TIdleChromeVariant = 'solid' | 'subtle' | 'surface';

export type TIdleVariantAppearance = {
  backgroundColor: string;
  borderColor: string;
  color: string;
};

export type TStaticChromeVariant = TStaticVariant;

export const idleVariantAppearance = (
  variant: TIdleChromeVariant,
  palette: TThemeColorScale,
  theme: TTheme,
): TIdleVariantAppearance => {
  switch (variant) {
    case 'solid':
      return {
        backgroundColor: palette.main,
        borderColor: palette.main,
        color: palette.contrastText,
      };
    case 'subtle':
      return {
        backgroundColor: paletteTint(theme, palette.main, PALETTE_TINT),
        borderColor: 'transparent',
        color: palette.main,
      };
    case 'surface':
      return {
        backgroundColor: paletteTint(theme, palette.main, PALETTE_TINT),
        borderColor: palette.main,
        color: palette.main,
      };
  }
};

/** Idle chrome for static elements (Code, Kbd) — matches Button border/bg/text without hover. */
export const staticChromeVariantStyles = (
  variant: TStaticChromeVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'outline':
      return `
        background-color: transparent;
        color: ${palette.main};
        border-color: ${palette.main};
      `;
    case 'plain':
      return `
        background-color: transparent;
        color: ${palette.main};
        border-color: transparent;
      `;
    default: {
      const idle = idleVariantAppearance(variant, palette, theme);

      return `
        background-color: ${idle.backgroundColor};
        color: ${idle.color};
        border-color: ${idle.borderColor};
      `;
    }
  }
};
