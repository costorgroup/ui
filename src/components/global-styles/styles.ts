import { css } from "@emotion/react";
import { CUI_CANVAS_VAR } from "../../helpers/color/create-color-scale";
import { TTheme } from "../../theme/types";

export const createBaselineStyles = (theme: TTheme) => css`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    ${CUI_CANVAS_VAR}: ${theme.colors.base.main};
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: ${theme.fontFamily};
    color: ${theme.colors.base.contrastText};
    background-color: ${theme.colors.base.main};
    font-size: ${theme.typography.text.medium};
  }
`;

