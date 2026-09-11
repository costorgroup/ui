import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import {
  isSurfaceTrackVariant,
  resolveTrackColor,
  trackSurfaceBorder,
} from '../../track-variant-styles';
import { TSCircularProgressProps } from './types';

const customProps = new Set(['color', 'variant', 'thickness']);

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 70, 200;
    stroke-dashoffset: -30;
  }

  100% {
    stroke-dasharray: 70, 200;
    stroke-dashoffset: -100;
  }
`;

export const SCircularProgress = styled('svg', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSCircularProgressProps>`
  display: inline-block;
  flex-shrink: 0;
  overflow: hidden;
  color: ${({ theme, color }) => theme.palette[color].main};
  animation: ${spin} 1.4s linear infinite;

  ${({ theme, variant }) => {
    if (!isSurfaceTrackVariant(variant)) {
      return '';
    }

    return `
      border-radius: 50%;
      border: ${trackSurfaceBorder(theme)};
    `;
  }}

  path[data-part='track'] {
    fill: ${({ theme, color, variant }) =>
      resolveTrackColor(variant, theme.palette[color], theme)};
  }

  circle {
    fill: none;
    stroke: currentColor;
    stroke-width: ${({ thickness }) => thickness};
    stroke-linecap: round;
    animation: ${dash} 1.4s ease-in-out infinite;
  }
`;
