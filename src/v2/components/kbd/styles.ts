import styled from '@emotion/styled';
import { staticChromeVariantStyles } from '../../idle-variant-styles';
import { TKbdOwnProps, TKbdSize } from './types';

type TSKbdProps = Pick<TKbdOwnProps, 'variant' | 'size' | 'color'>;

const customProps = new Set(['variant', 'size', 'color']);

const sizeFont: Record<TKbdSize, string> = {
  xs: '11px',
  sm: '12px',
  md: '13px',
  lg: '14px',
  xl: '15px',
};

const sizePadX: Record<TKbdSize, string> = {
  xs: '0.25rem',
  sm: '0.3rem',
  md: '0.35rem',
  lg: '0.4rem',
  xl: '0.45rem',
};

const sizePadY: Record<TKbdSize, string> = {
  xs: '0.05rem',
  sm: '0.1rem',
  md: '0.125rem',
  lg: '0.15rem',
  xl: '0.175rem',
};

export const SKbd = styled('kbd', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSKbdProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.small};
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas,
    'Liberation Mono', monospace;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.2;
  white-space: nowrap;
  vertical-align: middle;

  ${({ size = 'md' }) => `
    padding: ${sizePadY[size]} ${sizePadX[size]};
    font-size: ${sizeFont[size]};
    min-width: calc(${sizeFont[size]} + ${sizePadX[size]} * 2);
  `}

  ${({ theme, variant = 'raised', color = 'base' }) => {
    const palette = theme.colors[color];

    if (variant === 'raised') {
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
        box-shadow: inset 0 -2px 0 0 color-mix(
          in srgb,
          ${palette.main} 24%,
          transparent
        );
      `;
    }

    return `
      ${staticChromeVariantStyles(variant, palette, theme)}
      box-shadow: none;
    `;
  }}
`;
