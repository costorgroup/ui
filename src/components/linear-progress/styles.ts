import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import {
  TSLinearProgressFillProps,
  TSLinearProgressGapProps,
  TSLinearProgressProps,
} from "./types";
import { trackVariantStyles } from "./variant-styles";

const customRootProps = new Set(["width", "height", "color", "variant"]);
const customSizeProps = new Set(["size"]);

const slide = keyframes`
  from {
    transform: translateX(-50%);
  }

  to {
    transform: translateX(0);
  }
`;

export const SLinearProgress = styled("div", {
  shouldForwardProp: (prop) => !customRootProps.has(prop),
})<TSLinearProgressProps>`
  position: relative;
  display: block;
  box-sizing: border-box;
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === "number" ? `${height}px` : height};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme, color }) =>
    color === "default" ? theme.surfaces.ink : theme.palette[color].main};

  ${({ theme, color, variant }) => {
    const palette = theme.palette[color];
    return trackVariantStyles(variant, palette, theme);
  }}
`;

export const SLinearProgressRail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 200%;
  height: 100%;
  animation: ${slide} 1.4s linear infinite;
`;

export const SLinearProgressFill = styled("div", {
  shouldForwardProp: (prop) => !customSizeProps.has(prop),
})<TSLinearProgressFillProps>`
  box-sizing: border-box;
  width: ${({ size }) => size};
  flex: 0 0 ${({ size }) => size};
  height: 100%;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: currentColor;
  transition:
    width 0.2s ease,
    flex-basis 0.2s ease;
`;

export const SLinearProgressGap = styled("div", {
  shouldForwardProp: (prop) => !customSizeProps.has(prop),
})<TSLinearProgressGapProps>`
  box-sizing: border-box;
  width: ${({ size }) => size};
  flex: 0 0 ${({ size }) => size};
  height: 100%;
`;
