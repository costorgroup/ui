import styled from '@emotion/styled';
import { TInputSize } from '../input-wrapper/types';
import {
  TInputRangeFieldProps,
  TRangeDirection,
  TRangeValuePosition,
} from './types';

type TSRootProps = Pick<
  TInputRangeFieldProps,
  'variant' | 'size' | 'color' | 'direction' | 'track'
>;

type TSDirProps = {
  direction?: TRangeDirection;
};

type TSValueLabelProps = {
  visible?: boolean;
  position?: TRangeValuePosition;
};

const rootProps = new Set(['variant', 'size', 'color', 'direction', 'track']);
const dirProps = new Set(['direction']);
const valueLabelProps = new Set(['visible', 'position']);

export const RANGE_VERTICAL_SIZE = 180;
export const RANGE_THUMB_SLOP = 4;

export const rangeSizeMap: Record<
  TInputSize,
  { track: number; thumb: number; pad: number }
> = {
  xs: { track: 2, thumb: 12, pad: 8 },
  sm: { track: 3, thumb: 14, pad: 10 },
  md: { track: 4, thumb: 20, pad: 13 },
  lg: { track: 6, thumb: 22, pad: 14 },
  xl: { track: 8, thumb: 24, pad: 16 },
};

const valueLabelOffset = (position: TRangeValuePosition) => {
  switch (position) {
    case 'bottom':
      return `
        top: calc(100% + 6px);
        left: 50%;
        transform: translateX(-50%);
      `;
    case 'left':
      return `
        right: calc(100% + 6px);
        top: 50%;
        transform: translateY(-50%);
      `;
    case 'right':
      return `
        left: calc(100% + 6px);
        top: 50%;
        transform: translateY(-50%);
      `;
    case 'top':
    default:
      return `
        bottom: calc(100% + 6px);
        left: 50%;
        transform: translateX(-50%);
      `;
  }
};

export const SInputRangeField = styled('span', {
  shouldForwardProp: (prop) => !rootProps.has(prop),
})<TSRootProps>`
  --range-thumb-size: 20px;
  position: relative;
  display: inline-block;
  box-sizing: content-box;
  overflow: visible;
  touch-action: none;
  user-select: none;
  cursor: pointer;
  color: ${({ theme, color = 'primary' }) => theme.colors[color].main};
  border-radius: ${({ theme }) => theme.radius.pill};

  ${({
    theme,
    size = 'md',
    variant = 'subtle',
    color = 'primary',
    direction = 'horizontal',
  }) => {
    const palette = theme.colors[color];
    const { track: trackSize, thumb, pad } = rangeSizeMap[size];
    const rail = `color-mix(in srgb, ${palette.main} 38%, transparent)`;
    const fill = palette.main;
    const thumbBg =
      variant === 'outline' ? theme.colors.common.white : palette.main;
    const thumbBorder = variant === 'outline' ? palette.main : 'transparent';

    return `
      --range-thumb-size: ${thumb}px;
      --range-rail: ${rail};
      --range-fill: ${fill};
      --range-thumb: ${thumbBg};
      --range-thumb-border: ${thumbBorder};
      --range-halo: color-mix(in srgb, ${palette.main} 16%, transparent);
      --range-value-bg: ${palette.main};
      --range-value-fg: ${palette.contrastText};

      ${
        direction === 'vertical'
          ? `
            width: ${trackSize}px;
            height: ${RANGE_VERTICAL_SIZE}px;
            padding: 0 ${pad}px;
          `
          : `
            width: 100%;
            height: ${trackSize}px;
            padding: ${pad}px 0;
          `
      }

      &:has(input:disabled) {
        opacity: 0.38;
        pointer-events: none;
        cursor: default;
      }

      &:has(input:focus-visible) [data-range-thumb]::before {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }

      ${
        direction === 'vertical'
          ? `
            & input {
              writing-mode: vertical-lr;
              direction: rtl;
            }
          `
          : ''
      }
    `;
  }}
`;

export const SInputRangeFieldRail = styled('span', {
  shouldForwardProp: (prop) => !dirProps.has(prop),
})<TSDirProps>`
  display: block;
  position: absolute;
  border-radius: inherit;
  background-color: var(--range-rail);
  pointer-events: none;
  ${({ direction = 'horizontal' }) =>
    direction === 'vertical'
      ? `
        height: 100%;
        width: inherit;
        left: 50%;
        transform: translateX(-50%);
      `
      : `
        width: 100%;
        height: inherit;
        top: 50%;
        transform: translateY(-50%);
      `}
`;

export const SInputRangeFieldTrack = styled('span', {
  shouldForwardProp: (prop) => !dirProps.has(prop),
})<TSDirProps>`
  display: block;
  position: absolute;
  border-radius: inherit;
  background-color: var(--range-fill);
  border: 1px solid var(--range-fill);
  box-sizing: content-box;
  pointer-events: none;
  ${({ direction = 'horizontal' }) =>
    direction === 'vertical'
      ? `
        width: inherit;
        left: 50%;
        transform: translateX(-50%);
      `
      : `
        height: inherit;
        top: 50%;
        transform: translateY(-50%);
      `}
`;

export const SInputRangeFieldThumb = styled('span', {
  shouldForwardProp: (prop) => !dirProps.has(prop),
})<TSDirProps>`
  position: absolute;
  z-index: 1;
  box-sizing: border-box;
  width: var(--range-thumb-size);
  height: var(--range-thumb-size);
  border: 1px solid var(--range-thumb-border);
  border-radius: ${({ theme }) => theme.radius.circle};
  background-color: var(--range-thumb);
  ${({ direction = 'horizontal' }) =>
    direction === 'vertical'
      ? `
        left: 50%;
        transform: translate(-50%, 50%);
      `
      : `
        top: 50%;
        transform: translate(-50%, -50%);
      `}

  &::before {
    position: absolute;
    content: '';
    width: calc(var(--range-thumb-size) + 16px);
    height: calc(var(--range-thumb-size) + 16px);
    top: 50%;
    left: 50%;
    border-radius: inherit;
    background-color: var(--range-halo);
    transform: translate(-50%, -50%) scale(0.4);
    opacity: 0;
    z-index: -1;
    pointer-events: none;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.12s linear;
  }

  &::after {
    position: absolute;
    content: '';
    width: 42px;
    height: 42px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }

  &:hover::before,
  &[data-active='true']::before {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

export const SInputRangeFieldInput = styled.input`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  appearance: none;
  background: transparent;
  opacity: 0;
  pointer-events: none;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: var(--range-thumb-size);
    height: var(--range-thumb-size);
    pointer-events: auto;
  }

  &::-moz-range-thumb {
    width: var(--range-thumb-size);
    height: var(--range-thumb-size);
    border: none;
    background: transparent;
    pointer-events: auto;
  }
`;

export const SInputRangeFieldTooltip = styled('span', {
  shouldForwardProp: (prop) => !valueLabelProps.has(prop),
})<TSValueLabelProps>`
  position: absolute;
  z-index: 2;
  pointer-events: none;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.12s ease;
  ${({ position = 'top' }) => valueLabelOffset(position)}
`;

export const SInputRangeFieldValue = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.radius.small};
  background-color: var(--range-value-bg);
  color: var(--range-value-fg);
  font-size: 12px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.2;
  white-space: nowrap;
`;
