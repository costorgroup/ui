import styled from '@emotion/styled';
import { TInputSize } from '../input-wrapper/types';
import {
  TSInputAutoCompleteDropdownProps,
  TSInputAutoCompleteTriggerProps,
} from './types';

const triggerProps = new Set(['variant', 'size', 'color', 'open']);
const dropdownProps = new Set(['top', 'left', 'width', 'visible', 'placement']);

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
  shouldForwardProp: (prop) => !triggerProps.has(prop),
})<TSInputAutoCompleteTriggerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  width: 100%;
  margin: 0;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.medium};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  text-align: left;
  cursor: text;
  opacity: 1;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;

  ${({ theme, size }) => {
    const scale = theme.sizeScale[size];

    return `
      padding: calc(${theme.spacing(theme.gap.sm)} * ${scale})
        calc(${theme.spacing(theme.gap.md)} * ${scale});
      font-size: ${sizeFont[size]};
    `;
  }}

  ${({ theme, variant, color }) => {
    const palette = theme.colors[color];

    switch (variant) {
      case 'surface':
        return `
          background-color: color-mix(in srgb, ${palette.main} 8%, transparent);
          color: ${palette.darker};
          border-color: color-mix(in srgb, ${palette.main} 14%, transparent);

          &:hover {
            background-color: color-mix(in srgb, ${palette.main} 10%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 20%, transparent);
          }

          &[data-open='true'] {
            background-color: color-mix(in srgb, ${palette.main} 10%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 28%, transparent);
          }

          &[data-disabled='true'] {
            opacity: 0.55;
            cursor: not-allowed;
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${palette.main};
          border-color: color-mix(in srgb, ${palette.main} 36%, transparent);

          &:hover {
            background-color: color-mix(in srgb, ${palette.main} 4%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 52%, transparent);
            color: ${palette.dark};
          }

          &[data-open='true'] {
            background-color: color-mix(in srgb, ${palette.main} 4%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 68%, transparent);
            color: ${palette.darker};
          }

          &[data-disabled='true'] {
            opacity: 0.55;
            cursor: not-allowed;
          }
        `;
      case 'subtle':
      default:
        return `
          background-color: color-mix(in srgb, ${palette.main} 4%, transparent);
          color: ${palette.darker};
          border-color: transparent;

          &:hover {
            background-color: color-mix(in srgb, ${palette.main} 8%, transparent);
          }

          &[data-open='true'] {
            background-color: color-mix(in srgb, ${palette.main} 10%, transparent);
          }

          &[data-disabled='true'] {
            opacity: 0.55;
            cursor: not-allowed;
          }
        `;
    }
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
  background-color: ${({ theme }) => theme.colors.common.white};
  box-shadow: ${({ theme }) => {
    const black = theme.colors.common.black;

    return `
      0 4px 10px ${black}0a,
      0 1px 4px ${black}08,
      0 1px 2px ${black}05
    `;
  }};
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
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
`;

export const SInputAutoCompleteEmpty = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing(theme.gap.sm)} ${theme.spacing(theme.gap.md)}`};
  color: ${({ theme }) => theme.colors.common.grey[12]};
  font: inherit;
  text-align: center;
  user-select: none;
`;
