import styled from '@emotion/styled';
import { TAlertSize, TSAlertBaseProps } from './types';

const customProps = new Set(['color', 'variant', 'size', 'closable']);

const sizeFont: Record<TAlertSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const SAlertBase = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAlertBaseProps>`
  position: relative;
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.medium};
  box-shadow: ${({ theme }) => {
    const black = theme.colors.common.black;

    return `
      0 4px 10px ${black}0a,
      0 1px 4px ${black}08,
      0 1px 2px ${black}05
    `;
  }};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};

  ${({ theme, size, closable }) => {
    const scale = theme.sizeScale[size];
    const padY = `calc(${theme.spacing(theme.gap.sm)} * ${scale})`;
    const padX = `calc(${theme.spacing(theme.gap.md)} * ${scale})`;
    const gap = `calc(${theme.spacing(theme.gap.sm)} * ${scale})`;
    const closePad = closable
      ? `calc(${theme.spacing(theme.gap.xl)} * ${scale})`
      : padX;

    return `
      gap: ${gap};
      padding: ${padY} ${closePad} ${padY} ${padX};
      font-size: ${sizeFont[size]};
      --alert-gap: ${gap};
      --alert-icon-size: ${size === 'sm' ? '1em' : size === 'lg' ? '1.35em' : '1.25em'};
    `;
  }}

  ${({ theme, variant, color }) => {
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
          background-color: color-mix(in srgb, ${palette.lighter} 88%, transparent);
          color: ${palette.darker};
          border-color: color-mix(in srgb, ${palette.main} 24%, transparent);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
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
          color: ${palette.main};
          border-color: transparent;
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
          background-color: color-mix(in srgb, ${palette.lighter} 92%, transparent);
          color: ${palette.darker};
          border-color: transparent;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        `;
    }
  }}
`;

export const SAlertBody = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  min-width: 0;
`;
