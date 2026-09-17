import type { TTheme } from '../../theme/types';
import type { TThemeColorScale } from '../../theme/theming/color/types';
import { type TIdleChromeVariant } from '../../helpers/variant-styles';
import { colorMix, colorMixBase } from '../../helpers/variant-styles/surface';
import type { TAppearance } from '../../helpers/variant-styles/types';
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

const activeFill = (
  variant: TButtonVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  appearance: TAppearance,
  mixBase: string,
) => {
  const fill = (swatch: string) => tint(swatch, theme, appearance, mixBase);

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
};

export const pressedVariantStyles = (
  variant: TButtonVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  appearance: TAppearance = 'opaque',
  mixBase = theme.palette.base.main,
) => `
  &[aria-pressed='true']:not(:disabled),
  &[aria-pressed='true']:hover:not(:disabled),
  &[aria-pressed='true']:active:not(:disabled) {
    ${activeFill(variant, palette, theme, appearance, mixBase)}
  }
`;

/** Same "pressed" look, but keyed off `aria-current="page"` — for a Button
 * rendered `as` a nav link to show the current page without needing its
 * own `active` prop or a duplicate style system. */
export const currentVariantStyles = (
  variant: TButtonVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  appearance: TAppearance = 'opaque',
  mixBase = theme.palette.base.main,
) => `
  &[aria-current='page']:not(:disabled),
  &[aria-current='page']:hover:not(:disabled) {
    ${activeFill(variant, palette, theme, appearance, mixBase)}
  }
`;

export type { TIdleChromeVariant };
