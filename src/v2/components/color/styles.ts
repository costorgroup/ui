import styled from '@emotion/styled';
import type { TTheme } from '../../../theme/types';
import { SURFACE_BORDER_IDLE } from '../../idle-variant-styles';
import {
  chromeOpaqueFill,
  chromeTransparentFill,
  colorMix,
} from '../../surface';
import { TColorSize, TColorValue, TSColorProps } from './types';

const customProps = new Set(['size', 'colors']);

const AVATAR_FILL = 10;
const CANVAS_BORDER_HOVER = 38;
const PALETTE_BORDER_FOCUS = 92;
const CANVAS_GLOW_SOFT = 6;
const CANVAS_GLOW_CORE = 10;
const PALETTE_GLOW_SOFT = 26;
const PALETTE_GLOW_CORE = 36;

const sizeBox: Record<TColorSize, string> = {
  xs: '1.5rem',
  sm: '1.75rem',
  md: '2rem',
  lg: '2.5rem',
  xl: '3rem',
};

const sizePad: Record<TColorSize, string> = {
  xs: '2px',
  sm: '3px',
  md: '4px',
  lg: '5px',
  xl: '6px',
};

const glowColor = (theme: TTheme, colors: TColorValue[]) =>
  colors[colors.length - 1] ?? theme.colors.default.main;

const insetGlow = (color: string, soft: number, core: number) => `
  box-shadow:
    inset 0 0 8px 1px ${colorMix(color, soft)},
    inset 0 0 3px 0 ${colorMix(color, core)};
`;

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
  width: ${({ size }) => sizeBox[size]};
  height: ${({ size }) => sizeBox[size]};
  padding: ${({ size }) => sizePad[size]};
  overflow: hidden;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.circle};
  background-color: ${({ theme }) => chromeOpaqueFill(theme, AVATAR_FILL)};
  border-color: ${({ theme }) => chromeTransparentFill(theme, SURFACE_BORDER_IDLE)};
  font-family: inherit;
  cursor: pointer;
  box-shadow: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover:not(:disabled):not(:focus-visible):not([aria-pressed='true']) {
    border-color: ${({ theme }) =>
      colorMix(theme.colors.base.contrastText, CANVAS_BORDER_HOVER)};
    ${({ theme }) =>
      insetGlow(
        theme.colors.base.contrastText,
        CANVAS_GLOW_SOFT,
        CANVAS_GLOW_CORE,
      )}
  }

  &:focus-visible,
  &:active:not(:disabled),
  &[aria-pressed='true'] {
    border-color: ${({ theme, colors }) =>
      colorMix(glowColor(theme, colors), PALETTE_BORDER_FOCUS)};
    ${({ theme, colors }) =>
      insetGlow(glowColor(theme, colors), PALETTE_GLOW_SOFT, PALETTE_GLOW_CORE)}
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
  border-radius: ${({ theme }) => theme.radius.circle};
  pointer-events: none;
`;
