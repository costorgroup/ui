import styled from '@emotion/styled';
import { variantStyles } from '../button/variant-styles';
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
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.2;
  cursor: pointer;
  transition:
    background-color 0.12s ease,
    border-color 0.12s ease,
    color 0.12s ease,
    opacity 0.12s ease;

  ${({ theme, variant = 'solid', color = 'primary' }) =>
    variantStyles(variant, theme.colors[color], theme)}

  ${({ theme, size = 'md' }) => {
    const scale = sizeScale[size];
    const pad = `calc(${theme.spacing(theme.gap.xs)} * ${scale})`;

    return `
      padding: ${pad};
      font-size: ${sizeFont[size]};
    `;
  }}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme, color = 'primary' }) => theme.colors[color].main};
    outline-offset: 2px;
  }
`;
