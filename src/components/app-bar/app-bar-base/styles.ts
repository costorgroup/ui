import styled from '@emotion/styled';
import { TAppBarSize, TSAppBarBaseProps } from './types';

const customProps = new Set(['color', 'variant', 'size', 'position']);

const sizeFont: Record<TAppBarSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

const sizeLogoHeight: Record<TAppBarSize, string> = {
  xs: '1.25rem',
  sm: '1.5rem',
  md: '2rem',
  lg: '2.5rem',
  xl: '3rem',
};

export const SAppBarBase = styled('header', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAppBarBaseProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid transparent;
  font-family: inherit;
  font-size: ${({ size }) => sizeFont[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  z-index: ${({ theme, position }) =>
    position === 'static' ? 'auto' : theme.zIndex.appBar};
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;

  ${({ theme, size }) => {
    const scale = theme.sizeScale[size];

    return `
      gap: calc(${theme.spacing(theme.gap.md)} * ${scale});
      padding: calc(${theme.spacing(theme.gap.sm)} * ${scale})
        calc(${theme.spacing(theme.gap.lg)} * ${scale});
      --app-bar-gap: calc(${theme.spacing(theme.gap.md)} * ${scale});
      --app-bar-logo-height: ${sizeLogoHeight[size]};
    `;
  }}

  ${({ position }) => {
    switch (position) {
      case 'fixed':
        return `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
        `;
      case 'sticky':
        return `
          position: sticky;
          top: 0;
        `;
      case 'static':
      default:
        return `
          position: relative;
        `;
    }
  }}

  ${({ theme, variant, color, position }) => {
    const palette = theme.colors[color];
    const black = theme.colors.common.black;
    const elevated =
      position !== 'static'
        ? `
      box-shadow:
        0 4px 10px ${black}0a,
        0 1px 4px ${black}08,
        0 1px 2px ${black}05;
    `
        : '';

    switch (variant) {
      case 'solid':
        return `
          background-color: ${palette.main};
          color: ${palette.contrastText};
          border-color: ${palette.main};
          ${elevated}
        `;
      case 'surface':
        return `
          background-color: color-mix(in srgb, ${palette.lighter} 88%, transparent);
          color: ${palette.darker};
          border-color: color-mix(in srgb, ${palette.main} 24%, transparent);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          ${elevated}
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${palette.main};
          border-color: ${palette.main};
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${palette.darker};
          border-color: transparent;
        `;
      case 'plain':
        return `
          background-color: transparent;
          color: ${palette.darker};
          border-color: transparent;
        `;
      case 'subtle':
      default:
        return `
          background-color: color-mix(in srgb, ${palette.main} 8%, transparent);
          color: ${palette.darker};
          border-color: transparent;
          ${elevated}
        `;
    }
  }}
`;
