import styled from '@emotion/styled';
import { iconButtonClasses } from '../../icon-button/classes';
import { inputVariantStyles } from '../variant-styles';
import { inputActionsClasses } from '../input-actions/classes';
import { inputButtonClasses } from '../input-button/classes';
import { inputIconClasses } from '../input-icon/classes';
import { inputNumberFieldClasses } from '../input-number-field/classes';
import { inputTextAreaFieldClasses } from '../input-text-area-field/classes';
import { inputTextFieldClasses } from '../input-text-field/classes';
import { inputWrapperClasses } from './classes';
import { TInputSize, TInputWrapperProps } from './types';

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

const body = `.${inputWrapperClasses.body}`;
const inRow = (selector: string) =>
  `& > ${selector}, & > ${body} > ${selector}`;

const fieldClass = [
  inRow(`.${inputTextFieldClasses.root}`),
  inRow(`.${inputNumberFieldClasses.root}`),
  inRow(`.${inputTextAreaFieldClasses.root}`),
].join(', ');

export const SInputWrapper = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputWrapperProps>`
  display: inline-flex;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
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

      & > ${body} > * {
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
    const step = theme.sizes[size];

    return `
      gap: ${step.gap};
      font-size: ${step.fontSize};

      ${fieldClass} {
        padding-top: ${step.padY};
        padding-bottom: ${step.padY};
        padding-left: ${step.padX};
        padding-right: ${step.padX};
      }

      ${inRow(`.${inputIconClasses.root} ~ .${inputTextFieldClasses.root}`)},
      ${inRow(`.${inputIconClasses.root} ~ .${inputNumberFieldClasses.root}`)},
      ${inRow(`.${inputIconClasses.root} ~ .${inputTextAreaFieldClasses.root}`)},
      ${inRow(`.${iconButtonClasses.root} ~ .${inputTextFieldClasses.root}`)},
      ${inRow(`.${iconButtonClasses.root} ~ .${inputNumberFieldClasses.root}`)},
      ${inRow(`.${iconButtonClasses.root} ~ .${inputTextAreaFieldClasses.root}`)},
      ${inRow(`.${inputButtonClasses.root} ~ .${inputTextFieldClasses.root}`)},
      ${inRow(`.${inputButtonClasses.root} ~ .${inputNumberFieldClasses.root}`)},
      ${inRow(`.${inputButtonClasses.root} ~ .${inputTextAreaFieldClasses.root}`)} {
        padding-left: 0;
      }

      ${inRow(`.${inputTextFieldClasses.root}:has(~ .${inputIconClasses.root}, ~ .${iconButtonClasses.root}, ~ .${inputButtonClasses.root}, ~ .${inputActionsClasses.root})`)},
      ${inRow(`.${inputNumberFieldClasses.root}:has(~ .${inputIconClasses.root}, ~ .${iconButtonClasses.root}, ~ .${inputButtonClasses.root}, ~ .${inputActionsClasses.root})`)},
      ${inRow(`.${inputTextAreaFieldClasses.root}:has(~ .${inputIconClasses.root}, ~ .${iconButtonClasses.root}, ~ .${inputButtonClasses.root}, ~ .${inputActionsClasses.root})`)} {
        padding-right: 0;
      }

      ${inRow(`.${inputIconClasses.root}`)} {
        padding-left: ${step.padX};
        padding-right: ${step.padX};
      }

      ${inRow(`.${inputTextFieldClasses.root} ~ .${inputIconClasses.root}`)},
      ${inRow(`.${inputNumberFieldClasses.root} ~ .${inputIconClasses.root}`)},
      ${inRow(`.${inputTextAreaFieldClasses.root} ~ .${inputIconClasses.root}`)},
      ${inRow(`.${iconButtonClasses.root} ~ .${inputIconClasses.root}`)},
      ${inRow(`.${inputIconClasses.root} ~ .${inputIconClasses.root}`)} {
        padding-left: 0;
      }

      ${inRow(`.${inputIconClasses.root}:has(+ .${inputTextFieldClasses.root})`)},
      ${inRow(`.${inputIconClasses.root}:has(+ .${inputNumberFieldClasses.root})`)},
      ${inRow(`.${inputIconClasses.root}:has(+ .${inputTextAreaFieldClasses.root})`)},
      ${inRow(`.${inputIconClasses.root}:has(+ .${iconButtonClasses.root})`)},
      ${inRow(`.${inputIconClasses.root}:has(+ .${inputIconClasses.root})`)} {
        padding-right: 0;
      }

      ${inRow(`.${iconButtonClasses.root}`)} {
        align-self: center;
      }

      ${inRow(`.${inputButtonClasses.root}`)} {
        align-self: stretch;
        width: 1.75em;
        height: auto;
        min-height: 0;
      }

      ${inRow(`.${inputButtonClasses.root}:first-child`)} {
        margin-right: -${step.gap};
      }

      ${inRow(`.${inputNumberFieldClasses.root} ~ .${inputButtonClasses.root}`)} {
        margin-left: -${step.gap};
      }

      ${inRow(`.${inputActionsClasses.vertical}`)} {
        align-self: stretch;
        margin-left: -${step.gap};
      }
    `;
  }}

  ${({ theme, variant = 'surface', color = 'primary', error }) =>
    inputVariantStyles(variant, theme.palette[color], theme, { error })}
`;

export const SInputWrapperBody = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-width: 0;
  flex: 1 1 auto;
  gap: inherit;
  box-sizing: border-box;
`;

export const SInputWrapperActionBar = styled('div', {
  shouldForwardProp: (prop) => prop !== 'size',
})<{ size: TInputSize }>`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme, size }) => {
    const scale = theme.sizeScale[size];
    const padY = theme.spacing(theme.gap.xs);
    const padX = theme.spacing(theme.gap.sm);

    return `0 calc(${padX} * ${scale}) calc(${padY} * ${scale})`;
  }};
`;
