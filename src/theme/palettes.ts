import { createColorScale } from '../helpers/color/create-color-scale';
import type { TThemeMode } from './appearance';
import { colorSchemes } from './theming/color';
import type { TThemeColorScale, TThemeColorsOptions } from './theming/color/types';

export type TThemePaletteColor = string | TThemeColorScale;
export type TThemeAccentColor = TThemePaletteColor;

export type TThemeAccentPalette = {
  primary: TThemeColorScale;
  secondary?: TThemeColorScale;
  base?: TThemePaletteColor;
  default?: TThemePaletteColor;
  inverted?: TThemePaletteColor;
};

export type TThemeAccent = {
  id: string;
  name: string;
  palette: TThemeAccentPalette;
};

export const resolvePaletteColor = (
  value: TThemePaletteColor | undefined,
  contrastText: string,
): TThemeColorScale | undefined => {
  if (!value) {
    return undefined;
  }

  return typeof value === 'string'
    ? createColorScale(value, contrastText)
    : value;
};

export const resolveAccentPalette = (
  accent: TThemeAccent,
  mode: TThemeMode,
): TThemeColorsOptions => {
  const scheme = colorSchemes[mode];
  const { palette } = accent;

  return {
    primary: palette.primary,
    secondary: palette.secondary,
    base: resolvePaletteColor(palette.base, scheme.base.contrastText),
    default: resolvePaletteColor(palette.default, scheme.default.contrastText),
    inverted: resolvePaletteColor(palette.inverted, scheme.inverted.contrastText),
  };
};

const scale = (hex: string) => createColorScale(hex, '#ffffff');

export const defaultAccents: TThemeAccent[] = [
  {
    id: 'default',
    name: 'Default',
    palette: {
      primary: createColorScale('#4226df', '#ffffff'),
    },
  },
  {
    id: 'red',
    name: 'Red',
    palette: { primary: scale('#d94a4a') },
  },
  {
    id: 'blue',
    name: 'Blue',
    palette: { primary: scale('#2b6de5') },
  },
  {
    id: 'green',
    name: 'Green',
    palette: { primary: scale('#2a9d5c') },
  },
  {
    id: 'navy',
    name: 'Navy',
    palette: { primary: scale('#071A35') },
  },
];

export const resolveAccent = (
  id: string | undefined,
  accents: readonly TThemeAccent[],
): TThemeAccent =>
  accents.find((item) => item.id === id) ?? accents[0] ?? defaultAccents[0];

export const accentSwatch = (accent: TThemeAccent) =>
  accent.palette.primary.main;

export const defaultPalettes = defaultAccents;
export const resolvePalette = resolveAccent;
export const resolvePaletteColors = resolveAccentPalette;
export const resolveAccentColors = resolveAccentPalette;
export const paletteSwatch = accentSwatch;
export const resolveAccentColor = resolvePaletteColor;
