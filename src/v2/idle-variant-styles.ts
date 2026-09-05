import type { TStaticVariant } from './variant-types';
import type { TTheme } from '../theme/types';
import type { TThemeColorScale } from '../theme/theming/color/types';
import { chromeTransparentFill } from './surface';

export const CHROME_IDLE = 5;
export const SURFACE_BORDER_IDLE = 5;
/** Shell border when the track is transparent but children carry the chrome fill. */
export const SURFACE_SHELL_BORDER_IDLE = 10;

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
        backgroundColor: palette.subtle,
        borderColor: 'transparent',
        color: palette.fg,
      };
    case 'surface':
      return {
        backgroundColor: palette.subtle,
        borderColor: chromeTransparentFill(theme, SURFACE_BORDER_IDLE),
        color: palette.fg,
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
