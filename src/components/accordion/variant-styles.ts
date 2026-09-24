import type { TTheme, TThemeRadius } from '../../theme/types';
import type { TThemeColorScale } from '../../theme/theming/color/types';
import { CUI_CANVAS_VAR } from '../../helpers/color/create-color-scale';
import { colorMixBase } from '../../helpers/variant-styles/surface';
import {
  BUTTON_TINT,
  forceContrastTextStyles,
  variantStyles,
} from '../button/variant-styles';
import { TButtonVariant } from '../button/types';

export type TAccordionVariant = TButtonVariant;

/** `all` paints the whole accordion with the palette; `summary` keeps the
 * shell neutral and only colors the summary row. */
export type TAccordionColorScope = 'all' | 'summary';

type TAccordionShellState = {
  grouped?: boolean;
  colorScope?: TAccordionColorScope;
  forceContrastText?: boolean;
};

/** Button styles set `border-color`, which would repaint the summary's
 * divider edge — drop it so the summary keeps its own border. */
const withoutBorderColor = (css: string) =>
  css.replace(/^\s*border-color:[^;]*;\s*$/gm, '');

export const accordionGroupItemDivider = (theme: TTheme) =>
  `1px solid ${theme.surfaces.divider}`;

const groupedEdges = (
  variant: TAccordionVariant,
  theme: TTheme,
  grouped: boolean,
) => {
  if (!grouped) {
    return '';
  }

  if (variant === 'surface' || variant === 'outline') {
    return `
      &:not(:first-of-type) {
        border-top: none;
      }
    `;
  }

  return `
    &:not(:last-of-type) {
      border-bottom: ${accordionGroupItemDivider(theme)};
    }
  `;
};

const canvasColor = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'solid':
      return palette.main;
    case 'subtle':
    case 'surface':
      return colorMixBase(palette.main, BUTTON_TINT, theme.palette.base.main);
    default:
      return null;
  }
};

export const accordionShellVariantStyles = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  state: TAccordionShellState = {},
) => {
  const {
    grouped = false,
    colorScope = 'all',
    forceContrastText = false,
  } = state;

  // Only the summary is styled; the shell and details stay bare.
  if (colorScope === 'summary') {
    return `
      background-color: transparent;
      border: none;
      color: ${theme.surfaces.ink};
    `;
  }

  const canvas = canvasColor(variant, palette, theme);

  return `
    border: 1px solid transparent;
    ${canvas ? `${CUI_CANVAS_VAR}: ${canvas};` : ''}
    ${variantStyles(variant, palette, theme, 'opaque', theme.palette.base.main, false)}
    ${forceContrastText ? forceContrastTextStyles(palette) : ''}
    ${groupedEdges(variant, theme, grouped)}
  `;
};

/** Summary row uses the Button look (idle + hover/active) in both scopes.
 * With `colorScope="all"` its idle fill matches the shell, so only the
 * interaction states show and the shell owns the border. With
 * `colorScope="summary"` the summary is a standalone Button-like row with
 * its own border and radius. */
export const accordionSummaryVariantStyles = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  {
    colorScope,
    radius,
    forceContrastText,
  }: {
    colorScope: TAccordionColorScope;
    radius: keyof TThemeRadius;
    forceContrastText: boolean;
  },
) => {
  const button = variantStyles(variant, palette, theme);

  return `
    ${
      colorScope === 'summary'
        ? `
          border: 1px solid transparent;
          border-radius: ${theme.radius[radius]};
          ${button}
        `
        : withoutBorderColor(button)
    }
    ${forceContrastText ? forceContrastTextStyles(palette) : ''}
  `;
};

export const accordionSummaryDivider = (
  variant: TAccordionVariant,
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
