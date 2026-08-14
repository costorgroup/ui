import styled from '@emotion/styled';
import { TInputSize } from '../input-wrapper/types';
import { TInputCheckBoxProps } from './types';

type TSInputCheckBoxProps = Pick<TInputCheckBoxProps, 'variant' | 'size' | 'color'>;

const customProps = new Set(['variant', 'size', 'color']);

const sizeMap: Record<TInputSize, { box: string; icon: string }> = {
  xs: { box: '12px', icon: '8px' },
  sm: { box: '14px', icon: '10px' },
  md: { box: '16px', icon: '12px' },
  lg: { box: '20px', icon: '14px' },
  xl: { box: '24px', icon: '16px' },
};

export const SInputCheckBox = styled.span`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
`;

export const SInputCheckBoxInput = styled.input`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const SInputCheckBoxControl = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputCheckBoxProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: ${({ size = 'md' }) => sizeMap[size].box};
  height: ${({ size = 'md' }) => sizeMap[size].box};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.small};
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;

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

  ${SInputCheckBoxInput}:hover:not(:disabled) + & {
    ${({ theme, variant = 'subtle', color = 'primary' }) => {
      const palette = theme.colors[color];

      switch (variant) {
        case 'surface':
          return `
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
          `;
        case 'outline':
          return `
            background-color: color-mix(
              in srgb,
              ${palette.main} 8%,
              transparent
            );
            border-color: ${palette.dark};
            color: ${palette.dark};
          `;
        case 'subtle':
        default:
          return `
            background-color: color-mix(
              in srgb,
              ${palette.main} 14%,
              transparent
            );
          `;
      }
    }}
  }

  ${SInputCheckBoxInput}:checked + & {
    ${({ theme, color = 'primary' }) => {
      const palette = theme.colors[color];

      return `
        background-color: ${palette.main};
        border-color: ${palette.main};
        color: ${palette.contrastText};
      `;
    }}
  }

  ${SInputCheckBoxInput}:checked:hover:not(:disabled) + & {
    ${({ theme, color = 'primary' }) => {
      const palette = theme.colors[color];

      return `
        background-color: ${palette.dark};
        border-color: ${palette.dark};
        color: ${palette.contrastText};
      `;
    }}
  }

  ${SInputCheckBoxInput}:checked + & svg {
    opacity: 1;
    transform: scale(1);
  }

  ${SInputCheckBoxInput}:focus-visible + & {
    outline: 2px solid ${({ theme, color = 'primary' }) => theme.colors[color].main};
    outline-offset: 2px;
  }

  ${SInputCheckBoxInput}:disabled + & {
    opacity: 0.5;
  }

  svg {
    width: ${({ size = 'md' }) => sizeMap[size].icon};
    height: ${({ size = 'md' }) => sizeMap[size].icon};
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.15s ease, transform 0.15s ease;
  }
`;
