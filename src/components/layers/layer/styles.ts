import styled from '@emotion/styled';
import { CUI_CANVAS_VAR } from '../../../helpers/color/create-color-scale';
import { colorMix } from '../../../helpers/variant-styles/surface';
import { TLayersSpread } from '../types';
import { TSLayerProps } from './types';

const customProps = new Set(['radius', 'index', 'count', 'spread']);

const ORIGIN: Record<TLayersSpread, string> = {
  top: 'center bottom',
  right: 'left center',
  bottom: 'center top',
  left: 'right center',
};

const layerTransform = (
  index: number,
  count: number,
  spread: TLayersSpread,
) => {
  const depth = Math.max(count - 1, 0);
  const scaleStep = depth === 0 ? 0 : Math.min(0.1, 0.42 / depth);
  const scale = 1 - index * scaleStep;
  const distance = (1 - scale) * 100 + (depth === 0 ? 0 : (10 / depth) * index);
  const signed =
    spread === 'top' || spread === 'left' ? -distance : distance;
  const axis = spread === 'left' || spread === 'right' ? 'X' : 'Y';
  const move = `translate${axis}(${signed}%) scale(${scale})`;
  const tilt = depth === 0 ? 30 : 30 * (1 - index / depth);

  switch (spread) {
    case 'top':
      return `rotateX(${-tilt}deg) ${move}`;
    case 'right':
      return `rotateY(${-tilt}deg) ${move}`;
    case 'left':
      return `rotateY(${tilt}deg) ${move}`;
    default:
      return `rotateX(${tilt}deg) ${move}`;
  }
};

export const SLayer = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSLayerProps>`
  --i: ${({ index }) => index};
  position: relative;
  grid-area: 1 / 1;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  z-index: ${({ count, index }) => count - index};
  transform-origin: ${({ spread }) => ORIGIN[spread]};
  border-radius: ${({ theme, radius }) => theme.radius[radius]};
  border: 1px solid ${({ theme }) => theme.surfaces.border};
  color: ${({ theme }) => theme.surfaces.ink};
  transform: ${({ index, count, spread }) =>
    layerTransform(index, count, spread)};
  transition: transform 200ms ease;
  ${({ theme }) => {
    const canvas = theme.surfaces.background;
    const ink = theme.palette.common.black;
    const alpha = theme.mode === 'dark' ? 48 : 16;

    return `
      ${CUI_CANVAS_VAR}: ${canvas};
      background-color: ${canvas};
      box-shadow:
        0 calc(0.25rem + var(--i) * 0.18rem)
          calc(0.9rem + var(--i) * 0.45rem)
          ${colorMix(ink, alpha)},
        0 calc(0.06rem + var(--i) * 0.05rem)
          calc(0.22rem + var(--i) * 0.1rem)
          ${colorMix(ink, alpha + 8)};
    `;
  }}

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-color: ${({ theme }) => theme.surfaces.background};
    opacity: calc(var(--i) * 0.05);
  }

  img,
  video,
  canvas {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
