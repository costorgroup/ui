import type { TTheme } from '../../theme/types';
import type { TThemeColorScale } from '../../theme/theming/color/types';
import { colorMix, colorMixBase } from '../../helpers/variant-styles/surface';
import type { TAppearance } from '../../helpers/variant-styles/types';
import { TButtonVariant } from '../button/types';

export type TAccordionVariant = TButtonVariant;

/** Mix base for tints, same as Button: `opaque` mixes onto the theme canvas
 * (`base.main`), `transparent` onto air so whatever sits behind shows. */
export type TAccordionAppearance = TAppearance;

/** What takes the color when the accordion expands: the whole item
 * (`all`), only its summary row (`summary`) or nothing (`none`). Collapsed
 * items are always neutral. */
export type TAccordionColorScope = 'all' | 'summary' | 'none';

type TTone = 'main' | 'dark' | 'darker';

/** Tint strength per tone. */
const TINT: Record<TTone, number> = { main: 10, dark: 14, darker: 18 };

/** Faint wash on a collapsed (or uncolored) row while hovered. */
const NEUTRAL_HOVER = 5;

/** Tints `color` onto the canvas (`opaque`) or onto air (`transparent`). */
export const accordionTint = (
  color: string,
  alpha: number,
  theme: TTheme,
  appearance: TAccordionAppearance,
) =>
  appearance === 'transparent'
    ? colorMix(color, alpha)
    : colorMixBase(color, alpha, theme.palette.base.main);

type TPaint = {
  background: string;
  color: string;
  edge?: string;
};

/** Fill, text and edge of one variant at one tone — the Button variants,
 * toned down to a tint so a whole row or panel can wear them. */
const paint = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  tone: TTone,
  theme: TTheme,
  appearance: TAccordionAppearance,
): TPaint => {
  const swatch = palette[tone];
  const tint = accordionTint(swatch, TINT[tone], theme, appearance);

  switch (variant) {
    case 'solid':
      return { background: swatch, color: palette.contrastText, edge: swatch };
    case 'subtle':
      return { background: tint, color: swatch };
    case 'surface':
      return { background: tint, color: swatch, edge: swatch };
    case 'outline':
      return {
        background: tone === 'main' ? 'transparent' : tint,
        color: swatch,
        edge: swatch,
      };
    case 'ghost':
      return {
        background: tone === 'main' ? 'transparent' : tint,
        color: swatch,
      };
    case 'plain':
    default:
      return { background: 'transparent', color: swatch };
  }
};

/** The edge is an inset outline so it never shifts layout and draws over
 * children's backgrounds (and over the shell's own 1px border). */
const paintStyles = (
  { background, color, edge }: TPaint,
  palette: TThemeColorScale,
  forceContrastText: boolean,
) => `
  background-color: ${background};
  color: ${forceContrastText ? palette.contrastText : color};
  outline: ${edge ? `1px solid ${edge}` : 'none'};
  outline-offset: -1px;
`;

export const accordionDivider = (theme: TTheme) =>
  `1px solid ${theme.surfaces.divider}`;

export const accordionNeutralHover = (
  theme: TTheme,
  appearance: TAccordionAppearance,
) => accordionTint(theme.palette.default.main, NEUTRAL_HOVER, theme, appearance);

type TAccordionPaintState = {
  expanded: boolean;
  colorScope: TAccordionColorScope;
  forceContrastText: boolean;
  appearance: TAccordionAppearance;
};

/** Shell: painted only while expanded with `colorScope="all"`. */
export const accordionShellVariantStyles = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  { expanded, colorScope, forceContrastText, appearance }: TAccordionPaintState,
) =>
  expanded && colorScope === 'all'
    ? paintStyles(
        paint(variant, palette, 'main', theme, appearance),
        palette,
        forceContrastText,
      )
    : '';

/** Summary row: painted while expanded with `colorScope="summary"`; with
 * `all` it sits on the painted shell and only adds the hover tone. */
export const accordionSummaryVariantStyles = (
  variant: TAccordionVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  { expanded, colorScope, forceContrastText, appearance }: TAccordionPaintState,
) => {
  const painted = expanded && colorScope !== 'none';

  if (!painted) {
    return `
      &:hover {
        background-color: ${accordionNeutralHover(theme, appearance)};
      }
    `;
  }

  const hover = paint(variant, palette, 'dark', theme, appearance);
  const hoverColor = forceContrastText ? palette.contrastText : hover.color;

  return `
    ${
      colorScope === 'summary'
        ? paintStyles(
            paint(variant, palette, 'main', theme, appearance),
            palette,
            forceContrastText,
          )
        : ''
    }

    &:hover {
      background-color: ${hover.background};
      color: ${hoverColor};
    }
  `;
};
