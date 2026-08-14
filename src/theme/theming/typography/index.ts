import { TThemeTypography } from './types';

export const typography: TThemeTypography = {
  heading: {
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.75rem',
    h4: '1.5rem',
    h5: '1.25rem',
    h6: '1.125rem',
  },
  text: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.125rem',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    heading: 1.25,
    text: 1.5,
  },
};

export type { TThemeTypography, TThemeTypographyHeading, TThemeTypographyText } from './types';
