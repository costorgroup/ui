import styled from '@emotion/styled';
import { SInputIcon } from '../input-icon/styles';
import { SInputNumberFieldInput } from '../input-number-field/styles';
import { SInputTextAreaField } from '../input-text-area-field/styles';
import { SInputTextField } from '../input-text-field/styles';
import { SIconButton } from '../../icon-button/styles';
import { TInputWrapperProps, TInputSize } from './types';

type TSInputWrapperProps = Pick<TInputWrapperProps, 'variant' | 'size' | 'color'>;

const customProps = new Set(['variant', 'size', 'color']);

const fieldSelector = `${SInputTextField}, ${SInputNumberFieldInput}, ${SInputTextAreaField}`;

const sizeFont: Record<TInputSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

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

      & ${fieldSelector} {
        padding-top: calc(${padY} * ${scale});
        padding-bottom: calc(${padY} * ${scale});
      }

      & > ${SInputTextField}:first-child,
      & > ${SInputNumberFieldInput}:first-child,
      & > ${SInputTextAreaField}:first-child {
        padding-left: calc(${padX} * ${scale});
      }

      & > ${SInputTextField}:last-child,
      & > ${SInputNumberFieldInput}:last-child,
      & > ${SInputTextAreaField}:last-child {
        padding-right: calc(${padX} * ${scale});
      }

      & > ${SInputIcon}:first-child {
        padding-left: calc(${padX} * ${scale});
      }

      & > ${SInputIcon}:last-child {
        padding-right: calc(${padX} * ${scale});
      }

      & > ${SIconButton} {
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
