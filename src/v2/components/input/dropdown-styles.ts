import type { TTheme } from '../../../theme/types';
import { CUI_CANVAS_VAR } from '../../../helpers/color/create-color-scale';
import type { TPaletteColor } from '../../../theme/types';
import {
  colorMix,
  surfacePanelBorder,
  surfacePanelShadow,
} from '../../surface';
import {
  CHROME_FOCUS,
  CHROME_IDLE,
} from '../../idle-variant-styles';
import type { TInputVariant } from './input-wrapper/types';

export type TInputDropdownChrome = {
  color: TPaletteColor;
  variant: TInputVariant;
};

/** Dropdown panel — page surface, not the field wash. */
export const inputDropdownPanelStyles = (theme: TTheme) => {
  const surface = theme.surfaces.background;

  return `
    ${CUI_CANVAS_VAR}: ${surface};
    background-color: ${surface};
    color: ${theme.palette.default.main};
    border: ${surfacePanelBorder(theme)};
    box-shadow: ${surfacePanelShadow(theme)};
  `;
};

export const inputDropdownOptionCssVars = (
  theme: TTheme,
  color: TPaletteColor,
) => {
  return `
    --input-dropdown-option-hover: ${inputDropdownOptionHover(theme)};
    --input-dropdown-option-selected: ${inputDropdownOptionSelected(theme, color)};
  `;
};

/** Empty / muted dropdown copy. */
export const inputDropdownMutedText = (theme: TTheme, alpha = 50) =>
  colorMix(theme.palette.default.main, alpha);

/** Compact dropdown option typography + padding. */
export const INPUT_DROPDOWN_OPTION_FONT_SIZE = '12px';

export const inputDropdownOptionPadding = (theme: TTheme) =>
  `${theme.spacing(theme.gap.xs)} ${theme.spacing(theme.gap.sm)}`;

/** Keyboard / pointer hover on unselected options. */
export const inputDropdownOptionHover = (theme: TTheme) =>
  colorMix(theme.surfaces.mixer, CHROME_IDLE);

/** Current value — current color wash; not replaced on hover. */
export const inputDropdownOptionSelected = (
  theme: TTheme,
  color: TPaletteColor,
) => colorMix(theme.palette[color].main, CHROME_FOCUS);
