import styled from "@emotion/styled";
import { CUI_CANVAS_VAR } from "../../../helpers/color/create-color-scale";
import {
  surfacePanelBackground,
  surfacePanelBorder,
  surfacePanelShadow,
} from "../../surface";
import { TSWindowProps } from "./types";

const customProps = new Set(["radius", "appearance"]);

export const SWindow = styled("div", {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSWindowProps>`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing(theme.gap.md)};
  border-radius: ${({ theme, radius }) => theme.radius[radius]};
  border: ${({ theme }) => surfacePanelBorder(theme)};
  box-shadow: ${({ theme }) => surfacePanelShadow(theme)};

  ${({ theme, appearance }) =>
    appearance === "opaque"
      ? `
          ${CUI_CANVAS_VAR}: ${theme.palette.base.main};
          background-color: ${theme.palette.base.main};
          background-image: none;
        `
      : `
          ${CUI_CANVAS_VAR}: transparent;
          background-color: ${surfacePanelBackground(theme)};
          background-image: none;
        `}
`;
