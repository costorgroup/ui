import styled from '@emotion/styled';
import { iconButtonClasses } from '../../icon-button/classes';
import { inputIconClasses } from '../input-icon/classes';
import { inputNumberFieldClasses } from '../input-number-field/classes';
import { inputTextAreaFieldClasses } from '../input-text-area-field/classes';
import { inputTextFieldClasses } from '../input-text-field/classes';
import { TInputWrapperProps, TInputSize } from './types';

type TSInputWrapperProps = Pick<TInputWrapperProps, 'variant' | 'size' | 'color'>;

const customProps = new Set(['variant', 'size', 'color', 'error', 'disabled', 'readOnly']);

const sizeFont: Record<TInputSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

const fieldClass = `& > .${inputTextFieldClasses.root}, & > .${inputNumberFieldClasses.root}, & > .${inputTextAreaFieldClasses.root}`;

export const SInputWrapper = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputWrapperProps>`
  display: inline-flex;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.medium};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  cursor: text;
  transition: background-color 0.15s ease, border-color 0.15s ease;

  ${({ theme, size = 'md' }) => {
    const scale = theme.sizeScale[size];
    const padY = theme.spacing(theme.gap.sm);
    const padX = theme.spacing(theme.gap.md);
    const gap = theme.spacing(theme.gap.sm);

    return `
      gap: calc(${gap} * ${scale});
      font-size: ${sizeFont[size]};

      ${fieldClass} {
        padding-top: calc(${padY} * ${scale});
        padding-bottom: calc(${padY} * ${scale});
        padding-left: calc(${padX} * ${scale});
        padding-right: calc(${padX} * ${scale});
      }

      & > .${inputIconClasses.root} ~ .${inputTextFieldClasses.root},
      & > .${inputIconClasses.root} ~ .${inputNumberFieldClasses.root},
      & > .${inputIconClasses.root} ~ .${inputTextAreaFieldClasses.root},
      & > .${iconButtonClasses.root} ~ .${inputTextFieldClasses.root},
      & > .${iconButtonClasses.root} ~ .${inputNumberFieldClasses.root},
      & > .${iconButtonClasses.root} ~ .${inputTextAreaFieldClasses.root} {
        padding-left: 0;
      }

      & > .${inputTextFieldClasses.root}:has(~ .${inputIconClasses.root}, ~ .${iconButtonClasses.root}),
      & > .${inputNumberFieldClasses.root}:has(~ .${inputIconClasses.root}, ~ .${iconButtonClasses.root}),
      & > .${inputTextAreaFieldClasses.root}:has(~ .${inputIconClasses.root}, ~ .${iconButtonClasses.root}) {
        padding-right: 0;
      }

      & > .${inputIconClasses.root} {
        padding-left: calc(${padX} * ${scale});
        padding-right: calc(${padX} * ${scale});
      }

      & > .${inputTextFieldClasses.root} ~ .${inputIconClasses.root},
      & > .${inputNumberFieldClasses.root} ~ .${inputIconClasses.root},
      & > .${inputTextAreaFieldClasses.root} ~ .${inputIconClasses.root},
      & > .${iconButtonClasses.root} ~ .${inputIconClasses.root},
      & > .${inputIconClasses.root} ~ .${inputIconClasses.root} {
        padding-left: 0;
      }

      & > .${inputIconClasses.root}:has(+ .${inputTextFieldClasses.root}),
      & > .${inputIconClasses.root}:has(+ .${inputNumberFieldClasses.root}),
      & > .${inputIconClasses.root}:has(+ .${inputTextAreaFieldClasses.root}),
      & > .${inputIconClasses.root}:has(+ .${iconButtonClasses.root}),
      & > .${inputIconClasses.root}:has(+ .${inputIconClasses.root}) {
        padding-right: 0;
      }

      & > .${iconButtonClasses.root} {
        align-self: center;
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
            color: ${palette.darker};
          }

          &:focus-within {
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
            color: ${palette.darker};
          }
        `;
      case 'outline':
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
      case 'subtle':
      default:
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
            color: ${palette.darker};
          }

          &:focus-within {
            background-color: color-mix(
              in srgb,
              ${palette.main} 10%,
              transparent
            );
            color: ${palette.darker};
          }
        `;
    }
  }}
`;
