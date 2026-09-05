import styled from '@emotion/styled';
import { TInputSize } from '../input-wrapper/types';
import { inputSwitchClasses } from './classes';
import { TInputSwitchProps } from './types';

type TSInputSwitchProps = Pick<TInputSwitchProps, 'variant' | 'size' | 'color'>;

const customProps = new Set(['variant', 'size', 'color']);

const sizeMap: Record<TInputSize, { width: string; height: string; thumb: string }> = {
  xs: { width: '20px', height: '14px', thumb: '10px' },
  sm: { width: '24px', height: '16px', thumb: '12px' },
  md: { width: '28px', height: '18px', thumb: '14px' },
  lg: { width: '34px', height: '22px', thumb: '18px' },
  xl: { width: '40px', height: '26px', thumb: '22px' },
};

export const SInputSwitch = styled.span`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
`;

export const SInputSwitchInput = styled.input`
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

export const SInputSwitchThumb = styled.span`
  display: block;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.colors.common.white};
  box-shadow: inset 0 0 2px color-mix(in srgb, ${({ theme }) => theme.colors.common.black} 18%, transparent);
  transition: transform 0.15s ease;
`;

export const SInputSwitchControl = styled('span', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputSwitchProps>`
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  width: ${({ size = 'md' }) => sizeMap[size].width};
  height: ${({ size = 'md' }) => sizeMap[size].height};
  padding: 1px;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.pill};
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  ${({ theme, variant = 'subtle' }) => {
    const muted = theme.colors.default;

    switch (variant) {
      case 'surface':
        return `
          background-color: color-mix(
            in srgb,
            ${muted.main} 35%,
            transparent
          );
          color: ${muted.contrastText};
          border-color: color-mix(
            in srgb,
            ${muted.darker} 24%,
            transparent
          );
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${muted.dark};
          border-color: color-mix(
            in srgb,
            ${muted.darker} 55%,
            transparent
          );
        `;
      case 'subtle':
      default:
        return `
          background-color: color-mix(
            in srgb,
            ${muted.dark} 70%,
            transparent
          );
          color: ${muted.contrastText};
          border-color: transparent;
        `;
    }
  }}

  .${inputSwitchClasses.thumb} {
    width: ${({ size = 'md' }) => sizeMap[size].thumb};
    height: ${({ size = 'md' }) => sizeMap[size].thumb};
  }

  .${inputSwitchClasses.input}:hover:not(:disabled):not(:checked) + & {
    ${({ theme, variant = 'subtle' }) => {
      const muted = theme.colors.default;

      switch (variant) {
        case 'surface':
          return `
            background-color: color-mix(
              in srgb,
              ${muted.main} 45%,
              transparent
            );
            border-color: color-mix(
              in srgb,
              ${muted.darker} 36%,
              transparent
            );
          `;
        case 'outline':
          return `
            background-color: color-mix(
              in srgb,
              ${muted.main} 18%,
              transparent
            );
            border-color: color-mix(
              in srgb,
              ${muted.darker} 70%,
              transparent
            );
            color: ${muted.darker};
          `;
        case 'subtle':
        default:
          return `
            background-color: color-mix(
              in srgb,
              ${muted.main} 55%,
              transparent
            );
          `;
      }
    }}
  }

  .${inputSwitchClasses.input}:checked + & {
    ${({ theme, color = 'primary' }) => {
      const palette = theme.colors[color];

      return `
        background-color: ${palette.main};
        border-color: ${palette.main};
        color: ${palette.contrastText};
      `;
    }}
  }

  .${inputSwitchClasses.input}:checked:hover:not(:disabled) + & {
    ${({ theme, color = 'primary' }) => {
      const palette = theme.colors[color];

      return `
        background-color: ${palette.dark};
        border-color: ${palette.dark};
        color: ${palette.contrastText};
      `;
    }}
  }

  .${inputSwitchClasses.input}:checked + & .${inputSwitchClasses.thumb} {
    transform: ${({ size = 'md' }) => {
      const track = parseInt(sizeMap[size].width, 10);
      const thumb = parseInt(sizeMap[size].thumb, 10);
      // border-box: subtract 1px border×2 + 1px padding×2
      return `translateX(${track - thumb - 4}px)`;
    }};
  }

  .${inputSwitchClasses.input}:focus-visible + & {
    outline: 2px solid ${({ theme, color = 'primary' }) => theme.colors[color].main};
    outline-offset: 2px;
  }

  .${inputSwitchClasses.input}:disabled + & {
    opacity: 0.5;
  }
`;
