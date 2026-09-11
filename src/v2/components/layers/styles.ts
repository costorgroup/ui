import styled from '@emotion/styled';
import { TLayersSpread, TSLayersProps } from './types';

const customProps = new Set(['count', 'aspectRatio', 'spread']);

const TILT = '30deg';
const PERSPECTIVE = '400px';

const pinScene = (spread: TLayersSpread) => {
  const center = 'calc((1 - var(--layers-fit)) * 50%)';

  switch (spread) {
    case 'top':
      return `
        --layers-pin-top: auto;
        --layers-pin-right: auto;
        --layers-pin-bottom: 0;
        --layers-pin-left: ${center};
      `;
    case 'right':
      return `
        --layers-pin-top: ${center};
        --layers-pin-right: auto;
        --layers-pin-bottom: auto;
        --layers-pin-left: 0;
      `;
    case 'left':
      return `
        --layers-pin-top: ${center};
        --layers-pin-right: 0;
        --layers-pin-bottom: auto;
        --layers-pin-left: auto;
      `;
    default:
      return `
        --layers-pin-top: 0;
        --layers-pin-right: auto;
        --layers-pin-bottom: auto;
        --layers-pin-left: ${center};
      `;
  }
};

export const SLayers = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSLayersProps>`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 16rem;
  max-width: 100%;
  vertical-align: top;
  container-type: inline-size;
  --layers-aspect-ratio: ${({ aspectRatio = '3 / 4' }) => aspectRatio};
  --layers-h: calc(100cqw / (var(--layers-aspect-ratio)));
  --layers-depth: ${({ spread }) =>
    spread === 'left' || spread === 'right'
      ? '100cqw'
      : 'var(--layers-h)'};
  --layers-fit: min(
    0.88,
    calc(${PERSPECTIVE} / (${PERSPECTIVE} + sin(${TILT}) * var(--layers-depth)))
  );
  aspect-ratio: var(--layers-aspect-ratio);
  ${({ spread }) => pinScene(spread)}
`;

export const SLayersScene = styled('div')`
  position: absolute;
  top: var(--layers-pin-top);
  right: var(--layers-pin-right);
  bottom: var(--layers-pin-bottom);
  left: var(--layers-pin-left);
  display: grid;
  width: calc(100% * var(--layers-fit));
  justify-items: stretch;
  align-items: stretch;
  perspective: ${PERSPECTIVE};
  aspect-ratio: var(--layers-aspect-ratio);
`;
