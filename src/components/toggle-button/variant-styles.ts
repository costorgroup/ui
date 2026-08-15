import { TPaletteColor, TTheme } from '../../theme/types';
import { TButtonVariant } from '../button/types';

type TToggleTone = {
  background: string;
  color: string;
  border: string;
};

const cssTone = ({ background, color, border }: TToggleTone) => `
  background-color: ${background};
  color: ${color};
  border-color: ${border};
`;

const tonesFor = (
  variant: TButtonVariant,
  palette: TTheme['colors'][TPaletteColor],
) => {
  switch (variant) {
    case 'subtle':
      return {
        idle: {
          background: `color-mix(in srgb, ${palette.main} 8%, transparent)`,
          color: palette.darker,
          border: 'transparent',
        },
        hover: {
          background: `color-mix(in srgb, ${palette.main} 14%, transparent)`,
          color: palette.darker,
          border: 'transparent',
        },
        toggled: {
          background: `color-mix(in srgb, ${palette.main} 20%, transparent)`,
          color: palette.darker,
          border: 'transparent',
        },
      };
    case 'surface':
      return {
        idle: {
          background: `color-mix(in srgb, ${palette.main} 8%, transparent)`,
          color: palette.darker,
          border: `color-mix(in srgb, ${palette.main} 24%, transparent)`,
        },
        hover: {
          background: `color-mix(in srgb, ${palette.main} 14%, transparent)`,
          color: palette.darker,
          border: `color-mix(in srgb, ${palette.main} 36%, transparent)`,
        },
        toggled: {
          background: `color-mix(in srgb, ${palette.main} 20%, transparent)`,
          color: palette.darker,
          border: `color-mix(in srgb, ${palette.main} 48%, transparent)`,
        },
      };
    case 'ghost':
      return {
        idle: {
          background: 'transparent',
          color: palette.main,
          border: 'transparent',
        },
        hover: {
          background: `color-mix(in srgb, ${palette.main} 8%, transparent)`,
          color: palette.dark,
          border: 'transparent',
        },
        toggled: {
          background: `color-mix(in srgb, ${palette.main} 14%, transparent)`,
          color: palette.darker,
          border: 'transparent',
        },
      };
    case 'plain':
      return {
        idle: {
          background: 'transparent',
          color: palette.main,
          border: 'transparent',
        },
        hover: {
          background: 'transparent',
          color: palette.dark,
          border: 'transparent',
        },
        toggled: {
          background: 'transparent',
          color: palette.darker,
          border: 'transparent',
        },
      };
    case 'outline':
      return {
        idle: {
          background: 'transparent',
          color: palette.main,
          border: palette.main,
        },
        hover: {
          background: `color-mix(in srgb, ${palette.main} 8%, transparent)`,
          color: palette.dark,
          border: palette.dark,
        },
        toggled: {
          background: `color-mix(in srgb, ${palette.main} 14%, transparent)`,
          color: palette.darker,
          border: palette.darker,
        },
      };
    case 'solid':
    default:
      return {
        idle: {
          background: palette.main,
          color: palette.contrastText,
          border: palette.main,
        },
        hover: {
          background: palette.dark,
          color: palette.contrastText,
          border: palette.dark,
        },
        toggled: {
          background: palette.darker,
          color: palette.contrastText,
          border: palette.darker,
        },
      };
  }
};

export const toggleInteractionStyles = (
  theme: TTheme,
  variant: TButtonVariant = 'outline',
  color: TPaletteColor = 'primary',
) => {
  const tones = tonesFor(variant, theme.colors[color]);

  return `
    ${cssTone(tones.idle)}

    &:hover:not(:disabled):not([aria-pressed='true']) {
      ${cssTone(tones.hover)}
    }

    &:active:not(:disabled):not([aria-pressed='true']) {
      ${cssTone(tones.hover)}
    }

    &[aria-pressed='true'],
    &[aria-pressed='true']:hover:not(:disabled),
    &[aria-pressed='true']:active:not(:disabled) {
      ${cssTone(tones.toggled)}
    }
  `;
};
