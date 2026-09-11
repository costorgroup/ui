import styled from "@emotion/styled";
import { TTextOwnProps } from "./types";

type TSTextProps = Pick<TTextOwnProps, "color" | "size">;

const customProps = new Set(["color", "size"]);

export const SText = styled("p", {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSTextProps>`
  margin: 0;
  font-family: inherit;
  font-size: ${({ theme, size = "md" }) => theme.typography.text[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: ${({ theme, color = "default" }) => theme.palette[color].main};
`;
