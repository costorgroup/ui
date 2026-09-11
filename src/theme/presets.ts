import { createTheme } from './create-theme';
import { DDarkTheme, DLightTheme } from './data';
import type { TTheme } from './types';

export const themePresetMap = {
  dark: DDarkTheme,
  light: DLightTheme,
  red: createTheme({ appearance: 'dark', accent: 'red' }),
  blue: createTheme({ appearance: 'dark', accent: 'blue' }),
  green: createTheme({ appearance: 'dark', accent: 'green' }),
  navy: createTheme({ appearance: 'dark', accent: 'navy' }),
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
  { id: 'red', title: 'Red', theme: themePresetMap.red },
  { id: 'blue', title: 'Blue', theme: themePresetMap.blue },
  { id: 'green', title: 'Green', theme: themePresetMap.green },
  { id: 'navy', title: 'Navy', theme: themePresetMap.navy },
];

export const DRedTheme = themePresetMap.red;
export const DBlueTheme = themePresetMap.blue;
export const DGreenTheme = themePresetMap.green;
export const DNavyTheme = themePresetMap.navy;
