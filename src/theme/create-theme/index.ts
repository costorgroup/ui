import { DDefaultTheme } from '../data';
import { mergeColors } from '../helpers';
import { createBreakpoints } from '../theming';
import { TTheme } from '../types';
import { TCreateTheme, TThemeOptions } from './types';

export const createTheme: TCreateTheme = (options: TThemeOptions = {}): TTheme => ({
  ...DDefaultTheme,
  ...options,
  breakpoints: createBreakpoints({
    unit: options.breakpoints?.unit ?? DDefaultTheme.breakpoints.unit,
    step: options.breakpoints?.step ?? DDefaultTheme.breakpoints.step,
    values: {
      ...DDefaultTheme.breakpoints.values,
      ...options.breakpoints?.values,
    },
  }),
  colors: mergeColors(DDefaultTheme.colors, options.colors),
  gap: {
    ...DDefaultTheme.gap,
    ...options.gap,
  },
  radius: {
    ...DDefaultTheme.radius,
    ...options.radius,
  },
  sizeScale: {
    ...DDefaultTheme.sizeScale,
    ...options.sizeScale,
  },
  spacing: options.spacing ?? DDefaultTheme.spacing,
  typography: {
    ...DDefaultTheme.typography,
    ...options.typography,
    heading: {
      ...DDefaultTheme.typography.heading,
      ...options.typography?.heading,
    },
    text: {
      ...DDefaultTheme.typography.text,
      ...options.typography?.text,
    },
    fontWeight: {
      ...DDefaultTheme.typography.fontWeight,
      ...options.typography?.fontWeight,
    },
    lineHeight: {
      ...DDefaultTheme.typography.lineHeight,
      ...options.typography?.lineHeight,
    },
  },
  zIndex: {
    ...DDefaultTheme.zIndex,
    ...options.zIndex,
  },
});

export type { TCreateTheme, TThemeOptions } from './types';
