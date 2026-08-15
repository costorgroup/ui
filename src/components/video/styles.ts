import styled from '@emotion/styled';
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
  background-color: ${({ theme }) => theme.colors.common.black};
  color: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  user-select: none;

  &[data-idle='true'] {
    cursor: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme, color }) => theme.colors[color].main};
    outline-offset: 2px;
  }

  .${videoClasses.media} {
    display: block;
    width: 100%;
    height: ${({ height }) => (height == null ? 'auto' : '100%')};
    object-fit: contain;
    background-color: ${({ theme }) => theme.colors.common.black};
  }

  .${videoClasses.overlay} {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => `${theme.colors.common.black}40`};
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &[data-paused='true'] .${videoClasses.overlay} {
    opacity: 1;
  }

  .${videoClasses.controls} {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
    padding: ${({ theme }) =>
      `${theme.spacing(theme.gap.md)} ${theme.spacing(theme.gap.md)} ${theme.spacing(theme.gap.sm)}`};
    background: linear-gradient(
      to top,
      ${({ theme }) => `${theme.colors.common.black}cc`} 0%,
      ${({ theme }) => `${theme.colors.common.black}00`} 100%
    );
    opacity: 1;
    pointer-events: auto;
    transition: opacity 0.2s ease;
  }

  &[data-idle='true'] .${videoClasses.controls} {
    opacity: 0;
    pointer-events: none;
  }

  .${videoClasses.progress},
  .${videoClasses.volumeTrack} {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    height: 4px;
    padding: 0;
    border: 0;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => `${theme.colors.common.white}33`};
    cursor: pointer;
    appearance: none;
    transition: height 0.12s ease;
  }

  .${videoClasses.progress}:hover,
  .${videoClasses.volumeTrack}:hover {
    height: 6px;
  }

  .${videoClasses.played},
  .${videoClasses.volumeFill} {
    display: block;
    height: 100%;
    border-radius: inherit;
    background-color: ${({ theme, color }) => theme.colors[color].main};
    pointer-events: none;
  }

  .${videoClasses.bar} {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  }

  .${videoClasses.bar} > :last-child {
    margin-left: auto;
  }

  .${videoClasses.time} {
    margin: 0 ${({ theme }) => theme.spacing(theme.gap.xs)};
    font-variant-numeric: tabular-nums;
    font-size: ${({ theme }) => theme.typography.text.small};
    line-height: 1;
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.common.white};
    opacity: 0.92;
  }

  .${videoClasses.volume} {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
    min-width: 0;
  }

  .${videoClasses.volumeTrack} {
    width: 4.5rem;
    flex-shrink: 0;
  }
`;
