import styled from '@emotion/styled';
import { CHROME_FILL } from '../../idle-variant-styles';
import { MOTION, reduceMotion } from '../../motion';
import { colorMix, colorMixBase } from '../../surface';
import { textClasses } from '../text/classes';
import { mediaViewerClasses } from './classes';
import {
  TSMediaViewerFitProps,
  TSMediaViewerPanProps,
  TSMediaViewerThumbProps,
  TSMediaViewerTrackProps,
} from './types';

export const SMediaViewerRoot = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  isolation: isolate;
  overflow: visible;
  pointer-events: none;
`;

export const SMediaViewerStage = styled.div`
  position: relative;
  z-index: 0;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  overflow: visible;
  pointer-events: none;
`;

export const SMediaViewerFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: min(92vw, 72rem);
  min-width: 0;
  min-height: 0;
  overflow: visible;
  pointer-events: none;
`;

export const SMediaViewerMedia = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  width: 100%;
  overflow: visible;
  pointer-events: none;
  touch-action: none;
  user-select: none;
`;

export const SMediaViewerPan = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'grabbing' && prop !== 'canPan' && prop !== 'animated',
})<TSMediaViewerPanProps>`
  position: relative;
  flex-shrink: 0;
  pointer-events: auto;
  touch-action: none;
  transform-origin: center center;
  cursor: ${({ canPan, grabbing }) =>
    grabbing ? 'grabbing' : canPan ? 'grab' : 'default'};
  transition: ${({ animated }) =>
    animated
      ? [
          `transform ${MOTION.duration} ${MOTION.easing}`,
          `width ${MOTION.duration} ${MOTION.easing}`,
          `height ${MOTION.duration} ${MOTION.easing}`,
        ].join(', ')
      : 'none'};
  will-change: transform, width, height;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const SMediaViewerReveal = styled.div`
  width: 100%;
  height: 100%;
  transform-origin: center center;
  animation: cui-media-viewer-reveal ${MOTION.duration} ${MOTION.easing} both;

  @keyframes cui-media-viewer-reveal {
    from {
      opacity: 0;
      transform: scale(0.92);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  ${reduceMotion}
`;

export const SMediaViewerTransform = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  pointer-events: none;
  transform-origin: center center;
  transition:
    transform ${MOTION.duration} ${MOTION.easing},
    width ${MOTION.duration} ${MOTION.easing},
    height ${MOTION.duration} ${MOTION.easing};
  will-change: transform, width, height;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const mediaFit = (ready: boolean) => `
  display: block;
  width: ${ready ? '100%' : 'auto'};
  height: ${ready ? '100%' : 'auto'};
  max-width: ${ready ? 'none' : '100%'};
  max-height: ${ready ? 'none' : '100%'};
  object-fit: ${ready ? 'fill' : 'contain'};
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
`;

export const SMediaViewerImage = styled('img', {
  shouldForwardProp: (prop) => prop !== 'ready',
})<TSMediaViewerFitProps>`
  ${({ ready }) => mediaFit(ready)}
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 18px 48px
    ${({ theme }) => colorMix(theme.surfaces.mixer, 28)};
`;

export const SMediaViewerVideo = styled('video', {
  shouldForwardProp: (prop) => prop !== 'ready',
})<TSMediaViewerFitProps>`
  ${({ ready }) => mediaFit(ready)}
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) =>
    colorMixBase(theme.surfaces.mixer, CHROME_FILL, theme.surfaces.background)};
  box-shadow: 0 18px 48px
    ${({ theme }) => colorMix(theme.surfaces.mixer, 28)};
`;

export const SMediaViewerCaption = styled.div`
  flex-shrink: 0;
  max-width: 100%;
  color: ${({ theme }) => theme.surfaces.backdropText};
  text-align: center;

  .${textClasses.root} {
    color: inherit;
  }
`;

export const SMediaViewerChrome = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(theme.gap.md)};
  padding-top: ${({ theme }) => theme.spacing(theme.gap.md)};
  pointer-events: auto;

  .${mediaViewerClasses.dock} {
    max-width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const SMediaViewerGallery = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  height: 4.5rem;
  overflow: hidden;
`;

export const SMediaViewerTrack = styled('div', {
  shouldForwardProp: (prop) => prop !== 'offset' && prop !== 'ready',
})<TSMediaViewerTrackProps>`
  display: flex;
  align-items: center;
  width: max-content;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  transform: translateX(${({ offset }) => offset}px);
  opacity: ${({ ready }) => (ready ? 1 : 0)};
  transition: ${({ ready }) =>
    ready ? 'transform 0.28s ease, opacity 0.12s ease' : 'none'};
`;

export const SMediaViewerThumb = styled('button', {
  shouldForwardProp: (prop) => prop !== 'selected',
})<TSMediaViewerThumbProps>`
  position: relative;
  display: block;
  flex-shrink: 0;
  height: ${({ selected }) => (selected ? '4.5rem' : '3rem')};
  width: auto;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: none;
  cursor: pointer;
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
  transition:
    opacity 0.12s ease,
    height 0.12s ease;

  img,
  video {
    display: block;
    height: 100%;
    width: auto;
    max-width: none;
    object-fit: contain;
    pointer-events: none;
    background: ${({ theme }) =>
      colorMixBase(
        theme.surfaces.mixer,
        CHROME_FILL,
        theme.surfaces.background,
      )};
  }

  &:hover {
    opacity: 1;
  }
`;

export const SMediaViewerThumbPlay = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.surfaces.ink};
  pointer-events: none;

  svg {
    width: 1.1em;
    height: 1.1em;
    filter: drop-shadow(0 1px 4px ${colorMix('#000000', 45)});
  }
`;
