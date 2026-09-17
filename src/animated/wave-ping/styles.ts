import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { playModeRingStyles } from '../play-mode-styles';
import { wavePingClasses } from './classes';
import { TSWavePingProps, TSWavePingRingProps } from './types';

const customProps = new Set(['color', 'thickness', 'duration', 'spread', 'radius']);
const ringCustomProps = new Set(['delay']);

const wavePing = keyframes`
  0% {
    opacity: 0.7;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(calc(1 + var(--wave-spread)));
  }
`;

export const SWavePing = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSWavePingProps>`
  position: relative;
  display: inline-flex;
  isolation: isolate;
  vertical-align: middle;
  max-width: 100%;
  --wave-color: ${({ color }) => color};
  --wave-thickness: ${({ thickness }) => `${thickness}px`};
  --wave-radius: ${({ theme, radius }) => theme.radius[radius]};
  --wave-duration: ${({ duration }) => `${duration}s`};
  --wave-spread: ${({ spread }) => spread};
  border-radius: var(--wave-radius);

  ${playModeRingStyles(
    `.${wavePingClasses.ring}`,
    css`${wavePing} var(--wave-duration) ease-out infinite`,
  )}
`;

export const SWaveRing = styled('span', {
  shouldForwardProp: (prop) => !ringCustomProps.has(prop),
})<TSWavePingRingProps>`
  pointer-events: none;
  position: absolute;
  inset: calc(-1 * var(--wave-thickness));
  z-index: 0;
  border-radius: calc(var(--wave-radius) + var(--wave-thickness));
  border: var(--wave-thickness) solid var(--wave-color);
  opacity: 0;
  animation-delay: ${({ delay }) => `${delay}s`};
`;

export const SWaveContent = styled.span`
  position: relative;
  z-index: 1;
  display: inherit;
  flex-direction: inherit;
  align-items: inherit;
  justify-content: inherit;
  width: inherit;
  min-width: inherit;
  max-width: inherit;
  border-radius: inherit;
`;
