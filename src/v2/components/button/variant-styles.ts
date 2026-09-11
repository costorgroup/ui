import type { TTheme } from '../../../theme/types';
import type { TThemeColorScale } from '../../../theme/theming/color/types';
import { type TIdleChromeVariant } from '../../idle-variant-styles';
import { colorMix, colorMixBase } from '../../surface';
import type { TAppearance } from '../../variant-types';
import { TButtonVariant } from './types';

export const V2_BUTTON_RADIUS = '5px';

const BUTTON_TINT = 20;

const tint = (
  color: string,
  theme: TTheme,
  appearance: TAppearance,
  mixBase: string,
) =>
  appearance === 'transparent'
    ? colorMix(color, BUTTON_TINT)
    : colorMixBase(color, BUTTON_TINT, mixBase);

const interactiveStates = (hover: string, active: string, interactive: boolean) =>
  interactive
    ? `
        &:hover:not(:disabled):not([aria-disabled='true']) {
          ${hover}
        }

        &:active:not(:disabled):not([aria-disabled='true']) {
          ${active}
        }
      `
    : '';

export const variantStyles = (
  variant: TButtonVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  appearance: TAppearance = 'opaque',
  mixBase = theme.palette.base.main,
  interactive = true,
) => {
  const fill = (swatch: string) => tint(swatch, theme, appearance, mixBase);
  switch (variant) {
    case 'subtle':
      return `
        background-color: ${fill(palette.main)};
        color: ${palette.main};
        border-color: transparent;
        ${interactiveStates(
          `
            background-color: ${fill(palette.dark)};
            color: ${palette.dark};
          `,
          `
            background-color: ${fill(palette.darker)};
            color: ${palette.darker};
          `,
          interactive,
        )}
      `;
    case 'surface':
      return `
        background-color: ${fill(palette.main)};
        color: ${palette.main};
        border-color: ${palette.main};
        ${interactiveStates(
          `
            background-color: ${fill(palette.dark)};
            color: ${palette.dark};
            border-color: ${palette.dark};
          `,
          `
            background-color: ${fill(palette.darker)};
            color: ${palette.darker};
            border-color: ${palette.darker};
          `,
          interactive,
        )}
      `;
    case 'outline':
      return `
        background-color: transparent;
        color: ${palette.main};
        border-color: ${palette.main};
        ${interactiveStates(
          `
            background-color: ${fill(palette.dark)};
            color: ${palette.dark};
            border-color: ${palette.dark};
          `,
          `
            background-color: ${fill(palette.darker)};
            color: ${palette.darker};
            border-color: ${palette.darker};
          `,
          interactive,
        )}
      `;
    case 'ghost':
      return `
        background-color: transparent;
        color: ${palette.main};
        border-color: transparent;
        ${interactiveStates(
          `
            background-color: ${fill(palette.dark)};
            color: ${palette.dark};
          `,
          `
            background-color: ${fill(palette.darker)};
            color: ${palette.darker};
          `,
          interactive,
        )}
      `;
    case 'plain':
      return `
        background-color: transparent;
        color: ${palette.main};
        border-color: transparent;
        ${interactiveStates(
          `color: ${palette.dark};`,
          `color: ${palette.darker};`,
          interactive,
        )}
      `;
    case 'solid':
    default:
      return `
        background-color: ${palette.main};
        color: ${palette.contrastText};
        border-color: transparent;
        ${interactiveStates(
          `background-color: ${palette.dark};`,
          `background-color: ${palette.darker};`,
          interactive,
        )}
      `;
  }
};

export const pressedVariantStyles = (
  variant: TButtonVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  appearance: TAppearance = 'opaque',
  mixBase = theme.palette.base.main,
) => {
  const fill = (swatch: string) => tint(swatch, theme, appearance, mixBase);

  const pressed = (() => {
    switch (variant) {
      case 'subtle':
        return `
          background-color: ${fill(palette.darker)};
          color: ${palette.darker};
          border-color: transparent;
        `;
      case 'surface':
        return `
          background-color: ${fill(palette.darker)};
          color: ${palette.darker};
          border-color: ${palette.darker};
        `;
      case 'outline':
        return `
          background-color: ${fill(palette.darker)};
          color: ${palette.darker};
          border-color: ${palette.darker};
        `;
      case 'ghost':
        return `
          background-color: ${fill(palette.darker)};
          color: ${palette.darker};
        `;
      case 'plain':
        return `
          color: ${palette.darker};
        `;
      case 'solid':
      default:
        return `
          background-color: ${palette.darker};
        `;
    }
  })();

  return `
    &[aria-pressed='true']:not(:disabled),
    &[aria-pressed='true']:hover:not(:disabled),
    &[aria-pressed='true']:active:not(:disabled) {
      ${pressed}
    }
  `;
};

export type { TIdleChromeVariant };
