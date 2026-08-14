import styled from '@emotion/styled';
import { TButtonProps, TButtonSize } from './types';

type TSButtonProps = Pick<TButtonProps, 'variant' | 'size' | 'color'>;

const customProps = new Set(['variant', 'size', 'color']);

const sizeFont: Record<TButtonSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const SButton = styled('button', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme, size = 'md' }) =>
    `calc(${theme.spacing(theme.gap.sm)} * ${theme.sizeScale[size]})`};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.medium};
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

  ${({ variant = 'solid' }) =>
    variant === 'solid'
      ? ''
      : `
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        `}

  ${({ theme, size = 'md' }) => {
    const scale = theme.sizeScale[size];
    const padY = `calc(${theme.spacing(theme.gap.sm)} * ${scale})`;
    const padX = `calc(${theme.spacing(theme.gap.md)} * ${scale})`;

    return `
      padding: ${padY} ${padX};
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
