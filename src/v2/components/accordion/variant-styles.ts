import type { TTheme } from '../../../theme/types';
import type { TThemeColorScale } from '../../../theme/theming/color/types';
import { CUI_CANVAS_VAR } from '../../../helpers/color/create-color-scale';
import { CHROME_FILL } from '../../idle-variant-styles';
import { colorMix, colorMixBase } from '../../surface';
import { TButtonVariant } from '../button/types';

export type TAccordionVariant = TButtonVariant;

const COLOR_HOVER = 10;
const COLOR_ACTIVE = 15;

type TAccordionShellState = {
  expanded?: boolean;
  grouped?: boolean;
};

const shellFill = (theme: TTheme) =>
  colorMixBase(theme.surfaces.mixer, CHROME_FILL, theme.surfaces.background);

export const accordionGroupItemDivider = (theme: TTheme) =>
  `1px solid ${theme.surfaces.divider}`;

const groupedItemDivider = (theme: TTheme, grouped: boolean) => {
  if (!grouped) {
    return '';
  }

  return `
    &:not(:last-child) {
      border-bottom: ${accordionGroupItemDivider(theme)};
    }
  `;
};

const groupedCollapseTop = (grouped: boolean) => {
  if (!grouped) {
    return '';
  }

  return `
    &:not(:first-child) {
      border-top: none;
    }
  `;
};

export const accordionShellVariantStyles = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  state: TAccordionShellState = {},
) => {
  const expanded = Boolean(state.expanded);
  const grouped = Boolean(state.grouped);
  const divider = groupedItemDivider(theme, grouped);
  const fill = shellFill(theme);

  switch (variant) {
    case 'subtle':
      return `
        ${CUI_CANVAS_VAR}: ${fill};
        background-color: ${fill};
        border: 1px solid transparent;
        color: ${theme.surfaces.ink};
        ${
          grouped
            ? `
          &:not(:last-child) {
            border-bottom: 1px solid ${theme.surfaces.divider};
          }
        `
            : ''
        }
      `;
    case 'surface':
      return `
        ${CUI_CANVAS_VAR}: ${fill};
        background-color: ${fill};
        border: 1px solid ${theme.surfaces.border};
        color: ${theme.surfaces.ink};
        ${groupedCollapseTop(grouped)}
      `;
    case 'outline':
      return `
        background-color: transparent;
        border: 1px solid ${theme.surfaces.border};
        color: ${theme.surfaces.ink};
        ${groupedCollapseTop(grouped)}
      `;
    case 'ghost':
      return `
        background-color: ${expanded ? colorMix(palette.main, COLOR_HOVER) : 'transparent'};
        border: 1px solid transparent;
        color: ${theme.surfaces.ink};
        ${divider}

        &:hover {
          background-color: ${colorMix(palette.main, expanded ? COLOR_ACTIVE : COLOR_HOVER)};
        }

        &:active {
          background-color: ${colorMix(palette.main, COLOR_ACTIVE)};
        }
      `;
    case 'plain':
      return `
        background-color: transparent;
        border: 1px solid transparent;
        color: ${theme.surfaces.ink};
        ${divider}
      `;
    case 'solid':
    default:
      return `
        ${CUI_CANVAS_VAR}: ${expanded ? palette.dark : palette.main};
        background-color: ${expanded ? palette.dark : palette.main};
        border: 1px solid transparent;
        color: ${palette.contrastText};
        ${divider}

        &:hover {
          background-color: ${expanded ? palette.darker : palette.dark};
        }

        &:active {
          background-color: ${palette.darker};
        }
      `;
  }
};

export const accordionSummaryIdleColor = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => (variant === 'solid' ? palette.contrastText : theme.surfaces.ink);

export const accordionSummaryIconColors = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  elevated: boolean,
) => {
  if (variant === 'solid') {
    return {
      idle: palette.contrastText,
      hover: palette.contrastText,
      focus: palette.contrastText,
    };
  }

  if (palette === theme.palette.default) {
    return {
      idle: elevated ? theme.surfaces.ink : theme.surfaces.muted,
      hover: theme.surfaces.ink,
      focus: theme.surfaces.ink,
    };
  }

  return {
    idle: elevated ? palette.dark : palette.main,
    hover: elevated ? palette.darker : palette.dark,
    focus: palette.darker,
  };
};

export const accordionDetailsBackground = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
) => {
  switch (variant) {
    case 'solid':
      return palette.main;
    default:
      return 'transparent';
  }
};

export const accordionDetailsColor = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => (variant === 'solid' ? palette.contrastText : theme.surfaces.ink);

export const accordionSummaryDivider = (
  variant: TAccordionVariant,
  _palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'outline':
    case 'surface':
      return `1px solid ${theme.surfaces.divider}`;
    default:
      return '1px solid transparent';
  }
};
