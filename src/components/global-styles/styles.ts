import { css } from '@emotion/react';
import { TTheme } from '../../theme/types';

export const createBaselineStyles = (theme: TTheme) => css`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: ${theme.fontFamily};
    color: ${theme.colors.default.main};
    background-color: ${theme.colors.light.main};
    font-size: ${theme.typography.text.medium};
  }
`;
