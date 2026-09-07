import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { playModeRingStyles } from '../play-mode-styles';
import { neonPulseClasses } from './classes';
import { TSNeonPulseProps } from './types';

const customProps = new Set(['color', 'thickness', 'duration', 'radius']);

const neonPulse = keyframes`
  0%,
  100% {
    box-shadow:
      0 0 12px -2px color-mix(in lab, var(--neon-color) 65%, transparent),
      0 0 0 0 color-mix(in lab, var(--neon-color) 35%, transparent);
    opacity: 0.85;
  }

  50% {
    box-shadow:
      0 0 24px 2px color-mix(in lab, var(--neon-color) 80%, transparent),
      0 0 48px 8px color-mix(in lab, var(--neon-color) 45%, transparent);
    opacity: 1;
  }
`;

export const SNeonPulse = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSNeonPulseProps>`
  position: relative;
  display: inline-flex;
  isolation: isolate;
  vertical-align: middle;
  max-width: 100%;
  --neon-color: ${({ color }) => color};
  --neon-thickness: ${({ thickness }) => `${thickness}px`};
  --neon-radius: ${({ theme, radius }) => theme.radius[radius]};
  --neon-duration: ${({ duration }) => `${duration}s`};
  border-radius: var(--neon-radius);

  ${playModeRingStyles(
    `.${neonPulseClasses.ring}`,
    css`${neonPulse} var(--neon-duration) ease-in-out infinite`,
  )}
`;

export const SNeonRing = styled.span`
  pointer-events: none;
  position: absolute;
  inset: calc(-1 * var(--neon-thickness));
  z-index: 0;
  border-radius: calc(var(--neon-radius) + var(--neon-thickness));
  border: var(--neon-thickness) solid var(--neon-color);
  box-shadow: 0 0 14px -2px color-mix(in lab, var(--neon-color) 70%, transparent);
`;

export const SNeonContent = styled.span`
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
