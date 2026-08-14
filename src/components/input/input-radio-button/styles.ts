import styled from '@emotion/styled';
import { TInputSize } from '../input-wrapper/types';
import { TInputRadioButtonProps } from './types';

type TSInputRadioButtonProps = Pick<
  TInputRadioButtonProps,
  'variant' | 'size' | 'color'
>;

const customProps = new Set(['variant', 'size', 'color']);

const sizeMap: Record<TInputSize, { box: string; dot: string }> = {
  xs: { box: '12px', dot: '5px' },
  sm: { box: '14px', dot: '6px' },
  md: { box: '16px', dot: '6px' },
  lg: { box: '20px', dot: '8px' },
  xl: { box: '24px', dot: '10px' },
};

export const SInputRadioButton = styled.span`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
`;

export const SInputRadioButtonInput = styled.input`
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

export const SInputRadioButtonDot = styled.span`
  border-radius: ${({ theme }) => theme.radius.circle};
  background-color: currentColor;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.15s ease, transform 0.15s ease;
`;

export const SInputRadioButtonControl = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputRadioButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: ${({ size = 'md' }) => sizeMap[size].box};
  height: ${({ size = 'md' }) => sizeMap[size].box};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.circle};
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  ${SInputRadioButtonDot} {
    width: ${({ size = 'md' }) => sizeMap[size].dot};
    height: ${({ size = 'md' }) => sizeMap[size].dot};
  }

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

  ${SInputRadioButtonInput}:hover:not(:disabled) + & {
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

  ${SInputRadioButtonInput}:checked + & {
    ${({ theme, color = 'primary' }) => {
      const palette = theme.colors[color];

      return `
        background-color: ${palette.main};
        border-color: ${palette.main};
        color: ${palette.contrastText};
      `;
    }}
  }

  ${SInputRadioButtonInput}:checked:hover:not(:disabled) + & {
    ${({ theme, color = 'primary' }) => {
      const palette = theme.colors[color];

      return `
        background-color: ${palette.dark};
        border-color: ${palette.dark};
        color: ${palette.contrastText};
      `;
    }}
  }

  ${SInputRadioButtonInput}:checked + & ${SInputRadioButtonDot} {
    opacity: 1;
    transform: scale(1);
  }

  ${SInputRadioButtonInput}:focus-visible + & {
    outline: 2px solid ${({ theme, color = 'primary' }) => theme.colors[color].main};
    outline-offset: 2px;
  }

  ${SInputRadioButtonInput}:disabled + & {
    opacity: 0.5;
  }
`;
