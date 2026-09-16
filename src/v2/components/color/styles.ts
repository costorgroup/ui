import styled from '@emotion/styled';
import type { TTheme } from '../../../theme/types';
import {
  CHROME_FILL,
  SURFACE_BORDER_HOVER,
} from '../../idle-variant-styles';
import { colorMix, colorMixBase } from '../../surface';
import { TColorValue, TSColorProps } from './types';

const customProps = new Set(['size', 'colors']);

const glowColor = (theme: TTheme, colors: TColorValue[]) =>
  colors[colors.length - 1] ?? theme.palette.default.main;

export const SColor = styled('button', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSColorProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
  appearance: none;
  flex-shrink: 0;
  overflow: hidden;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) =>
    colorMixBase(theme.surfaces.mixer, CHROME_FILL, theme.surfaces.background)};
  border-color: ${({ theme }) => theme.surfaces.border};
  color: ${({ theme }) => theme.surfaces.ink};
  font-family: inherit;
  cursor: pointer;
  box-shadow: none;
  transition: border-color 0.15s ease;

  ${({ theme, size }) => {
    const step = theme.sizes[size];

    return `
      width: ${step.height};
      height: ${step.height};
      padding: calc(${step.gap} / 2);
    `;
  }}

  &:hover:not(:disabled):not(:focus-visible):not([aria-pressed='true']) {
    border-color: ${({ theme }) =>
      colorMix(theme.surfaces.mixer, SURFACE_BORDER_HOVER)};
  }

  &:focus-visible,
  &:active:not(:disabled),
  &[aria-pressed='true'] {
    border-color: ${({ theme, colors }) => glowColor(theme, colors)};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme, colors }) => glowColor(theme, colors)};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const SColorSwatch = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.full};
  pointer-events: none;
`;
