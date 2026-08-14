import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { TSProgressFillProps, TSProgressGapProps, TSProgressProps } from './types';

const customRootProps = new Set(['width', 'height', 'color']);
const customSizeProps = new Set(['size']);

const slide = keyframes`
  from {
    transform: translateX(-50%);
  }

  to {
    transform: translateX(0);
  }
`;

export const SProgress = styled('div', {
  shouldForwardProp: (prop) => !customRootProps.has(prop),
})<TSProgressProps>`
  position: relative;
  display: block;
  box-sizing: border-box;
  flex-shrink: 0;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme, color }) => theme.colors[color].main};
  background-color: ${({ theme, color }) =>
    `color-mix(in srgb, ${theme.colors[color].main} 18%, transparent)`};
`;

export const SProgressRail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 200%;
  height: 100%;
  animation: ${slide} 1.4s linear infinite;
`;

export const SProgressFill = styled('div', {
  shouldForwardProp: (prop) => !customSizeProps.has(prop),
})<TSProgressFillProps>`
  box-sizing: border-box;
  width: ${({ size }) => size};
  flex: 0 0 ${({ size }) => size};
  height: 100%;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: currentColor;
  transition: width 0.2s ease, flex-basis 0.2s ease;
`;

export const SProgressGap = styled('div', {
  shouldForwardProp: (prop) => !customSizeProps.has(prop),
})<TSProgressGapProps>`
  box-sizing: border-box;
  width: ${({ size }) => size};
  flex: 0 0 ${({ size }) => size};
  height: 100%;
`;
