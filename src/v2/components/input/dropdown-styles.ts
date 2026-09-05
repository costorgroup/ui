import type { TTheme } from '../../../theme/types';
import type { TThemeColorScale } from '../../../theme/theming/color/types';
import { CUI_CANVAS_VAR } from '../../../helpers/color/create-color-scale';
import type { TPaletteColor } from '../../../theme/types';
import {
  colorMix,
  surfacePanelBackground,
  surfacePanelBackdrop,
  surfacePanelBorder,
  surfacePanelShadow,
} from '../../surface';
import type { TInputVariant } from './input-wrapper/types';

export type TInputDropdownChrome = {
  color: TPaletteColor;
  variant: TInputVariant;
};

/** Dropdown panel — matches Window transparent surface. */
export const inputDropdownPanelStyles = (theme: TTheme) => `
  ${CUI_CANVAS_VAR}: transparent;
  background-color: ${surfacePanelBackground(theme)};
  color: ${theme.colors.base.contrastText};
  border: ${surfacePanelBorder(theme)};
  box-shadow: ${surfacePanelShadow(theme)};
  ${surfacePanelBackdrop()}
`;

export const inputDropdownOptionCssVars = (
  theme: TTheme,
  color: TPaletteColor,
) => {
  const palette = theme.colors[color];

  return `
    --input-dropdown-option-hover: ${inputDropdownOptionHover(palette)};
    --input-dropdown-option-selected: ${inputDropdownOptionSelected(palette)};
  `;
};

/** Empty / muted dropdown copy. */
export const inputDropdownMutedText = (theme: TTheme, alpha = 50) =>
  colorMix(theme.colors.base.contrastText, alpha);

/** Compact dropdown option typography + padding. */
export const INPUT_DROPDOWN_OPTION_FONT_SIZE = '12px';

export const inputDropdownOptionPadding = (theme: TTheme) =>
  `${theme.spacing(theme.gap.xs)} ${theme.spacing(theme.gap.sm)}`;

/** Keyboard / pointer hover on unselected options. */
export const inputDropdownOptionHover = (palette: TThemeColorScale) =>
  palette.subtle;

/** Current value — stronger than hover; not replaced on hover. */
export const inputDropdownOptionSelected = (palette: TThemeColorScale) =>
  palette.muted;
