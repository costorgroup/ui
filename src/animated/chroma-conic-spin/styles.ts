import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { chromaConicSpinClasses } from './classes';
import { playModeRingStyles } from '../play-mode-styles';
import { TSChromaConicSpinProps, TSChromaRingProps } from './types';

const rootCustomProps = new Set(['radius']);
const ringCustomProps = new Set([
  'origin',
  'gradient',
  'thickness',
  'duration',
  'maskComposite',
  'webkitMaskComposite',
]);

const chromaSpin = keyframes`
  to {
    --cui-chroma-angle: 360deg;
  }
`;

export const chromaGlobalStyles = css`
  @property --cui-chroma-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }
`;

export const SChromaConicSpin = styled('div', {
  shouldForwardProp: (prop) => !rootCustomProps.has(prop),
})<TSChromaConicSpinProps>`
  ${chromaGlobalStyles}
  position: relative;
  display: inline-flex;
  isolation: isolate;
  vertical-align: middle;
  max-width: 100%;
  --chroma-radius: ${({ theme, radius }) => theme.radius[radius]};
  border-radius: var(--chroma-radius);

  ${playModeRingStyles(
    `.${chromaConicSpinClasses.ring}`,
    css`${chromaSpin} var(--chroma-duration) linear infinite`,
  )}
`;

export const SChromaRing = styled('span', {
  shouldForwardProp: (prop) => !ringCustomProps.has(prop),
})<TSChromaRingProps>`
  pointer-events: none;
  position: absolute;
  --chroma-thickness: ${({ thickness }) => `${thickness}px`};
  --chroma-duration: ${({ duration }) => `${duration}s`};
  --chroma-gradient: ${({ gradient }) => gradient};
  inset: calc(-1 * var(--chroma-thickness));
  z-index: 0;
  border-radius: calc(var(--chroma-radius) + var(--chroma-thickness));
  background: conic-gradient(
    from var(--cui-chroma-angle, 0deg) at ${({ origin }) => origin},
    var(--chroma-gradient)
  );
  padding: var(--chroma-thickness);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: ${({ webkitMaskComposite }) => webkitMaskComposite};
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: ${({ maskComposite }) => maskComposite};
`;

export const SChromaContent = styled.span`
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
