import styled from "@emotion/styled";
import { TButtonProps, TButtonSize } from "./types";
import { V2_BUTTON_RADIUS, variantStyles } from "./variant-styles";

type TSButtonProps = Pick<TButtonProps, "variant" | "appearance" | "size" | "color">;

const customProps = new Set(["variant", "appearance", "size", "color"]);

const sizeStyles: Record<
  TButtonSize,
  { fontSize: string; padY: string; padX: string; gap: string }
> = {
  xs: { fontSize: "11px", padY: "2px", padX: "8px", gap: "4px" },
  sm: { fontSize: "12px", padY: "3px", padX: "10px", gap: "4px" },
  md: { fontSize: "13px", padY: "4px", padX: "12px", gap: "5px" },
  lg: { fontSize: "14px", padY: "5px", padX: "14px", gap: "6px" },
  xl: { fontSize: "15px", padY: "6px", padX: "16px", gap: "6px" },
};

export const SButton = styled("button", {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ size = "md" }) => sizeStyles[size].gap};
  min-height: 0;
  border: 1px solid;
  border-radius: ${V2_BUTTON_RADIUS};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: 1.2;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition:
    background-color 0.12s ease,
    border-color 0.12s ease,
    color 0.12s ease,
    opacity 0.12s ease;

  ${({ theme, variant = "solid", appearance = "opaque", color = "default" }) => {
    const palette = theme.colors[color];
    return variantStyles(variant, palette, theme, appearance);
  }}

  ${({ size = "md" }) => {
    const scale = sizeStyles[size];

    return `
      padding: ${scale.padY} ${scale.padX};
      font-size: ${scale.fontSize};
    `;
  }}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme, color = "default" }) => theme.colors[color].main};
    outline-offset: 2px;
  }
`;
