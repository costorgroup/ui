import styled from '@emotion/styled';
import { colorMix } from '../../surface';
import { textClasses } from '../text/classes';
import {
  TSMediaViewerNavProps,
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
`;

export const SMediaViewerStage = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
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
  padding: 0 4.5rem;
  overflow: hidden;
`;

export const SMediaViewerMedia = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  max-width: 100%;
`;

const mediaFit = `
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const SMediaViewerImage = styled.img`
  ${mediaFit}
  border-radius: ${({ theme }) => theme.radius.medium};
  box-shadow: 0 18px 48px
    ${({ theme }) => colorMix(theme.colors.base.contrastText, 28)};
`;

export const SMediaViewerVideo = styled.video`
  ${mediaFit}
  border-radius: ${({ theme }) => theme.radius.medium};
  background: ${({ theme }) => colorMix(theme.colors.base.contrastText, 18)};
  box-shadow: 0 18px 48px
    ${({ theme }) => colorMix(theme.colors.base.contrastText, 28)};
`;

export const SMediaViewerClose = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing(theme.gap.md)};
  right: ${({ theme }) => theme.spacing(theme.gap.md)};
  z-index: 1;
`;

export const SMediaViewerNav = styled('div', {
  shouldForwardProp: (prop) => prop !== 'side',
})<TSMediaViewerNavProps>`
  position: absolute;
  top: 50%;
  ${({ side, theme }) =>
    side === 'start'
      ? `left: ${theme.spacing(theme.gap.md)};`
      : `right: ${theme.spacing(theme.gap.md)};`}
  z-index: 1;
  transform: translateY(-50%);
`;

export const SMediaViewerCaption = styled.div`
  flex-shrink: 0;
  margin-top: ${({ theme }) => theme.spacing(theme.gap.sm)};
  max-width: 100%;
  color: ${({ theme }) => theme.colors.base.main};
  text-align: center;

  .${textClasses.root} {
    color: inherit;
  }
`;

export const SMediaViewerGallery = styled.div`
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  margin-top: ${({ theme }) => theme.spacing(theme.gap.md)};
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
  height: 4.5rem;
  width: auto;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 2px solid
    ${({ theme, selected }) =>
      selected ? theme.colors.base.main : 'transparent'};
  border-radius: ${({ theme }) => theme.radius.small};
  background: none;
  cursor: pointer;
  opacity: ${({ selected }) => (selected ? 1 : 0.55)};
  transition:
    opacity 0.12s ease,
    border-color 0.12s ease;

  img,
  video {
    display: block;
    height: 4.5rem;
    width: auto;
    max-width: none;
    object-fit: contain;
    pointer-events: none;
    background: ${({ theme }) => colorMix(theme.colors.base.contrastText, 18)};
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
  color: ${({ theme }) => theme.colors.base.main};
  pointer-events: none;

  svg {
    width: 1.1em;
    height: 1.1em;
    filter: drop-shadow(0 1px 4px ${colorMix('#000000', 45)});
  }
`;
