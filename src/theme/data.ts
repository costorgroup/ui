import {
  breakpoints,
  colors,
  gap,
  radius,
  sizeScale,
  spacing,
  typography,
  zIndex,
} from './theming';
import { defaultGlobalStyles } from './global-styles';
import { TTheme } from './types';

export const DDefaultTheme: TTheme = {
  fontFamily: '"Poppins", "Segoe UI", system-ui, -apple-system, sans-serif',
  colors,
  breakpoints,
  gap,
  radius,
  sizeScale,
  spacing,
  typography,
  zIndex,
  globalStyles: defaultGlobalStyles,
};
