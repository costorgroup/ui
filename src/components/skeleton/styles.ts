import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { TSSkeletonProps } from './types';

const customProps = new Set(['width', 'height', 'radius', 'animation', 'animationOffset']);

const toCssSize = (value?: number | string) => {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'number' ? `${value}px` : value;
};

const pulse = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`;

const wave = keyframes`
  0% {
    transform: translateX(-100%);
  }

  50%,
  100% {
    transform: translateX(100%);
  }
`;

export const SSkeleton = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSSkeletonProps>`
  display: block;
  box-sizing: border-box;
  width: ${({ width }) => toCssSize(width) ?? '100%'};
  height: ${({ height }) => toCssSize(height) ?? '1.2em'};
  flex-shrink: 0;
  border-radius: ${({ theme, radius }) => theme.radius[radius]};
  background-color: ${({ theme }) => theme.colors.common.grey[7]};

  ${({ theme, animation, animationOffset }) => {
    if (animation === 'pulse') {
      return css`
        animation: ${pulse} 1.5s ease-in-out ${animationOffset} infinite;
      `;
    }

    if (animation === 'wave') {
      return css`
        position: relative;
        overflow: hidden;
        -webkit-mask-image: -webkit-radial-gradient(white, black);

        &::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            ${theme.colors.common.grey[2]},
            transparent
          );
          animation: ${wave} 1.6s linear ${animationOffset} infinite;
        }
      `;
    }

    return css``;
  }}
`;
