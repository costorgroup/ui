import styled from '@emotion/styled';
import { TSImageMediaProps, TSImageProps } from './types';

const customImageProps = new Set(['width', 'height', 'radius', 'showFallback']);
const customMediaProps = new Set(['animation', 'visible']);

export const IMAGE_ANIM_MS = 320;

const toCssSize = (value?: number | string) => {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'number' ? `${value}px` : value;
};

export const SImage = styled('span', {
  shouldForwardProp: (prop) => !customImageProps.has(prop),
})<TSImageProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  vertical-align: middle;
  box-sizing: border-box;
  width: ${({ width }) => toCssSize(width) ?? 'auto'};
  height: ${({ height }) => toCssSize(height) ?? 'auto'};
  flex-shrink: 0;
  border-radius: ${({ theme, radius = 'medium' }) => theme.radius[radius]};
  background-color: ${({ theme, showFallback }) =>
    showFallback ? theme.colors.common.grey[10] : 'transparent'};
  color: ${({ theme }) => theme.colors.common.grey[16]};
`;

export const SImageMedia = styled('span', {
  shouldForwardProp: (prop) => !customMediaProps.has(prop),
})<TSImageMediaProps>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ animation, visible }) => (animation && !visible ? 0 : 1)};
  transform: ${({ animation, visible }) => {
    if (animation === 'zoom' && !visible) {
      return 'scale(0.92)';
    }

    return 'scale(1)';
  }};
  transform-origin: center center;
  transition: ${({ animation }) =>
    animation
      ? `opacity ${IMAGE_ANIM_MS}ms ease, transform ${IMAGE_ANIM_MS}ms ease`
      : 'none'};

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    width: 40%;
    height: 40%;
    max-width: 2.5rem;
    max-height: 2.5rem;
  }
`;
