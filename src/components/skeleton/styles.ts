import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { CHROME_IDLE } from '../../helpers/variant-styles';
import { colorMixBase } from '../../helpers/variant-styles/surface';
import { TSSkeletonProps } from './types';

const SKELETON_PEAK = 10;

const customProps = new Set(['width', 'height', 'radius', 'animation', 'animationOffset']);

const toCssSize = (value?: number | string) => {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'number' ? `${value}px` : value;
};

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

  ${({ theme, animation, animationOffset }) => {
    const idle = colorMixBase(
      theme.surfaces.mixer,
      CHROME_IDLE,
      theme.surfaces.background,
    );
    const peak = colorMixBase(
      theme.surfaces.mixer,
      SKELETON_PEAK,
      theme.surfaces.background,
    );

    if (animation === 'none') {
      return css`
        background-color: ${peak};
      `;
    }

    if (animation === 'pulse') {
      const pulse = keyframes`
        0% {
          background-color: ${idle};
        }

        50% {
          background-color: ${peak};
        }

        100% {
          background-color: ${idle};
        }
      `;

      return css`
        background-color: ${idle};
        animation: ${pulse} 1.5s ease-in-out ${animationOffset} infinite;
      `;
    }

    if (animation === 'wave') {
      return css`
        background-color: ${peak};
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
            ${idle},
            transparent
          );
          animation: ${wave} 1.6s linear ${animationOffset} infinite;
        }
      `;
    }

    return css``;
  }}
`;
