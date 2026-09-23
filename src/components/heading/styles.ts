import styled from "@emotion/styled";
import { THeadingAs, THeadingOwnProps } from "./types";

type TSHeadingProps = {
  level: THeadingAs;
  color?: THeadingOwnProps["color"];
};

const customProps = new Set(["level", "color", "as"]);

export const SHeading = styled("h1", {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSHeadingProps>`
  ${({ theme, color = "default", level }) => `
    margin: 0;
    font-family: inherit;
    font-style: ${theme.typography[level].fontStyle};
    font-weight: ${theme.typography[level].fontWeight};
    line-height: ${theme.typography[level].lineHeight};
    color: ${theme.palette[color].main};
    font-size: ${theme.typography.heading[level]};
    letter-spacing: 0;
  `}
`;
