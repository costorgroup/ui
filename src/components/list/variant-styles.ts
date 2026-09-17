import type { TTheme } from '../../theme/types';
import type { TThemeColorScale } from '../../theme/theming/color/types';
import { CUI_CANVAS_VAR } from '../../helpers/color/create-color-scale';
import { CHROME_FILL } from '../../helpers/variant-styles';
import { colorMix, colorMixBase } from '../../helpers/variant-styles/surface';
import type { TStaticVariant } from '../../helpers/variant-styles/types';

export type TListVariant = TStaticVariant;

const shellFill = (theme: TTheme) =>
  colorMixBase(theme.surfaces.mixer, CHROME_FILL, theme.surfaces.background);

export const listShellVariantStyles = (
  variant: TListVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'solid':
      return `
        ${CUI_CANVAS_VAR}: ${palette.main};
        background-color: ${palette.main};
        border: 1px solid transparent;
        color: ${palette.contrastText};
      `;
    case 'subtle':
      return `
        ${CUI_CANVAS_VAR}: ${shellFill(theme)};
        background-color: ${shellFill(theme)};
        border: 1px solid transparent;
        color: ${theme.surfaces.ink};
      `;
    case 'surface':
      return `
        ${CUI_CANVAS_VAR}: ${shellFill(theme)};
        background-color: ${shellFill(theme)};
        border: 1px solid ${theme.surfaces.border};
        color: ${theme.surfaces.ink};
      `;
    case 'outline':
      return `
        background-color: transparent;
        border: 1px solid ${theme.surfaces.border};
        color: ${theme.surfaces.ink};
      `;
    case 'plain':
    default:
      return `
        background-color: transparent;
        border: 1px solid transparent;
        color: ${theme.surfaces.ink};
      `;
  }
};

export const listItemBackground = (
  variant: TListVariant,
  palette: TThemeColorScale,
) => (variant === 'solid' ? palette.main : 'transparent');

export const listItemColor = (
  variant: TListVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => (variant === 'solid' ? palette.contrastText : theme.surfaces.ink);

export const listItemDivider = (
  variant: TListVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'solid':
      return `1px solid ${colorMix(palette.contrastText, 15)}`;
    case 'outline':
    case 'surface':
      return `1px solid ${theme.surfaces.divider}`;
    default:
      return '1px solid transparent';
  }
};
