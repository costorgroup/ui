import { createColorScale } from '../helpers/color/create-color-scale';
import { createTheme } from './create-theme';
import { DDarkTheme, DLightTheme } from './data';
import { createColors } from './theming/color';
import type { TColorScheme } from './theming/color';
import type { TTheme } from './types';

const parseRgb = (hex: string) => {
  const normalized = hex.replace('#', '');
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((channel) => channel + channel)
          .join('')
      : normalized;
  const int = Number.parseInt(value, 16);

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
};

const luminance = (hex: string) => {
  const { r, g, b } = parseRgb(hex);

  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

const contrastText = (hex: string) =>
  luminance(hex) > 0.55 ? '#000000' : '#ffffff';

const createPresetTheme = (canvas: string): TTheme => {
  const scheme: TColorScheme = luminance(canvas) > 0.55 ? 'light' : 'dark';
  const defaultFill = scheme === 'light' ? '#000000' : '#ffffff';

  return createTheme({
    colors: {
      ...createColors(scheme),
      base: createColorScale(canvas, contrastText(canvas), {
        canvas,
        tint: 'contrastText',
      }),
      default: createColorScale(defaultFill, contrastText(defaultFill), {
        canvas,
      }),
    },
  });
};

const red = createPresetTheme('#e53935');
const yellow = createPresetTheme('#f5c400');
const green = createPresetTheme('#34c759');
const blue = createPresetTheme('#0a84ff');
const magenta = createPresetTheme('#ff2d92');
const orange = createPresetTheme('#ff8f00');
const cyan = createPresetTheme('#00c7d4');
const purple = createPresetTheme('#af52de');

export const themePresetMap = {
  dark: DDarkTheme,
  light: DLightTheme,
  red,
  yellow,
  green,
  blue,
  magenta,
  orange,
  cyan,
  purple,
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
  { id: 'yellow', title: 'Yellow', theme: yellow },
  { id: 'green', title: 'Green', theme: green },
  { id: 'blue', title: 'Blue', theme: blue },
  { id: 'magenta', title: 'Magenta', theme: magenta },
  { id: 'orange', title: 'Orange', theme: orange },
  { id: 'cyan', title: 'Cyan', theme: cyan },
  { id: 'purple', title: 'Purple', theme: purple },
];

export const DRedTheme = red;
export const DYellowTheme = yellow;
export const DGreenTheme = green;
export const DBlueTheme = blue;
export const DMagentaTheme = magenta;
export const DOrangeTheme = orange;
export const DCyanTheme = cyan;
export const DPurpleTheme = purple;
