import styled from '@emotion/styled';
import { TInputSize } from '../input-wrapper/types';
import { TSInputPinFieldCellProps, TSInputPinFieldProps } from './types';

const rootCustomProps = new Set(['attached', 'size']);
const cellCustomProps = new Set(['variant', 'size', 'color', 'attached']);

const sizeFont: Record<TInputSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

const sizeCell: Record<TInputSize, string> = {
  xs: '28px',
  sm: '32px',
  md: '40px',
  lg: '48px',
  xl: '56px',
};

export const SInputPinField = styled('div', {
  shouldForwardProp: (prop) => !rootCustomProps.has(prop),
})<TSInputPinFieldProps>`
  display: inline-flex;
  align-items: stretch;
  max-width: 100%;
  box-sizing: border-box;
  gap: ${({ theme, attached, size = 'md' }) =>
    attached ? 0 : `calc(${theme.spacing(theme.gap.sm)} * ${theme.sizeScale[size]})`};
`;

export const SInputPinFieldCell = styled('div', {
  shouldForwardProp: (prop) => !cellCustomProps.has(prop),
})<TSInputPinFieldCellProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: ${({ size = 'md' }) => sizeCell[size]};
  height: ${({ size = 'md' }) => sizeCell[size]};
  min-width: ${({ size = 'md' }) => sizeCell[size]};
  border: 1px solid;
  font-family: inherit;
  font-size: ${({ size = 'md' }) => sizeFont[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: 1;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  ${({ theme, attached }) => {
    if (!attached) {
      return `border-radius: ${theme.radius.medium};`;
    }

    const radius = theme.radius.medium;

    return `
      border-radius: 0;
      margin-left: -1px;

      &:first-of-type {
        margin-left: 0;
        border-top-left-radius: ${radius};
        border-bottom-left-radius: ${radius};
      }

      &:last-of-type {
        border-top-right-radius: ${radius};
        border-bottom-right-radius: ${radius};
      }
    `;
  }}

  ${({ theme, variant = 'subtle', color = 'primary' }) => {
    const palette = theme.colors[color];

    switch (variant) {
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
            ${palette.main} 14%,
            transparent
          );

          &:hover {
            background-color: color-mix(
              in srgb,
              ${palette.main} 10%,
              transparent
            );
            border-color: color-mix(
              in srgb,
              ${palette.main} 20%,
              transparent
            );
          }

          &:focus-within {
            z-index: 1;
            background-color: color-mix(
              in srgb,
              ${palette.main} 10%,
              transparent
            );
            border-color: color-mix(
              in srgb,
              ${palette.main} 28%,
              transparent
            );
          }
        `;
      case 'subtle':
        return `
          background-color: color-mix(
            in srgb,
            ${palette.main} 4%,
            transparent
          );
          color: ${palette.darker};
          border-color: transparent;

          &:hover {
            background-color: color-mix(
              in srgb,
              ${palette.main} 8%,
              transparent
            );
          }

          &:focus-within {
            z-index: 1;
            background-color: color-mix(
              in srgb,
              ${palette.main} 10%,
              transparent
            );
          }
        `;
      case 'outline':
      default:
        return `
          background-color: transparent;
          color: ${palette.main};
          border-color: color-mix(
            in srgb,
            ${palette.main} 36%,
            transparent
          );

          &:hover {
            background-color: color-mix(
              in srgb,
              ${palette.main} 4%,
              transparent
            );
            border-color: color-mix(
              in srgb,
              ${palette.main} 52%,
              transparent
            );
            color: ${palette.dark};
          }

          &:focus-within {
            z-index: 1;
            background-color: color-mix(
              in srgb,
              ${palette.main} 4%,
              transparent
            );
            border-color: color-mix(
              in srgb,
              ${palette.main} 68%,
              transparent
            );
            color: ${palette.darker};
          }
        `;
    }
  }}

  &[data-disabled='true'] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const SInputPinFieldInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
  font: inherit;
  color: inherit;
  text-align: center;
  caret-color: currentColor;

  &::placeholder {
    color: currentColor;
    opacity: 0.45;
  }

  &:focus::placeholder {
    opacity: 0;
    color: transparent;
  }

  &[data-mask='true'] {
    -webkit-text-security: disc;
    text-security: disc;
  }
`;
