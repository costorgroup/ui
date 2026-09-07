import { createColorScale } from '../helpers/color/create-color-scale';
import { createTheme } from './create-theme';
import { DDarkTheme, DLightTheme } from './data';
import { createColors } from './theming/color';
import type { TThemeColorScale } from './theming/color/types';
import type { TTheme } from './types';

/** Grayscale contrast — theme text (`default.main`) and default buttons. */
const defaultOnLight = createColorScale('#000000', '#ffffff');
const defaultOnDark = createColorScale('#ffffff', '#000000');

const createPresetTheme = (
  canvas: string,
  mixer: string,
  contrast: TThemeColorScale,
): TTheme =>
  createTheme({
    colors: {
      ...createColors(),
      base: createColorScale(canvas, mixer),
      default: contrast,
    },
  });

const red = createPresetTheme('#d94a4a', '#000000', defaultOnDark);
const blue = createPresetTheme('#2b6de5', '#000000', defaultOnDark);
const green = createPresetTheme('#2a9d5c', '#000000', defaultOnDark);
const navy = createPresetTheme('#071A35', '#ffffff', defaultOnDark);

export const themePresetMap = {
  dark: DDarkTheme,
  light: DLightTheme,
  red,
  blue,
  green,
  navy,
} as const;

export type TThemePresetId = keyof typeof themePresetMap;

export type TThemePreset = {
  id: TThemePresetId;
  title: string;
  theme: TTheme;
};

export const themePresets: TThemePreset[] = [
  { id: 'dark', title: 'Dark', theme: DDarkTheme },
  { id: 'light', title: 'Light', theme: DLightTheme },
  { id: 'red', title: 'Red', theme: red },
  { id: 'blue', title: 'Blue', theme: blue },
  { id: 'green', title: 'Green', theme: green },
  { id: 'navy', title: 'Navy', theme: navy },
];

export const DRedTheme = red;
export const DBlueTheme = blue;
export const DGreenTheme = green;
export const DNavyTheme = navy;
