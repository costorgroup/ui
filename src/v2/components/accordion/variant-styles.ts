import type { TTheme } from '../../../theme/types';
import type { TThemeColorScale } from '../../../theme/theming/color/types';
import { SURFACE_BORDER_IDLE, SURFACE_SHELL_BORDER_IDLE } from '../../idle-variant-styles';
import { chromeTransparentFill, colorMix, surfaceBorder } from '../../surface';
import { TButtonVariant } from '../button/types';

export type TAccordionVariant = TButtonVariant;

const COLOR_HOVER = 10;
const COLOR_ACTIVE = 15;

type TAccordionSummaryState = {
  expanded: boolean;
  hasDetails: boolean;
};

const accordionChromeShellBorder = (
  variant: TAccordionVariant,
  theme: TTheme,
) => {
  switch (variant) {
    case 'surface':
      return surfaceBorder(theme, SURFACE_SHELL_BORDER_IDLE);
    default:
      return surfaceBorder(theme, SURFACE_BORDER_IDLE);
  }
};

const subtleSummaryStyles = (
  palette: TThemeColorScale,
  elevated: boolean,
) => `
  background-color: ${elevated ? palette.muted : palette.subtle};
  color: ${palette.fg};
  border-color: transparent;

  &:hover:not(:disabled) {
    background-color: ${palette.muted};
  }

  &:active:not(:disabled) {
    background-color: ${palette.muted};
  }
`;

const surfaceSummaryStyles = (
  palette: TThemeColorScale,
  theme: TTheme,
  elevated: boolean,
) => `
  background-color: ${elevated ? palette.muted : palette.subtle};
  color: ${palette.fg};
  border-color: ${chromeTransparentFill(theme, SURFACE_BORDER_IDLE)};

  &:hover:not(:disabled) {
    background-color: ${palette.muted};
  }

  &:active:not(:disabled) {
    background-color: ${palette.muted};
  }
`;

export const accordionSummaryVariantStyles = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  state: TAccordionSummaryState,
) => {
  const elevated = state.expanded && state.hasDetails;

  switch (variant) {
    case 'subtle':
      return subtleSummaryStyles(palette, elevated);
    case 'surface':
      return surfaceSummaryStyles(palette, theme, elevated);
    case 'outline':
    case 'ghost':
      return `
        background-color: ${elevated ? colorMix(palette.main, COLOR_HOVER) : 'transparent'};
        color: ${palette.main};
        border-color: transparent;

        &:hover:not(:disabled) {
          background-color: ${colorMix(palette.main, elevated ? COLOR_ACTIVE : COLOR_HOVER)};
        }

        &:active:not(:disabled) {
          background-color: ${colorMix(palette.main, COLOR_ACTIVE)};
        }
      `;
    case 'plain':
      return `
        background-color: transparent;
        color: ${elevated ? palette.dark : palette.main};
        border-color: transparent;

        &:hover:not(:disabled) {
          color: ${elevated ? palette.darker : palette.dark};
        }

        &:active:not(:disabled) {
          color: ${palette.darker};
        }
      `;
    case 'solid':
    default:
      return `
        background-color: ${elevated ? palette.dark : palette.main};
        color: ${palette.contrastText};
        border-color: transparent;

        &:hover:not(:disabled) {
          background-color: ${elevated ? palette.darker : palette.dark};
        }

        &:active:not(:disabled) {
          background-color: ${palette.darker};
        }
      `;
  }
};

export const accordionSummaryIdleColor = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  _theme?: TTheme,
) => {
  switch (variant) {
    case 'outline':
    case 'ghost':
    case 'plain':
      return palette.main;
    case 'solid':
      return palette.contrastText;
    case 'subtle':
    case 'surface':
    default:
      return palette.fg;
  }
};

export const accordionShellVariantStyles = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'outline':
      return `
        border: 1px solid ${palette.main};
        background-color: transparent;
        color: ${palette.main};
      `;
    case 'ghost':
    case 'plain':
      return `
        border: 1px solid transparent;
        background-color: transparent;
      `;
    default:
      return `
        border: ${accordionChromeShellBorder(variant, theme)};
        background-color: transparent;
      `;
  }
};

export const accordionDetailsBackground = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  _theme?: TTheme,
) => {
  switch (variant) {
    case 'solid':
      return palette.main;
    case 'outline':
    case 'ghost':
    case 'plain':
      return 'transparent';
    case 'subtle':
    case 'surface':
    default:
      return palette.subtle;
  }
};

export const accordionDetailsColor = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
) => (variant === 'solid' ? palette.contrastText : 'inherit');

export const accordionSummaryDivider = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'outline':
      return `1px solid ${palette.main}`;
    case 'ghost':
    case 'plain':
      return '1px solid transparent';
    default:
      return surfaceBorder(theme, SURFACE_BORDER_IDLE);
  }
};
