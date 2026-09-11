import styled from '@emotion/styled';
import type { TTheme } from '../../../../theme/types';
import { colorMix, fieldFocusRing } from '../../../surface';
import type { TInputSize, TInputVariant } from '../input-wrapper/types';
import { inputSwitchClasses } from './classes';
import { TInputSwitchProps } from './types';

const SWITCH_OFF_FILL = 30;
const SWITCH_SURFACE_BORDER_IDLE = 10;
const SWITCH_SURFACE_BORDER_HOVER = 30;
const SWITCH_OUTLINE_BORDER_IDLE = 40;
const SWITCH_OUTLINE_BORDER_HOVER = 60;

const switchOffFill = (variant: TInputVariant, theme: TTheme) =>
  variant === 'outline'
    ? 'transparent'
    : colorMix(theme.surfaces.mixer, SWITCH_OFF_FILL);

const switchOffBorder = (
  variant: TInputVariant,
  theme: TTheme,
  hover = false,
) => {
  if (variant === 'subtle') {
    return 'transparent';
  }

  if (variant === 'outline') {
    return colorMix(
      theme.surfaces.mixer,
      hover ? SWITCH_OUTLINE_BORDER_HOVER : SWITCH_OUTLINE_BORDER_IDLE,
    );
  }

  return colorMix(
    theme.surfaces.mixer,
    hover ? SWITCH_SURFACE_BORDER_HOVER : SWITCH_SURFACE_BORDER_IDLE,
  );
};

const switchOffChrome = (
  variant: TInputVariant,
  theme: TTheme,
  hover = false,
) => `
  background-color: ${switchOffFill(variant, theme)};
  border-color: ${switchOffBorder(variant, theme, hover)};
`;

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
  background-color: ${({ theme }) => theme.palette.common.white};
  box-shadow: inset 0 0 2px color-mix(in oklab, ${({ theme }) => theme.palette.common.black} 18%, transparent);
  transition: transform 0.15s ease, background-color 0.15s ease;
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
  transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;

  ${({ theme, variant = 'surface' }) => `
    ${switchOffChrome(variant, theme)}
    color: ${theme.palette.default.main};
    box-shadow: none;
  `}

  .${inputSwitchClasses.thumb} {
    width: ${({ size = 'md' }) => sizeMap[size].thumb};
    height: ${({ size = 'md' }) => sizeMap[size].thumb};
  }

  .${inputSwitchClasses.input}:hover:not(:disabled):not(:checked):not(:focus-visible) + & {
    ${({ theme, variant = 'surface' }) => switchOffChrome(variant, theme, true)}
  }

  .${inputSwitchClasses.input}:focus-visible:not(:disabled):not(:checked) + & {
    ${({ theme, variant = 'surface', color = 'primary' }) => `
      ${switchOffChrome(variant, theme)}
      outline: none;
      box-shadow: ${fieldFocusRing(theme.palette[color].main)};
    `}
  }

  .${inputSwitchClasses.input}:checked + & {
    ${({ theme, color = 'primary' }) => {
      const palette = theme.palette[color];

      return `
        background-color: ${palette.main};
        border-color: ${palette.main};
        color: ${palette.contrastText};
        box-shadow: none;
      `;
    }}
  }

  .${inputSwitchClasses.input}:checked:hover:not(:disabled) + & {
    ${({ theme, color = 'primary' }) => {
      const palette = theme.palette[color];

      return `
        background-color: ${palette.dark};
        border-color: ${palette.dark};
        color: ${palette.contrastText};
        box-shadow: none;
      `;
    }}
  }

  .${inputSwitchClasses.input}:checked + & .${inputSwitchClasses.thumb} {
    background-color: ${({ theme, color = 'primary' }) =>
      theme.palette[color].contrastText};
    transform: ${({ size = 'md' }) => {
      const track = parseInt(sizeMap[size].width, 10);
      const thumb = parseInt(sizeMap[size].thumb, 10);
      return `translateX(${track - thumb - 4}px)`;
    }};
  }

  .${inputSwitchClasses.input}:focus-visible:checked + & {
    outline: none;
    box-shadow: ${({ theme, color = 'primary' }) =>
      fieldFocusRing(theme.palette[color].main)};
  }

  .${inputSwitchClasses.input}:disabled + & {
    opacity: 0.5;
  }
`;
