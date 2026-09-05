import type { TTheme } from '../../../theme/types';
import type { TThemeColorScale } from '../../../theme/theming/color/types';
import {
  idleVariantAppearance,
  SURFACE_BORDER_IDLE,
  type TIdleChromeVariant,
} from '../../idle-variant-styles';
import { chromeTransparentFill, colorMix } from '../../surface';
import { TButtonVariant } from './types';

export const V2_BUTTON_RADIUS = '5px';

const COLOR_HOVER = 10;
const COLOR_ACTIVE = 15;

const subtleStyles = (palette: TThemeColorScale) => `
  background-color: ${palette.subtle};
  color: ${palette.fg};
  border-color: transparent;

  &:hover:not(:disabled) {
    background-color: ${palette.muted};
  }

  &:active:not(:disabled) {
    background-color: ${palette.muted};
  }
`;

const surfaceStyles = (palette: TThemeColorScale, theme: TTheme) => `
  background-color: ${palette.subtle};
  color: ${palette.fg};
  border-color: ${chromeTransparentFill(theme, SURFACE_BORDER_IDLE)};

  &:hover:not(:disabled) {
    background-color: ${palette.muted};
  }

  &:active:not(:disabled) {
    background-color: ${palette.muted};
  }
`;

export const variantStyles = (
  variant: TButtonVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'subtle':
      return subtleStyles(palette);
    case 'surface':
      return surfaceStyles(palette, theme);
    case 'outline':
      return `
        background-color: transparent;
        color: ${palette.main};
        border-color: ${palette.main};

        &:hover:not(:disabled) {
          background-color: ${colorMix(palette.main, COLOR_HOVER)};
          border-color: ${palette.main};
        }

        &:active:not(:disabled) {
          background-color: ${colorMix(palette.main, COLOR_ACTIVE)};
          border-color: ${palette.main};
        }
      `;
    case 'ghost':
      return `
        background-color: transparent;
        color: ${palette.main};
        border-color: transparent;

        &:hover:not(:disabled) {
          background-color: ${colorMix(palette.main, COLOR_HOVER)};
        }

        &:active:not(:disabled) {
          background-color: ${colorMix(palette.main, COLOR_ACTIVE)};
        }
      `;
    case 'plain':
      return `
        background-color: transparent;
        color: ${palette.main};
        border-color: transparent;

        &:hover:not(:disabled) {
          color: ${palette.dark};
        }

        &:active:not(:disabled) {
          color: ${palette.darker};
        }
      `;
    case 'solid':
    default: {
      const idle = idleVariantAppearance('solid', palette, theme);

      return `
        background-color: ${idle.backgroundColor};
        color: ${idle.color};
        border-color: ${idle.borderColor};

        &:hover:not(:disabled) {
          background-color: ${palette.dark};
          border-color: ${palette.dark};
        }

        &:active:not(:disabled) {
          background-color: ${palette.darker};
          border-color: ${palette.darker};
        }
      `;
    }
  }
};

export type { TIdleChromeVariant };
