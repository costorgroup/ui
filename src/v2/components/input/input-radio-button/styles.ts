import styled from '@emotion/styled';
import { fieldFocusRing } from '../../../surface';
import {
  inputControlIdleHoverStyles,
  inputControlIdleStyles,
} from '../variant-styles';
import { inputRadioButtonClasses } from './classes';
import { TInputRadioButtonProps } from './types';

type TSInputRadioButtonProps = Pick<
  TInputRadioButtonProps,
  'variant' | 'size' | 'color'
>;

const customProps = new Set(['variant', 'size', 'color']);

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
  width: ${({ theme, size = 'md' }) => theme.sizes[size].icon};
  height: ${({ theme, size = 'md' }) => theme.sizes[size].icon};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.circle};
  transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;

  .${inputRadioButtonClasses.dot} {
    width: ${({ theme, size = 'md' }) =>
      `calc(${theme.sizes[size].icon} / 2.4)`};
    height: ${({ theme, size = 'md' }) =>
      `calc(${theme.sizes[size].icon} / 2.4)`};
  }

  ${({ theme, variant = 'surface', color = 'primary' }) =>
    inputControlIdleStyles(variant, theme.palette[color], theme)}

  .${inputRadioButtonClasses.input}:hover:not(:disabled):not(:checked) + & {
    ${({ theme, variant = 'surface', color = 'primary' }) =>
      inputControlIdleHoverStyles(variant, theme.palette[color], theme)}
  }

  .${inputRadioButtonClasses.input}:checked + & {
    ${({ theme, color = 'primary' }) => {
      const palette = theme.palette[color];

      return `
        background-color: ${palette.main};
        border-color: ${palette.main};
        color: ${palette.contrastText};
      `;
    }}
  }

  .${inputRadioButtonClasses.input}:checked:hover:not(:disabled) + & {
    ${({ theme, color = 'primary' }) => {
      const palette = theme.palette[color];

      return `
        background-color: ${palette.dark};
        border-color: ${palette.dark};
        color: ${palette.contrastText};
      `;
    }}
  }

  .${inputRadioButtonClasses.input}:checked + & .${inputRadioButtonClasses.dot} {
    opacity: 1;
    transform: scale(1);
  }

  .${inputRadioButtonClasses.input}:focus-visible + & {
    outline: none;
    box-shadow: ${({ theme, color = 'primary' }) =>
      fieldFocusRing(theme.palette[color].main)};
  }

  .${inputRadioButtonClasses.input}:disabled + & {
    opacity: 0.5;
  }
`;
