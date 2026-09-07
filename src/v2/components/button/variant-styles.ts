import type { TTheme } from '../../../theme/types';
import type { TThemeColorScale } from '../../../theme/theming/color/types';
import { type TIdleChromeVariant } from '../../idle-variant-styles';
import { colorMix, colorMixBase } from '../../surface';
import type { TAppearance } from '../../variant-types';
import { TButtonVariant } from './types';

export const V2_BUTTON_RADIUS = '5px';

const BUTTON_TINT = 20;

const tint = (color: string, theme: TTheme, appearance: TAppearance) =>
  appearance === 'transparent'
    ? colorMix(color, BUTTON_TINT)
    : colorMixBase(color, BUTTON_TINT, theme.colors.base.main);

export const variantStyles = (
  variant: TButtonVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  appearance: TAppearance = 'opaque',
) => {
  switch (variant) {
    case 'subtle':
      return `
        background-color: ${tint(palette.main, theme, appearance)};
        color: ${palette.main};
        border-color: transparent;

        &:hover:not(:disabled) {
          background-color: ${tint(palette.dark, theme, appearance)};
          color: ${palette.dark};
        }

        &:active:not(:disabled) {
          background-color: ${tint(palette.darker, theme, appearance)};
          color: ${palette.darker};
        }
      `;
    case 'surface':
      return `
        background-color: ${tint(palette.main, theme, appearance)};
        color: ${palette.main};
        border-color: ${palette.main};

        &:hover:not(:disabled) {
          background-color: ${tint(palette.dark, theme, appearance)};
          color: ${palette.dark};
          border-color: ${palette.dark};
        }

        &:active:not(:disabled) {
          background-color: ${tint(palette.darker, theme, appearance)};
          color: ${palette.darker};
          border-color: ${palette.darker};
        }
      `;
    case 'outline':
      return `
        background-color: transparent;
        color: ${palette.main};
        border-color: ${palette.main};

        &:hover:not(:disabled) {
          background-color: ${tint(palette.dark, theme, appearance)};
          color: ${palette.dark};
          border-color: ${palette.dark};
        }

        &:active:not(:disabled) {
          background-color: ${tint(palette.darker, theme, appearance)};
          color: ${palette.darker};
          border-color: ${palette.darker};
        }
      `;
    case 'ghost':
      return `
        background-color: transparent;
        color: ${palette.main};
        border-color: transparent;

        &:hover:not(:disabled) {
          background-color: ${tint(palette.dark, theme, appearance)};
          color: ${palette.dark};
        }

        &:active:not(:disabled) {
          background-color: ${tint(palette.darker, theme, appearance)};
          color: ${palette.darker};
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
    default:
      return `
        background-color: ${palette.main};
        color: ${palette.contrastText};
        border-color: transparent;

        &:hover:not(:disabled) {
          background-color: ${palette.dark};
        }

        &:active:not(:disabled) {
          background-color: ${palette.darker};
        }
      `;
  }
};

export type { TIdleChromeVariant };
