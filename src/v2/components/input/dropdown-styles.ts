import type { TTheme } from '../../../theme/types';
import { CUI_CANVAS_VAR } from '../../../helpers/color/create-color-scale';
import type { TPaletteColor } from '../../../theme/types';
import {
  chromeOpaqueFill,
  colorMix,
  surfacePanelBorder,
  surfacePanelShadow,
} from '../../surface';
import {
  CHROME_IDLE,
  CHROME_HOVER,
} from '../../idle-variant-styles';
import type { TInputVariant } from './input-wrapper/types';

export type TInputDropdownChrome = {
  color: TPaletteColor;
  variant: TInputVariant;
};

/** Dropdown panel — opaque canvas fill. */
export const inputDropdownPanelStyles = (theme: TTheme) => `
  ${CUI_CANVAS_VAR}: ${theme.colors.base.main};
  background-color: ${theme.colors.base.main};
  color: ${theme.colors.default.main};
  border: ${surfacePanelBorder(theme)};
  box-shadow: ${surfacePanelShadow(theme)};
`;

export const inputDropdownOptionCssVars = (
  theme: TTheme,
  _color: TPaletteColor,
) => {
  return `
    --input-dropdown-option-hover: ${inputDropdownOptionHover(theme)};
    --input-dropdown-option-selected: ${inputDropdownOptionSelected(theme)};
  `;
};

/** Empty / muted dropdown copy. */
export const inputDropdownMutedText = (theme: TTheme, alpha = 50) =>
  colorMix(theme.colors.default.main, alpha);

/** Compact dropdown option typography + padding. */
export const INPUT_DROPDOWN_OPTION_FONT_SIZE = '12px';

export const inputDropdownOptionPadding = (theme: TTheme) =>
  `${theme.spacing(theme.gap.xs)} ${theme.spacing(theme.gap.sm)}`;

/** Keyboard / pointer hover on unselected options. */
export const inputDropdownOptionHover = (theme: TTheme) =>
  chromeOpaqueFill(theme, CHROME_IDLE);

/** Current value — stronger than hover; not replaced on hover. */
export const inputDropdownOptionSelected = (theme: TTheme) =>
  chromeOpaqueFill(theme, CHROME_HOVER);
