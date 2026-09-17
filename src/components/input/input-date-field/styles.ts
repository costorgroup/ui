import styled from '@emotion/styled';
import {
  inputDropdownMutedText,
  inputDropdownOptionCssVars,
  inputDropdownPanelStyles,
} from '../dropdown-styles';
import { inputInnerResetStyles } from '../variant-styles';
import { TInputSize } from '../input-wrapper/types';
import {
  TSInputDateFieldDayProps,
  TSInputDateFieldDropdownProps,
  TSInputDateFieldTimeWheelItemProps,
} from './types';

const triggerProps = new Set(['size']);
const dropdownProps = new Set([
  'top',
  'left',
  'width',
  'visible',
  'placement',
  'color',
]);
const dayProps = new Set([
  'selected',
  'today',
  'outside',
  'disabled',
  'color',
]);
const timeItemProps = new Set(['color']);

const sizeFont: Record<TInputSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const SInputDateField = styled.div`
  position: relative;
  display: inline-flex;
  width: 100%;
  box-sizing: border-box;
`;

export const SInputDateFieldTrigger = styled('button', {
  shouldForwardProp: (prop) => !triggerProps.has(prop),
})<{ size: TInputSize; disabled?: boolean }>`
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

export const SInputDateFieldValue = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  flex: 1;
  min-width: 0;
`;

export const SInputDateFieldText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SInputDateFieldPlaceholder = styled.span`
  opacity: 0.5;
`;

export const SInputDateFieldChevron = styled('span', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.7;
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

export const SInputDateFieldDropdown = styled('div', {
  shouldForwardProp: (prop) => !dropdownProps.has(prop),
})<TSInputDateFieldDropdownProps>`
  position: fixed;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  box-sizing: border-box;
  width: ${({ width }) => `${width}px`};
  max-width: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius.md};
  ${({ theme, color = 'primary' }) => `
    ${inputDropdownOptionCssVars(theme, color)}
    ${inputDropdownPanelStyles(theme)}
  `}
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? 'scale(1)' : 'scale(0.96)')};
  transform-origin: ${({ placement }) =>
    placement === 'top' ? 'bottom right' : 'top right'};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transition:
    opacity 0.12s ease,
    transform 0.12s ease;
`;

export const SInputDateFieldPicker = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.md)};
  width: 100%;
  padding: ${({ theme }) => theme.spacing(theme.gap.md)};
  box-sizing: border-box;
  user-select: none;
`;

export const SInputDateFieldCalendar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
`;

export const SInputDateFieldHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
`;

export const SInputDateFieldMonthLabel = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.palette.default.main};
`;

export const SInputDateFieldWeekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const SInputDateFieldWeekday = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  font-size: 11px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => inputDropdownMutedText(theme)};
`;

export const SInputDateFieldDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const SInputDateFieldDay = styled('button', {
  shouldForwardProp: (prop) => !dayProps.has(prop),
})<TSInputDateFieldDayProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: transparent;
  color: ${({ theme }) => theme.palette.default.main};
  font-family: inherit;
  font-size: 13px;
  font-weight: ${({ theme, today, selected }) =>
    today && !selected
      ? theme.typography.fontWeight.medium
      : theme.typography.fontWeight.regular};
  line-height: 1;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ outside, disabled }) => (disabled ? 0.35 : outside ? 0.45 : 1)};

  ${({ theme, selected, color }) =>
    selected
      ? `
        color: ${theme.palette[color].main};
        background-color: var(--input-dropdown-option-selected);
      `
      : ''}

  &:hover:not(:disabled) {
    ${({ selected }) =>
      selected
        ? ''
        : 'background-color: var(--input-dropdown-option-hover);'}
  }
`;

export const SInputDateFieldTime = styled.div`
  position: relative;
  display: flex;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  height: ${36 * 5}px;
  user-select: none;
`;

export const SInputDateFieldActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  padding-top: ${({ theme }) => theme.spacing(theme.gap.xs)};
`;

export const SInputDateFieldTimeWheel = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const SInputDateFieldTimeWheelHighlight = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  z-index: 1;
  height: 36px;
  transform: translateY(-50%);
  pointer-events: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: var(--input-dropdown-option-selected);
`;

export const SInputDateFieldTimeWheelList = styled.div`
  height: 100%;
  overflow-y: auto;
  touch-action: none;
  scrollbar-width: none;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.28) 18%,
    #000 38%,
    #000 62%,
    rgba(0, 0, 0, 0.28) 82%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.28) 18%,
    #000 38%,
    #000 62%,
    rgba(0, 0, 0, 0.28) 82%,
    transparent 100%
  );

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SInputDateFieldTimeWheelSpacer = styled.div`
  flex-shrink: 0;
  pointer-events: none;
`;

export const SInputDateFieldTimeWheelItem = styled('button', {
  shouldForwardProp: (prop) => !timeItemProps.has(prop),
})<TSInputDateFieldTimeWheelItemProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 100%;
  height: 36px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: 16px;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  color: ${({ theme }) => theme.palette.default.main};
  cursor: pointer;
  opacity: 1;
  pointer-events: auto;

  &[data-selected='true'] {
    color: ${({ theme, color }) => theme.palette[color].main};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
