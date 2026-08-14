import styled from '@emotion/styled';
import { TChipProps, TChipSize } from './types';

type TSChipProps = Pick<TChipProps, 'variant' | 'size' | 'color' | 'rounded'>;

const customProps = new Set(['variant', 'size', 'color', 'rounded']);

const sizeScale: Record<TChipSize, number> = {
  xs: 0.65,
  sm: 0.8,
  md: 1,
  lg: 1.2,
  xl: 1.4,
};

const sizeFont: Record<TChipSize, string> = {
  xs: '11px',
  sm: '12px',
  md: '13px',
  lg: '14px',
  xl: '15px',
};

export const SChip = styled('button', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSChipProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ size = 'md' }) => `calc(0.25rem * ${sizeScale[size]})`};
  border: 1px solid;
  border-radius: ${({ theme, rounded = false }) =>
    rounded ? theme.radius.pill : theme.radius.medium};
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;

  ${({ theme, variant = 'solid', color = 'primary' }) => {
    const palette = theme.colors[color];

    switch (variant) {
      case 'subtle':
        return `
          background-color: color-mix(
            in srgb,
            ${palette.main} 8%,
            transparent
          );
          color: ${palette.darker};
          border-color: transparent;

          &:hover:not(:disabled) {
            background-color: color-mix(
              in srgb,
              ${palette.main} 14%,
              transparent
            );
            color: ${palette.darker};
          }

          &:active:not(:disabled) {
            background-color: color-mix(
              in srgb,
              ${palette.main} 20%,
              transparent
            );
            color: ${palette.darker};
          }
        `;
      case 'surface':
        return `
          background-color: color-mix(
            in srgb,
            ${palette.main} 8%,
            transparent
          );
          color: ${palette.darker};
          border-color: color-mix(
            in srgb,
            ${palette.main} 24%,
            transparent
          );

          &:hover:not(:disabled) {
            background-color: color-mix(
              in srgb,
              ${palette.main} 14%,
              transparent
            );
            border-color: color-mix(
              in srgb,
              ${palette.main} 36%,
              transparent
            );
            color: ${palette.darker};
          }

          &:active:not(:disabled) {
            background-color: color-mix(
              in srgb,
              ${palette.main} 20%,
              transparent
            );
            border-color: color-mix(
              in srgb,
              ${palette.main} 48%,
              transparent
            );
            color: ${palette.darker};
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${palette.main};
          border-color: ${palette.main};

          &:hover:not(:disabled) {
            background-color: color-mix(
              in srgb,
              ${palette.main} 8%,
              transparent
            );
            border-color: ${palette.dark};
            color: ${palette.dark};
          }

          &:active:not(:disabled) {
            background-color: color-mix(
              in srgb,
              ${palette.main} 14%,
              transparent
            );
            border-color: ${palette.darker};
            color: ${palette.darker};
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${palette.main};
          border-color: transparent;

          &:hover:not(:disabled) {
            background-color: color-mix(
              in srgb,
              ${palette.main} 8%,
              transparent
            );
            color: ${palette.dark};
          }

          &:active:not(:disabled) {
            background-color: color-mix(
              in srgb,
              ${palette.main} 14%,
              transparent
            );
            color: ${palette.darker};
          }
        `;
      case 'plain':
        return `
          background-color: transparent;
          color: ${palette.main};
          border-color: transparent;

          &:hover:not(:disabled) {
            color: ${palette.dark};
          }

          &:active:not(:disabled) {
            color: ${palette.darker};
          }
        `;
      case 'solid':
      default:
        return `
          background-color: ${palette.main};
          color: ${palette.contrastText};
          border-color: ${palette.main};

          &:hover:not(:disabled) {
            background-color: ${palette.dark};
            border-color: ${palette.dark};
          }

          &:active:not(:disabled) {
            background-color: ${palette.darker};
            border-color: ${palette.darker};
          }
        `;
    }
  }}

  ${({ theme, size = 'md' }) => {
    const scale = sizeScale[size];
    const pad = `calc(${theme.spacing(theme.gap.xs)} * ${scale})`;

    return `
      padding: ${pad};
      font-size: ${sizeFont[size]};
    `;
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme, color = 'primary' }) => theme.colors[color].main};
    outline-offset: 2px;
  }
`;
