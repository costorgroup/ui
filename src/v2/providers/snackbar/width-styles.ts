import { TTheme } from '../../../theme/types';

export const snackbarInset = (theme: TTheme) => theme.spacing(theme.gap.md);

export const snackbarWidthBounds = (theme: TTheme) => {
  const inset = snackbarInset(theme);
  const { snackbarMinWidth, snackbarMaxWidth } = theme.config;
  const available = `calc(100vw - ${inset})`;

  return {
    inset,
    min: `min(${snackbarMinWidth}px, ${available})`,
    max: `min(${snackbarMaxWidth}px, ${available})`,
  };
};

export const snackbarViewportWidthStyles = (
  theme: TTheme,
  stretch: boolean,
) => {
  const { min, max } = snackbarWidthBounds(theme);

  if (stretch) {
    return `
      width: ${max};
      min-width: ${min};
      max-width: ${max};
    `;
  }

  return '';
};

export const snackbarItemWidthStyles = (
  theme: TTheme,
  stretch: boolean,
) => {
  const { min, max } = snackbarWidthBounds(theme);

  if (stretch) {
    return `
      width: 100%;
      min-width: 0;
      max-width: 100%;
    `;
  }

  return `
    width: fit-content;
    min-width: ${min};
    max-width: ${max};
  `;
};
