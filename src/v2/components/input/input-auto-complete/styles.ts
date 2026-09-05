import styled from '@emotion/styled';
import { inputInnerResetStyles } from '../variant-styles';
import {
  INPUT_DROPDOWN_OPTION_FONT_SIZE,
  inputDropdownMutedText,
  inputDropdownOptionCssVars,
  inputDropdownOptionPadding,
  inputDropdownPanelStyles,
} from '../dropdown-styles';
import { TInputSize } from '../input-wrapper/types';
import {
  TSInputAutoCompleteDropdownProps,
} from './types';

const dropdownProps = new Set([
  'top',
  'left',
  'width',
  'visible',
  'placement',
  'color',
  'variant',
]);

const sizeFont: Record<TInputSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const SInputAutoComplete = styled.div`
  position: relative;
  display: inline-flex;
  width: 100%;
  box-sizing: border-box;
`;

export const SInputAutoCompleteTrigger = styled('div', {
  shouldForwardProp: (prop) => prop !== 'size',
})<{ size: TInputSize }>`
  ${inputInnerResetStyles}
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  text-align: left;
  cursor: inherit;
  color: inherit;

  ${({ theme, size }) => {
    const scale = theme.sizeScale[size];

    return `
      padding: calc(${theme.spacing(theme.gap.sm)} * ${scale})
        calc(${theme.spacing(theme.gap.md)} * ${scale});
      font-size: ${sizeFont[size]};
    `;
  }}
`;

export const SInputAutoCompleteValue = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  flex: 1;
  min-width: 0;
`;

export const SInputAutoCompleteField = styled.input`
  box-sizing: border-box;
  flex: 1;
  min-width: 4rem;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  outline: none;
  font: inherit;
  color: inherit;
  cursor: inherit;

  &::placeholder {
    color: currentColor;
    opacity: 0.5;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const SInputAutoCompleteChevron = styled('span', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>`
  display: inline-flex;
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

export const SInputAutoCompleteDropdown = styled('div', {
  shouldForwardProp: (prop) => !dropdownProps.has(prop),
})<TSInputAutoCompleteDropdownProps>`
  position: fixed;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  box-sizing: border-box;
  width: ${({ width }) => `${width}px`};
  min-width: 12rem;
  max-height: 18rem;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(theme.gap.xs)};
  border-radius: ${({ theme }) => theme.radius.medium};
  ${({ theme, color = 'primary', variant = 'subtle' }) => `
    ${inputDropdownOptionCssVars(theme, color)}
    ${inputDropdownPanelStyles(theme)}
  `}
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? 'scale(1)' : 'scale(0.96)')};
  transform-origin: ${({ placement }) =>
    placement === 'top' ? 'bottom left' : 'top left'};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transition:
    opacity 0.12s ease,
    transform 0.12s ease;
`;

export const SInputAutoCompleteOptions = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const SInputAutoCompleteEmpty = styled.div`
  padding: ${({ theme }) => inputDropdownOptionPadding(theme)};
  color: ${({ theme }) => inputDropdownMutedText(theme)};
  font-family: inherit;
  font-size: ${INPUT_DROPDOWN_OPTION_FONT_SIZE};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  text-align: center;
  user-select: none;
`;
