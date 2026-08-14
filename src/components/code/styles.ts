import styled from '@emotion/styled';
import { TCodeOwnProps, TCodeSize } from './types';

type TSCodeProps = Pick<TCodeOwnProps, 'variant' | 'size' | 'color'>;

const customProps = new Set(['variant', 'size', 'color']);

const sizeFont: Record<TCodeSize, string> = {
  xs: '11px',
  sm: '12px',
  md: '13px',
  lg: '14px',
  xl: '15px',
};

const sizePadX: Record<TCodeSize, string> = {
  xs: '0.25rem',
  sm: '0.3rem',
  md: '0.35rem',
  lg: '0.4rem',
  xl: '0.45rem',
};

const sizePadY: Record<TCodeSize, string> = {
  xs: '0.05rem',
  sm: '0.1rem',
  md: '0.125rem',
  lg: '0.15rem',
  xl: '0.175rem',
};

export const SCode = styled('code', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSCodeProps>`
  display: inline;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.small};
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas,
    'Liberation Mono', monospace;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: 1.4;
  white-space: break-spaces;
  vertical-align: baseline;

  ${({ size = 'sm' }) => `
    padding: ${sizePadY[size]} ${sizePadX[size]};
    font-size: ${sizeFont[size]};
  `}

  ${({ theme, variant = 'subtle', color = 'default' }) => {
    const palette = theme.colors[color];

    switch (variant) {
      case 'solid':
        return `
          background-color: ${palette.main};
          color: ${palette.contrastText};
          border-color: ${palette.main};
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
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${palette.main};
          border-color: ${palette.main};
        `;
      case 'plain':
        return `
          background-color: transparent;
          color: ${palette.main};
          border-color: transparent;
        `;
      case 'subtle':
      default:
        return `
          background-color: color-mix(
            in srgb,
            ${palette.main} 8%,
            transparent
          );
          color: ${palette.darker};
          border-color: transparent;
        `;
    }
  }}
`;
