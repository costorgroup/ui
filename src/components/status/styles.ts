import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { TSStatusProps } from './types';

const customProps = new Set(['color', 'size', 'pulse']);

const pulseRing = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
`;

/**
 * A 1em box that inherits the surrounding font size, shifted so its centre
 * lands on the middle of the adjacent text — the dot stays aligned with
 * whatever text it sits next to.
 */
export const SStatus = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
}) <TSStatusProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const SStatusDot = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
}) <TSStatusProps>`
  position: relative;
  display: block;
  width: calc(${({ theme, size }) => theme.sizes[size].icon} * 0.5);
  height: calc(${({ theme, size }) => theme.sizes[size].icon} * 0.5);
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme, color }) => theme.palette[color].main};

  ${({ theme, color, pulse }) =>
    pulse &&
    css`
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background-color: ${theme.palette[color].main};
        animation: ${pulseRing} 1.6s ease-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        &::after {
          animation: none;
          display: none;
        }
      }
    `}
`;
