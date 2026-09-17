import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { TSShimmerProps } from './types';

const customProps = new Set(['color', 'duration', 'as']);

const shimmerSweep = keyframes`
  from {
    background-position: 160% center;
  }
  to {
    background-position: -60% center;
  }
`;

export const SShimmer = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSShimmerProps>`
  display: inline-block;
  font: inherit;
  background-repeat: repeat-x;
  background-size: 250% 100%;
  background-position: 160% center;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${shimmerSweep} ${({ duration }) => duration}ms linear infinite;

  ${({ theme, color }) => {
    const base = theme.surfaces.muted;
    const highlight =
      color === 'default' ? theme.surfaces.ink : theme.palette[color].main;

    return `
      background-image: linear-gradient(
        90deg,
        ${base} 30%,
        ${highlight} 50%,
        ${base} 70%
      );
    `;
  }}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background-position: 50% center;
  }
`;
