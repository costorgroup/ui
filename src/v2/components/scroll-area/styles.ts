import styled from '@emotion/styled';
import { CHROME_FILL, CHROME_HOVER } from '../../idle-variant-styles';
import { colorMix } from '../../surface';
import { scrollAreaClasses } from './classes';
import {
  TSScrollAreaFadeProps,
  TSScrollAreaScrollbarProps,
  TSScrollAreaViewportProps,
} from './types';

const fadeCustomProps = new Set(['fade']);
const viewportCustomProps = new Set(['axis']);
const scrollbarCustomProps = new Set(['origin', 'axis']);
const thumbCustomProps = new Set(['axis']);

const blockGradient = `linear-gradient(
  to bottom,
  transparent 0,
  #000 var(--cui-scroll-fade-t, 0px),
  #000 calc(100% - var(--cui-scroll-fade-b, 0px)),
  transparent 100%
)`;

const inlineGradient = `linear-gradient(
  to right,
  transparent 0,
  #000 var(--cui-scroll-fade-s, 0px),
  #000 calc(100% - var(--cui-scroll-fade-e, 0px)),
  transparent 100%
)`;

const inlineGradientRtl = `linear-gradient(
  to left,
  transparent 0,
  #000 var(--cui-scroll-fade-s, 0px),
  #000 calc(100% - var(--cui-scroll-fade-e, 0px)),
  transparent 100%
)`;

const maskPair = (inline: string) => `
  -webkit-mask-image: ${blockGradient}, ${inline};
  mask-image: ${blockGradient}, ${inline};
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-position: 0 0;
  mask-position: 0 0;
`;

export const SScrollArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  --cui-scroll-fade-t: 0px;
  --cui-scroll-fade-b: 0px;
  --cui-scroll-fade-s: 0px;
  --cui-scroll-fade-e: 0px;

  &[data-scrollbar-visible='true'][data-overflow-y='true']
    .${scrollAreaClasses.scrollbarY} {
    pointer-events: auto;
    opacity: 1;
    transform: none;
  }

  &[data-scrollbar-visible='true'][data-overflow-x='true']
    .${scrollAreaClasses.scrollbarX} {
    pointer-events: auto;
    opacity: 1;
    transform: none;
  }
`;

export const SScrollAreaFade = styled('div', {
  shouldForwardProp: (prop) => !fadeCustomProps.has(prop),
})<TSScrollAreaFadeProps>`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;

  ${({ fade }) =>
    fade
      ? `
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
          -webkit-mask-position: 0 0;
          mask-position: 0 0;

          &[data-overflow-y='true'][data-overflow-x='false'] {
            -webkit-mask-image: ${blockGradient};
            mask-image: ${blockGradient};
          }

          &[data-overflow-x='true'][data-overflow-y='false'] {
            -webkit-mask-image: ${inlineGradient};
            mask-image: ${inlineGradient};
          }

          &[data-overflow-y='true'][data-overflow-x='true'] {
            ${maskPair(inlineGradient)}
          }

          &:where([dir='rtl'], [dir='rtl'] *)[data-overflow-x='true'][data-overflow-y='false'] {
            -webkit-mask-image: ${inlineGradientRtl};
            mask-image: ${inlineGradientRtl};
          }

          &:where([dir='rtl'], [dir='rtl'] *)[data-overflow-y='true'][data-overflow-x='true'] {
            ${maskPair(inlineGradientRtl)}
          }
        `
      : `
          -webkit-mask-image: none;
          mask-image: none;
        `}
`;

export const SScrollAreaViewport = styled('div', {
  shouldForwardProp: (prop) => !viewportCustomProps.has(prop),
})<TSScrollAreaViewportProps>`
  box-sizing: border-box;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  width: 100%;
  height: 100%;
  overflow-x: ${({ axis }) => (axis === 'horizontal' ? 'auto' : 'hidden')};
  overflow-y: ${({ axis }) => (axis === 'vertical' ? 'auto' : 'hidden')};
  overscroll-behavior: contain;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
`;

export const SScrollAreaScrollbar = styled('div', {
  shouldForwardProp: (prop) => !scrollbarCustomProps.has(prop),
})<TSScrollAreaScrollbarProps>`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  ${({ axis, origin, theme }) => {
    const inset = theme.spacing(theme.gap.xs);
    const thickness = '6px';
    const hide = `calc(100% + ${inset})`;

    if (axis === 'y') {
      const fromRight = origin !== 'left';

      return `
        top: ${inset};
        bottom: ${inset};
        width: ${thickness};
        ${fromRight ? `right: ${inset};` : `left: ${inset};`}
        transform: translateX(${fromRight ? hide : `-${hide}`});
      `;
    }

    const fromBottom = origin !== 'top';

    return `
      left: ${inset};
      right: ${inset};
      height: ${thickness};
      ${fromBottom ? `bottom: ${inset};` : `top: ${inset};`}
      transform: translateY(${fromBottom ? hide : `-${hide}`});
    `;
  }}

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0.15s ease;
    transform: none;
  }
`;

export const SScrollAreaThumb = styled('div', {
  shouldForwardProp: (prop) => !thumbCustomProps.has(prop),
})<{ axis: 'y' | 'x' }>`
  position: absolute;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) =>
    colorMix(theme.surfaces.mixer, CHROME_FILL + 15)};
  cursor: grab;

  &:hover,
  &[data-dragging='true'] {
    background-color: ${({ theme }) =>
      colorMix(theme.surfaces.mixer, CHROME_HOVER + 20)};
  }

  &[data-dragging='true'] {
    cursor: grabbing;
  }

  ${({ axis }) =>
    axis === 'y'
      ? `
          left: 0;
          right: 0;
          height: var(--cui-scroll-thumb-y-size, 24px);
          transform: translateY(var(--cui-scroll-thumb-y-offset, 0px));
        `
      : `
          top: 0;
          bottom: 0;
          width: var(--cui-scroll-thumb-x-size, 24px);
          transform: translateX(var(--cui-scroll-thumb-x-offset, 0px));
        `}
`;
