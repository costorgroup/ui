import styled from "@emotion/styled";
import { CHROME_IDLE } from "../../../helpers/variant-styles";
import { colorMix } from "../../../helpers/variant-styles/surface";
import { TSCardHeaderProps } from "./types";

const customProps = new Set(["variant"]);

export const SCardHeader = styled("div", {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSCardHeaderProps>`
  display: grid;
  grid-auto-rows: min-content;
  align-items: start;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  padding-inline: var(--card-spacing);
  min-width: 0;

  ${({ theme, variant }) => {
    if (variant === "plain") return "";

    return `
      padding-bottom: var(--card-spacing);
      border-bottom: 1px solid ${theme.surfaces.divider};
      ${variant === "muted" ? `background-color: ${colorMix(theme.surfaces.mixer, CHROME_IDLE)};` : ""}

      &:first-child {
        padding-top: var(--card-spacing);
      }
    `;
  }}
`;
