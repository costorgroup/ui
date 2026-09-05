import {
  breakpoints,
  colorSchemes,
  colors,
  gap,
  radius,
  sizeScale,
  spacing,
  typography,
  zIndex,
  config,
} from './theming';
import { createTheme } from './create-theme';
import { defaultGlobalStyles } from './global-styles';
import { TTheme } from './types';

export const DDefaultTheme: TTheme = {
  fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
  colors,
  breakpoints,
  gap,
  radius,
  sizeScale,
  spacing,
  typography,
  zIndex,
  config,
  globalStyles: defaultGlobalStyles,
};

export const DDarkTheme = DDefaultTheme;

export const DLightTheme = createTheme({
  colors: colorSchemes.light,
});
