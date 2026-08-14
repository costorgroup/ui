import styled from '@emotion/styled';
import { TIconButtonProps, TIconButtonSize } from './types';

type TSIconButtonProps = Pick<TIconButtonProps, 'variant' | 'size' | 'color' | 'rounded'>;

const customProps = new Set(['variant', 'size', 'color', 'rounded']);

const sizeFont: Record<TIconButtonSize, number> = {
  xs: 12,
  sm: 13,
  md: 14,
  lg: 16,
  xl: 20,
};

const sizePadding: Record<TIconButtonSize, number> = {
  xs: 0.5,
  sm: 1,
  md: 1.5,
  lg: 2,
  xl: 2.5,
};

const sizeIcon: Record<TIconButtonSize, string> = {
  xs: '1em',
  sm: '1.1em',
  md: '1.2em',
  lg: '1.25em',
  xl: '1.35em',
};

export const SIconButton = styled('button', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSIconButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid;
  border-radius: ${({ theme, rounded = false }) =>
    rounded ? theme.radius.pill : theme.radius.medium};
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;
  pointer-events: auto;
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
    const pad = theme.spacing(sizePadding[size]);
    const icon = sizeIcon[size];

    return `
      padding: ${pad};
      font-size: ${sizeFont[size]}px;
      line-height: 1;

      & svg {
        width: ${icon};
        height: ${icon};
      }
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
