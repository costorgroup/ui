import { css } from '@emotion/react';
import { MOTION, TOverlayEdge } from './tokens';

const transition = (...properties: string[]) =>
  properties
    .map((property) => `${property} ${MOTION.duration} ${MOTION.easing}`)
    .join(', ');

export const reduceMotion = css`
  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
    transform: none !important;
  }
`;

export const overlayFade = css`
  opacity: 0;
  transition: ${transition('opacity')};

  &[data-open='true'] {
    opacity: 1;
  }

  ${reduceMotion}
`;

export const overlayZoom = css`
  transform: translate3d(0, 12px, 0) scale(0.96);
  transition: ${transition('transform')};

  &[data-open='true'] {
    transform: translate3d(0, 0, 0) scale(1);
  }

  ${reduceMotion}
`;

const slideHidden: Record<TOverlayEdge, string> = {
  left: 'translate3d(-100%, 0, 0)',
  right: 'translate3d(100%, 0, 0)',
  top: 'translate3d(0, -100%, 0)',
  bottom: 'translate3d(0, 100%, 0)',
};

export const overlaySlide = (edge: TOverlayEdge) => css`
  transform: ${slideHidden[edge]};
  transition: ${transition('transform')};

  &[data-open='true'] {
    transform: translate3d(0, 0, 0);
  }

  ${reduceMotion}
`;

export const overlayState = (open: boolean) => ({
  'data-open': open ? 'true' : 'false',
});
