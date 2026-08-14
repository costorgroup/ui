import { css } from "@emotion/react";
import { TTheme } from "./types";

export const defaultGlobalStyles = (theme: TTheme) => css`
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.main};
    border-radius: ${theme.radius.pill};
    transition: background-color 0.15s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primary.dark};
  }
`;

