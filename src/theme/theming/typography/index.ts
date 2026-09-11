import {
  TThemeTypography,
  TThemeTypographyOptions,
  TThemeTypographyVariant,
} from './types';

const FONT_FAMILY =
  '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif';

const weights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

const lineHeights = {
  heading: 1.25,
  text: 1.5,
} as const;

const headingSizes = {
  h1: '2.5rem',
  h2: '2rem',
  h3: '1.75rem',
  h4: '1.5rem',
  h5: '1.25rem',
  h6: '1.125rem',
} as const;

const textSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
} as const;

const variant = (
  fontSize: string,
  fontWeight: number,
  lineHeight: number,
): TThemeTypographyVariant => ({
  fontFamily: FONT_FAMILY,
  fontSize,
  fontWeight,
  fontStyle: 'normal',
  lineHeight,
});

export const typography: TThemeTypography = {
  fontFamily: FONT_FAMILY,
  fontSize: textSizes.md,
  fontStyle: 'normal',
  fontWeight: weights,
  lineHeight: lineHeights,
  heading: headingSizes,
  text: textSizes,
  h1: variant(headingSizes.h1, weights.bold, lineHeights.heading),
  h2: variant(headingSizes.h2, weights.bold, lineHeights.heading),
  h3: variant(headingSizes.h3, weights.semibold, lineHeights.heading),
  h4: variant(headingSizes.h4, weights.semibold, lineHeights.heading),
  h5: variant(headingSizes.h5, weights.medium, lineHeights.heading),
  h6: variant(headingSizes.h6, weights.medium, lineHeights.heading),
  body: variant(textSizes.md, weights.regular, lineHeights.text),
  small: variant(textSizes.xs, weights.regular, lineHeights.text),
};

const mergeVariant = (
  base: TThemeTypographyVariant,
  next?: Partial<TThemeTypographyVariant>,
  shared?: { fontFamily?: string; fontStyle?: string },
): TThemeTypographyVariant => ({
  ...base,
  ...next,
  fontFamily: next?.fontFamily ?? shared?.fontFamily ?? base.fontFamily,
  fontStyle: next?.fontStyle ?? shared?.fontStyle ?? base.fontStyle,
});

export const mergeTypography = (
  override?: TThemeTypographyOptions,
): TThemeTypography => {
  const fontFamily = override?.fontFamily ?? typography.fontFamily;
  const fontStyle = override?.fontStyle ?? typography.fontStyle;
  const fontWeight = { ...typography.fontWeight, ...override?.fontWeight };
  const lineHeight = { ...typography.lineHeight, ...override?.lineHeight };
  const heading = { ...typography.heading, ...override?.heading };
  const text = { ...typography.text, ...override?.text };
  const shared = { fontFamily, fontStyle };

  return {
    fontFamily,
    fontSize: override?.fontSize ?? typography.fontSize,
    fontStyle,
    fontWeight,
    lineHeight,
    heading,
    text,
    h1: mergeVariant(typography.h1, override?.h1, shared),
    h2: mergeVariant(typography.h2, override?.h2, shared),
    h3: mergeVariant(typography.h3, override?.h3, shared),
    h4: mergeVariant(typography.h4, override?.h4, shared),
    h5: mergeVariant(typography.h5, override?.h5, shared),
    h6: mergeVariant(typography.h6, override?.h6, shared),
    body: mergeVariant(typography.body, override?.body, shared),
    small: mergeVariant(typography.small, override?.small, shared),
  };
};

export type {
  TThemeTypography,
  TThemeTypographyHeading,
  TThemeTypographyText,
  TThemeTypographyVariant,
  TThemeTypographyOptions,
  TThemeFontWeightScale,
} from './types';
