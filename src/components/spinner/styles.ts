import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { TSSpinnerProps } from './types';

const customProps = new Set(['color', 'thickness']);

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

export const SSpinner = styled('svg', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSpinnerProps>`
  display: inline-block;
  flex-shrink: 0;
  overflow: hidden;
  color: ${({ theme, color }) => theme.colors[color].main};
  animation: ${spin} 1.4s linear infinite;

  circle {
    fill: none;
    stroke: currentColor;
    stroke-width: ${({ thickness }) => thickness};
    stroke-linecap: round;
    animation: ${dash} 1.4s ease-in-out infinite;
  }
`;
