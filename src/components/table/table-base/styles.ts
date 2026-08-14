import styled from '@emotion/styled';
import { TTableSize } from './context';
import { TSTableBaseProps } from './types';

const customProps = new Set(['size', 'color']);

const sizeFont: Record<TTableSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const STableBase = styled('table', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSTableBaseProps>`
  box-sizing: border-box;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-family: inherit;
  font-size: ${({ size }) => sizeFont[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  color: var(--table-fg, ${({ theme }) => theme.colors.default.darker});
  text-align: left;

  ${({ theme, size, color }) => {
    const scale = theme.sizeScale[size];
    const padY = `calc(${theme.spacing(theme.gap.sm)} * ${scale})`;
    const padX = `calc(${theme.spacing(theme.gap.md)} * ${scale})`;
    const palette = theme.colors[color];

    return `
      --table-pad-y: ${padY};
      --table-pad-x: ${padX};
      --table-border: color-mix(in srgb, ${palette.main} 18%, transparent);
      --table-head-bg: color-mix(in srgb, ${palette.main} 8%, transparent);
      --table-row-hover: color-mix(in srgb, ${palette.main} 8%, transparent);
      --table-accent: ${palette.main};
    `;
  }}
`;
