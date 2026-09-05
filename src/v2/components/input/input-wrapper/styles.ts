import styled from '@emotion/styled';
import { iconButtonClasses } from '../../icon-button/classes';
import { inputVariantStyles } from '../variant-styles';
import { inputIconClasses } from '../input-icon/classes';
import { inputNumberFieldClasses } from '../input-number-field/classes';
import { inputTextAreaFieldClasses } from '../input-text-area-field/classes';
import { inputTextFieldClasses } from '../input-text-field/classes';
import { TInputWrapperProps, TInputSize } from './types';

type TSInputWrapperProps = Pick<
  TInputWrapperProps,
  'variant' | 'size' | 'color' | 'disabled' | 'open' | 'trigger' | 'stacked' | 'error'
>;

const customProps = new Set([
  'variant',
  'size',
  'color',
  'error',
  'disabled',
  'readOnly',
  'open',
  'trigger',
  'stacked',
]);

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
  cursor: ${({ trigger, disabled }) =>
    disabled ? 'not-allowed' : trigger ? 'pointer' : 'text'};
  opacity: ${({ disabled }) => (disabled ? 0.55 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;

  ${({ trigger }) =>
    trigger &&
    `
      & > * {
        width: 100%;
      }
    `}

  ${({ stacked }) =>
    stacked &&
    `
      flex-direction: column;
      align-items: stretch;
      overflow: hidden;

      & > * {
        width: 100%;
      }
    `}

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

  ${({ theme, variant = 'subtle', color = 'primary', error }) =>
    inputVariantStyles(variant, theme.colors[color], theme, { error })}
`;
