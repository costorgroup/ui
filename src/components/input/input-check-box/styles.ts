import styled from "@emotion/styled";
import { fieldFocusRing } from "../../../helpers/variant-styles/surface";
import {
  inputControlIdleHoverStyles,
  inputControlIdleStyles,
} from "../variant-styles";
import { TInputSize } from "../input-wrapper/types";
import { inputCheckBoxClasses } from "./classes";
import { TInputCheckBoxProps } from "./types";

type TSInputCheckBoxProps = Pick<
  TInputCheckBoxProps,
  "variant" | "size" | "color"
>;

const customProps = new Set(["variant", "size", "color"]);

const iconInset: Record<TInputSize, string> = {
  xs: "4px",
  sm: "4px",
  md: "6px",
  lg: "6px",
  xl: "8px",
};

export const SInputCheckBox = styled.span`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
`;

export const SInputCheckBoxInput = styled.input`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const SInputCheckBoxControl = styled("span", {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputCheckBoxProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: ${({ theme, size = "md" }) => theme.sizes[size].icon};
  height: ${({ theme, size = "md" }) => theme.sizes[size].icon};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.xs};
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    color 0.15s ease;

  ${({ theme, variant = "surface", color = "primary" }) =>
    inputControlIdleStyles(variant, theme.palette[color], theme)}

  .${inputCheckBoxClasses.input}:hover:not(:disabled):not(:checked) + & {
    ${({ theme, variant = "surface", color = "primary" }) =>
      inputControlIdleHoverStyles(variant, theme.palette[color], theme)}
  }

  .${inputCheckBoxClasses.input}:checked + & {
    ${({ theme, color = "primary" }) => {
      const palette = theme.palette[color];

      return `
        background-color: ${palette.main};
        border-color: ${palette.main};
        color: ${palette.contrastText};
      `;
    }}
  }

  .${inputCheckBoxClasses.input}:checked:hover:not(:disabled) + & {
    ${({ theme, color = "primary" }) => {
      const palette = theme.palette[color];

      return `
        background-color: ${palette.dark};
        border-color: ${palette.dark};
        color: ${palette.contrastText};
      `;
    }}
  }

  .${inputCheckBoxClasses.input}:checked + & svg {
    opacity: 1;
    transform: scale(1);
  }

  .${inputCheckBoxClasses.input}:focus-visible + & {
    outline: none;
    box-shadow: ${({ theme, color = "primary" }) =>
      fieldFocusRing(theme.palette[color].main)};
  }

  .${inputCheckBoxClasses.input}:disabled + & {
    opacity: 0.5;
  }

  svg {
    width: ${({ theme, size = "md" }) =>
      `calc(${theme.sizes[size].icon} - ${iconInset[size]})`};
    height: ${({ theme, size = "md" }) =>
      `calc(${theme.sizes[size].icon} - ${iconInset[size]})`};
    opacity: 0;
    transform: scale(0.8);
    transition:
      opacity 0.15s ease,
      transform 0.15s ease;
  }
`;
