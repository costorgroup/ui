import { defaultAccents } from './palettes';
import { DEFAULT_ALLOWED_APPEARANCES } from './appearance';
import { DEFAULT_STORAGE_KEY } from './storage';
import {
  breakpoints,
  colors,
  components,
  config,
  gap,
  radius,
  shadows,
  sizes,
  sizeScale,
  spacing,
  typography,
  zIndex,
  resolveSurfaces,
} from './theming';
import { createTheme } from './create-theme';
import { defaultGlobalStyles } from './global-styles';
import { TTheme } from './types';

export const DDefaultTheme: TTheme = {
  fontFamily: typography.fontFamily,
  appearance: 'dark',
  mode: 'dark',
  accent: 'default',
  accents: defaultAccents,
  palettes: defaultAccents,
  allowedAppearances: DEFAULT_ALLOWED_APPEARANCES,
  allowedModes: DEFAULT_ALLOWED_APPEARANCES,
  palette: colors,
  colors,
  surfaces: resolveSurfaces('dark'),
  breakpoints,
  gap,
  radius,
  density: 'comfortable',
  sizes,
  sizeScale,
  spacing,
  typography,
  zIndex,
  shadows,
  components,
  config,
  storageKey: DEFAULT_STORAGE_KEY,
  storage: 'localStorage',
  globalStyles: defaultGlobalStyles,
};

export const DDarkTheme = DDefaultTheme;

export const DLightTheme = createTheme({
  appearance: 'light',
});
