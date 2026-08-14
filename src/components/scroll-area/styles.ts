import styled from "@emotion/styled";
import { TPaletteColor } from "../../theme/types";
import { TScrollAreaMode } from "./types";

type TSScrollAreaProps = {
  mode: TScrollAreaMode;
  color: TPaletteColor;
  hovered: boolean;
};

const customProps = new Set(["mode", "color", "hovered"]);

export const SScrollArea = styled("div", {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSScrollAreaProps>`
  overflow: auto;

  ${({ theme, mode, color, hovered }) => {
    const palette = theme.colors[color];
    const visible = mode === "always" || hovered;
    const thumb = visible ? palette.main : "transparent";

    return `
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${thumb};
        border-radius: ${theme.radius.pill};
        transition: background-color 0.15s ease;
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: ${visible ? palette.dark : "transparent"};
      }
    `;
  }}
`;
