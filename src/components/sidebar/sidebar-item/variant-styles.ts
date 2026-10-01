import type { TTheme } from '../../../theme/types';
import type { TPaletteColor } from '../../../theme/types';
import {
  CHROME_FOCUS,
  CHROME_HOVER,
  PALETTE_TINT,
} from '../../../helpers/variant-styles';
import { colorMix } from '../../../helpers/variant-styles/surface';
import { sidebarItemDescriptionClasses } from '../sidebar-item-description/classes';
import type { TSidebarVariant } from '../types';

const description = `.${sidebarItemDescriptionClasses.root}`;

// Inset shadow instead of border: active rows don't shift by a pixel.
const ring = (color: string) => `box-shadow: inset 0 0 0 1px ${color};`;

/** Idle + hover + active for one variant. `color` tints the active state;
 * without it the neutral ink / chrome mixer is used (like Tabs). */
export const sidebarItemVariantStyles = (
  variant: TSidebarVariant,
  theme: TTheme,
  color?: TPaletteColor,
) => {
  const palette = color != null ? theme.palette[color] : null;
  const accent = palette?.main ?? theme.surfaces.ink;
  const hoverFill = colorMix(theme.surfaces.mixer, CHROME_HOVER);
  const activeFill =
    palette != null
      ? colorMix(palette.main, PALETTE_TINT)
      : colorMix(theme.surfaces.mixer, CHROME_FOCUS);
  const border = palette?.main ?? theme.surfaces.border;

  switch (variant) {
    case 'solid':
      return `
        &:hover:not([data-disabled]):not([data-active]) {
          background-color: ${hoverFill};
        }

        &[data-active] {
          background-color: ${accent};
          color: ${palette?.contrastText ?? theme.surfaces.background};
        }

        /* Muted grey is unreadable on a solid fill. */
        &[data-active] ${description} {
          color: inherit;
          opacity: 0.75;
        }
      `;
    case 'surface':
      return `
        &:hover:not([data-disabled]):not([data-active]) {
          background-color: ${hoverFill};
        }

        &[data-active] {
          background-color: ${activeFill};
          color: ${accent};
          ${ring(border)}
        }
      `;
    case 'outline':
      return `
        &:hover:not([data-disabled]):not([data-active]) {
          background-color: ${hoverFill};
        }

        &[data-active] {
          color: ${accent};
          ${ring(border)}
        }
      `;
    case 'plain':
      return `
        color: ${theme.surfaces.muted};

        &:hover:not([data-disabled]) {
          color: ${theme.surfaces.ink};
        }

        &[data-active] {
          color: ${accent};
        }
      `;
    case 'subtle':
    default:
      return `
        &:hover:not([data-disabled]) {
          background-color: ${hoverFill};
        }

        &[data-active] {
          background-color: ${activeFill};
          ${palette != null ? `color: ${accent};` : ''}
        }
      `;
  }
};
