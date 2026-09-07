import type { TTheme } from '../../../theme/types';
import type { TThemeColorScale } from '../../../theme/theming/color/types';
import { CHROME_FILL, CHROME_HOVER, CHROME_IDLE } from '../../idle-variant-styles';
import { chromeTransparentFill, colorMix, colorMixBase } from '../../surface';
import { TButtonVariant } from '../button/types';

export type TAccordionVariant = TButtonVariant;

const COLOR_HOVER = 10;
const COLOR_ACTIVE = 15;

type TAccordionShellState = {
  expanded?: boolean;
  grouped?: boolean;
};

const chromeIdleFill = (theme: TTheme) =>
  colorMixBase(
    theme.colors.base.contrastText,
    CHROME_FILL,
    theme.colors.base.main,
  );

const chromeIdleBorder = (theme: TTheme) =>
  colorMix(theme.colors.base.contrastText, CHROME_IDLE);

export const accordionGroupItemDivider = (theme: TTheme) =>
  `1px solid ${chromeTransparentFill(theme, CHROME_HOVER)}`;

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

  switch (variant) {
    case 'subtle':
      return `
        background-color: ${chromeIdleFill(theme)};
        border: 1px solid transparent;
        ${
          grouped
            ? `
          &:not(:last-child) {
            border-bottom: 1px solid ${chromeIdleBorder(theme)};
          }
        `
            : ''
        }
      `;
    case 'surface':
      return `
        background-color: ${chromeIdleFill(theme)};
        border: 1px solid ${chromeIdleBorder(theme)};
        ${groupedCollapseTop(grouped)}
      `;
    case 'outline':
      return `
        background-color: transparent;
        border: 1px solid ${chromeIdleBorder(theme)};
        ${groupedCollapseTop(grouped)}
      `;
    case 'ghost':
      return `
        background-color: ${expanded ? colorMix(palette.main, COLOR_HOVER) : 'transparent'};
        border: 1px solid transparent;
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
        ${divider}
      `;
    case 'solid':
    default:
      return `
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
) =>
  variant === 'solid' ? palette.contrastText : theme.colors.default.main;

export const accordionSummaryIconColors = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  elevated: boolean,
) => {
  if (variant === 'solid') {
    return {
      idle: palette.contrastText,
      hover: palette.contrastText,
      focus: palette.contrastText,
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
) => (variant === 'solid' ? palette.contrastText : 'inherit');

export const accordionSummaryDivider = (
  variant: TAccordionVariant,
  _palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'outline':
    case 'surface':
      return `1px solid ${chromeIdleBorder(theme)}`;
    default:
      return '1px solid transparent';
  }
};
