import styled from '@emotion/styled';
import { CHROME_FILL } from '../../helpers/variant-styles';
import { colorMix, colorMixBase } from '../../helpers/variant-styles/surface';
import { videoClasses } from './classes';
import { TSVideoProps } from './types';

const customProps = new Set(['width', 'height', 'radius', 'color']);

const toCssSize = (value?: number | string) => {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'number' ? `${value}px` : value;
};

export const SVideo = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSVideoProps>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
  vertical-align: middle;
  box-sizing: border-box;
  width: ${({ width }) => toCssSize(width) ?? '100%'};
  height: ${({ height }) => toCssSize(height) ?? 'auto'};
  max-width: 100%;
  border-radius: ${({ theme, radius }) => theme.radius[radius]};
  background-color: ${({ theme }) => theme.surfaces.background};
  color: ${({ theme }) => theme.surfaces.ink};
  cursor: pointer;
  user-select: none;
  container-type: inline-size;
  container-name: cui-video;

  &[data-idle='true'] {
    cursor: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme, color }) =>
      color === 'default' ? theme.surfaces.ink : theme.palette[color].main};
    outline-offset: 2px;
  }

  .${videoClasses.media} {
    display: block;
    width: 100%;
    height: ${({ height }) => (height == null ? 'auto' : '100%')};
    object-fit: contain;
    background-color: ${({ theme }) => theme.surfaces.background};
  }

  .${videoClasses.overlay} {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &[data-paused='true'] .${videoClasses.overlay} {
    opacity: 1;
  }

  .${videoClasses.controls} {
    position: absolute;
    right: ${({ theme }) => theme.spacing(theme.gap.md)};
    bottom: ${({ theme }) => theme.spacing(theme.gap.md)};
    left: ${({ theme }) => theme.spacing(theme.gap.md)};
    z-index: 2;
    display: flex;
    justify-content: center;
    opacity: 1;
    pointer-events: auto;
    transition: opacity 0.2s ease;
  }

  &[data-idle='true'] .${videoClasses.controls} {
    opacity: 0;
    pointer-events: none;
  }

  .${videoClasses.dock} {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-wrap: nowrap;
  }

  .${videoClasses.progress},
  .${videoClasses.volumeTrack} {
    position: relative;
    display: block;
    box-sizing: content-box;
    height: 4px;
    /* Padding grows the pointer-event hit area for touch without widening
       the visible track — the color only paints the content box. */
    padding: ${({ theme }) => theme.spacing(theme.gap.xs)} 0;
    margin: -${({ theme }) => theme.spacing(theme.gap.xs)} 0;
    border: 0;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) =>
      colorMixBase(
        theme.surfaces.mixer,
        CHROME_FILL,
        theme.surfaces.background,
      )};
    background-clip: content-box;
    cursor: pointer;
    appearance: none;
    touch-action: none;
    transition: height 0.12s ease;
  }

  .${videoClasses.progress} {
    flex: 1 1 auto;
    min-width: 3rem;
  }

  .${videoClasses.progress}:hover,
  .${videoClasses.volumeTrack}:hover {
    height: 6px;
  }

  .${videoClasses.played},
  .${videoClasses.volumeFill} {
    display: block;
    height: 100%;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme, color }) =>
      color === 'default' ? theme.surfaces.ink : theme.palette[color].main};
    pointer-events: none;
  }

  .${videoClasses.time} {
    margin: 0;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .${videoClasses.volume} {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
    min-width: 0;
    flex-shrink: 0;
  }

  .${videoClasses.volumeTrack} {
    width: 4.5rem;
    flex-shrink: 0;
  }

  /* Below this the dock no longer has room for the drag-to-seek volume
     rail alongside every other control — drop it and lean on the mute
     toggle alone rather than letting the dock wrap onto a second line
     (which breaks its pill shape) or squeeze the seek bar to nothing. */
  @container cui-video (max-width: 26rem) {
    .${videoClasses.volumeTrack} {
      display: none;
    }
  }

  /* Too narrow for the timestamp alongside every control. */
  @container cui-video (max-width: 18rem) {
    .${videoClasses.time} {
      display: none;
    }
  }

  /* Bare minimum: play/pause, seek bar and fullscreen only. */
  @container cui-video (max-width: 12rem) {
    .${videoClasses.volume} {
      display: none;
    }

    .${videoClasses.dock} [role='separator'] {
      display: none;
    }
  }
`;
